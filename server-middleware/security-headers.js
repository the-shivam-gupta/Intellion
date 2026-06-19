/**
 * VAPT 3.4: security response headers on every response.
 * Strict CSP (no unsafe-inline / unsafe-eval) is applied in production only.
 * Local dev skips CSP so webpack HMR can run.
 */
const crypto = require("crypto");
const { HSTS_VALUE, shouldSendHsts } = require("./security-constants");

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

function injectHtmlNonces(html, nonce) {
  if (!html || !nonce) {
    return html;
  }

  const headInjection =
    `<meta name="csp-nonce" content="${nonce}">` +
    `<script nonce="${nonce}">` +
    "if(window.trustedTypes&&trustedTypes.createPolicy){" +
    "try{trustedTypes.createPolicy('default',{" +
    "createHTML:function(s){return s}," +
    "createScript:function(s){return s}," +
    "createScriptURL:function(s){return s}" +
    "})}catch(e){}}" +
    "</script>";

  let result = html.replace(/<head([^>]*)>/i, `<head$1>${headInjection}`);

  result = result.replace(
    /<script(?![^>]*\bnonce=)/gi,
    `<script nonce="${nonce}"`
  );

  result = result.replace(
    /<style(?![^>]*\bnonce=)/gi,
    `<style nonce="${nonce}"`
  );

  return result;
}

function buildContentSecurityPolicy(isProduction, nonce) {
  const sharedDirectives = [
    "default-src 'self' https://*.intellion.in",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob: https://*.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://webapi.intellion.in https://media.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://maps.googleapis.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
    "media-src 'self' https:"
  ];

  if (!isProduction) {
    return null;
  }

  const scriptHosts = [
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://maps.googleapis.com",
    "https://maps.gstatic.com"
  ].join(" ");

  return [
    ...sharedDirectives,
    `script-src-elem 'self' 'nonce-${nonce}' ${scriptHosts}`,
    `script-src 'self' 'nonce-${nonce}' ${scriptHosts}`,
    "require-trusted-types-for 'script'",
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "style-src-attr 'unsafe-hashes' 'sha256-biLFinpqYMtWHmXfkA1BPeCY0/fNt46SAZ+BBk5YUog=' 'sha256-0EZqoz+oBhx7gF4nvY2bSqoGyy4zLjNF+SDQXGp/ZrY=' 'sha256-aqNNdDLnnrDOnTNdkJpYlAxKVJtLt9CtFLklmInuUAE='",
    "upgrade-insecure-requests"
  ].join("; ");
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

  const csp = buildContentSecurityPolicy(isProduction, nonce);

  if (csp) {
    res.setHeader("Content-Security-Policy", csp);
  }

  if (shouldSendHsts(req)) {
    res.setHeader("Strict-Transport-Security", HSTS_VALUE);
  }
}

function interceptHtmlBody(res, nonce, applyHeaders, isProduction) {
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

    if (
      body &&
      isProduction &&
      contentType &&
      String(contentType).includes("text/html")
    ) {
      const html = injectHtmlNonces(body.toString("utf8"), nonce);
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
  interceptHtmlBody(res, nonce, applyHeaders, isProduction);

  const originalWriteHead = res.writeHead;
  res.writeHead = function writeHead() {
    applyHeaders();
    return originalWriteHead.apply(this, arguments);
  };

  next();
};
