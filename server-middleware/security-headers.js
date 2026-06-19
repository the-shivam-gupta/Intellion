/**
 * VAPT 3.4: security response headers on every response.
 * CSP uses per-request nonces + strict-dynamic (no unsafe-inline / unsafe-eval in production).
 */
const crypto = require("crypto");
const { HSTS_VALUE, shouldSendHsts } = require("./security-constants");

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

function injectScriptNonce(html, nonce) {
  if (!html || !nonce) {
    return html;
  }

  const trustedTypesBootstrap =
    `<script nonce="${nonce}">` +
    "if(window.trustedTypes&&trustedTypes.createPolicy){" +
    "try{trustedTypes.createPolicy('default',{" +
    "createHTML:function(s){return s}," +
    "createScript:function(s){return s}," +
    "createScriptURL:function(s){return s}" +
    "})}catch(e){}}" +
    "</script>";

  const withBootstrap = html.replace(
    /<head([^>]*)>/i,
    `<head$1>${trustedTypesBootstrap}`
  );

  return withBootstrap.replace(
    /<script(?![^>]*\bnonce=)/gi,
    `<script nonce="${nonce}"`
  );
}

function buildContentSecurityPolicy(isProduction, nonce) {
  const scriptParts = [
    "'self'",
    "'strict-dynamic'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com"
  ];

  // Webpack HMR in local dev still needs eval.
  if (!isProduction) {
    scriptParts.push("'unsafe-eval'");
  }

  const directives = [
    "default-src 'self' https://*.intellion.in",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src ${scriptParts.join(" ")}`,
    "require-trusted-types-for 'script'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://*.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://webapi.intellion.in https://media.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://maps.googleapis.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
    "media-src 'self' https:"
  ];

  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

function applySecurityHeaders(res, isProduction, nonce, req) {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  res.setHeader(
    "Content-Security-Policy",
    buildContentSecurityPolicy(isProduction, nonce)
  );

  if (shouldSendHsts(req)) {
    res.setHeader("Strict-Transport-Security", HSTS_VALUE);
  }
}

function interceptHtmlBody(res, nonce, applyHeaders) {
  if (res._cspHtmlWrapped) {
    return;
  }

  res._cspHtmlWrapped = true;

  const chunks = [];
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = function write(chunk, encoding, callback) {
    if (chunk) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    }

    if (typeof encoding === "function") {
      callback = encoding;
    }

    if (callback) {
      process.nextTick(callback);
    }

    return true;
  };

  res.end = function end(chunk, encoding, callback) {
    if (typeof chunk === "function") {
      callback = chunk;
      chunk = undefined;
      encoding = undefined;
    } else if (typeof encoding === "function") {
      callback = encoding;
      encoding = undefined;
    }

    if (chunk) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    }

    applyHeaders();

    let body = chunks.length ? Buffer.concat(chunks) : null;
    const contentType = res.getHeader("content-type");

    if (body && contentType && String(contentType).includes("text/html")) {
      const html = injectScriptNonce(body.toString("utf8"), nonce);
      body = Buffer.from(html, "utf8");
      res.setHeader("Content-Length", body.length);
    }

    res.write = originalWrite;
    res.end = originalEnd;

    return originalEnd(body, encoding, callback);
  };
}

module.exports = function securityHeaders(req, res, next) {
  const isProduction = process.env.NODE_ENV === "production";
  const nonce = generateNonce();
  req.cspNonce = nonce;

  const applyHeaders = () => {
    if (!res.headersSent) {
      applySecurityHeaders(res, isProduction, nonce, req);
    }
  };

  applyHeaders();
  interceptHtmlBody(res, nonce, applyHeaders);

  const originalWriteHead = res.writeHead;
  res.writeHead = function writeHead() {
    applyHeaders();
    return originalWriteHead.apply(this, arguments);
  };

  next();
};
