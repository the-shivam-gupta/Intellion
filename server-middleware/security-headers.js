/**
 * VAPT 3.4: security response headers on every response.
 * Strict CSP (no unsafe-inline / unsafe-eval) is applied in production only.
 * Local dev skips CSP so webpack HMR can run.
 */
const crypto = require("crypto");
const {
  HSTS_VALUE,
  isLocalDevHost,
  shouldSendHsts
} = require("./security-constants");

function generateNonce() {
  return crypto.randomBytes(16).toString("base64");
}

const STYLE_ATTR_HASHES = [
  // ta-select.vue display toggles
  "'sha256-biLFinpqYMtWHmXfkA1BPeCY0/fNt46SAZ+BBk5YUog='",
  "'sha256-0EZqoz+oBhx7gF4nvY2bSqoGyy4zLjNF+SDQXGp/ZrY='",
  "'sha256-aqNNdDLnnrDOnTNdkJpYlAxKVJtLt9CtFLklmInuUAE='",
  // GSAP / AOS clear inline styles (cssText = "")
  "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
  // Runtime inline style from lazy-loaded vendor chunk (628cabb.js)
  "'sha256-8IhDsk1m3zyem/Xsc/sWSEC4XDH2O3K+Pj+1+TvtK8='"
];

const CSP_NONCE_START = "<!--csp-nonce-start-->";
const CSP_NONCE_END = "<!--csp-nonce-end-->";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildCspBootstrapScript(nonce) {
  const escapedNonce = nonce.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  return [
    `(function(n){`,
    `if(!n){return;}`,
    `window.__webpack_nonce__=n;`,
    `document.documentElement.dataset.cspStyleNonceApplied="1";`,
    `var orig=Document.prototype.createElement;`,
    `Document.prototype.createElement=function(tag,options){`,
    `var el=orig.call(this,tag,options);`,
    `if(tag&&String(tag).toLowerCase()==="style"){el.setAttribute("nonce",n);}`,
    `return el};`,
    `function mark(node){`,
    `if(!node||node.nodeType!==1){return;}`,
    `if(node.tagName==="STYLE"&&!node.getAttribute("nonce")){node.setAttribute("nonce",n);}`,
    `for(var i=0;i<node.children.length;i++){mark(node.children[i]);}}`,
    `mark(document.documentElement);`,
    `new MutationObserver(function(list){`,
    `for(var i=0;i<list.length;i++){`,
    `for(var j=0;j<list[i].addedNodes.length;j++){mark(list[i].addedNodes[j]);}}`,
    `}).observe(document.documentElement,{childList:true,subtree:true});`,
    `})("${escapedNonce}");`
  ].join("");
}

function injectHtmlNonces(html, nonce) {
  if (!html || !nonce) {
    return html;
  }

  let result = html;

  // Cached HTML may contain a previous request's nonce injection block.
  const injectionBlock = new RegExp(
    `${escapeRegExp(CSP_NONCE_START)}[\\s\\S]*?${escapeRegExp(CSP_NONCE_END)}`,
    "gi"
  );
  result = result.replace(injectionBlock, "");

  // Refresh stale nonces so CSP header and inline tags always match.
  result = result.replace(
    /(<script\b[^>]*)\snonce="[^"]*"/gi,
    `$1 nonce="${nonce}"`
  );
  result = result.replace(
    /(<style\b[^>]*)\snonce="[^"]*"/gi,
    `$1 nonce="${nonce}"`
  );

  const headBlock =
    CSP_NONCE_START +
    `<meta name="csp-nonce" content="${nonce}">` +
    `<script nonce="${nonce}">${buildCspBootstrapScript(nonce)}</script>` +
    CSP_NONCE_END;

  result = result.replace(/<head([^>]*)>/i, `<head$1>${headBlock}`);

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

function buildContentSecurityPolicy(isProduction, nonce, req) {
  const sharedDirectives = [
    "default-src 'self' https://*.intellion.in",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob: https://*.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://webapi.intellion.in https://media.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://maps.googleapis.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
    "media-src 'self' https:"
  ];

  if (!isProduction) {
    return null;
  }

  const host = req && req.headers.host ? req.headers.host.split(":")[0] : "";

  if (isLocalDevHost(host)) {
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
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    `style-src-attr 'unsafe-hashes' ${STYLE_ATTR_HASHES.join(" ")}`,
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

  const csp = buildContentSecurityPolicy(isProduction, nonce, req);

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
