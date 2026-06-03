module.exports = function forceWww(req, res, next) {
  const rawHost = req.headers.host || "";
  const host = rawHost.split(":")[0];
  const url = req.url;
  const env = process.env.NODE_ENV;

  const canonicalHost = process.env.CANONICAL_HOST || "www.intellion.in";
  const canonicalOrigin = `https://${canonicalHost}`;
  const allowedHosts = new Set([
    canonicalHost,
    "devs.intellion.in",
    ...(process.env.ALLOWED_HOSTS || "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  ]);

  if (env !== "production") {
    return next();
  }

  // Skip redirect for local/private IPs (dev, staging, internal testing)
  if (/^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|::1)/.test(host)) {
    return next();
  }

  const isHttps = (() => {
    const xfProto = req.headers["x-forwarded-proto"];
    if (xfProto) {
      return xfProto.split(",")[0].trim().toLowerCase() === "https";
    }
    const cfVisitor = req.headers["cf-visitor"];
    if (cfVisitor) {
      try {
        return JSON.parse(cfVisitor).scheme === "https";
      } catch (_) {
        /* ignore malformed header */
      }
    }
    return !!(req.connection && req.connection.encrypted);
  })();

  // Staging / alternate hosts: stay on same host; only upgrade HTTP → HTTPS when needed.
  if (allowedHosts.has(host)) {
    if (!isHttps) {
      res.writeHead(301, { Location: `https://${host}${url}` });
      return res.end();
    }
    return next();
  }

  // Unknown hosts in production → canonical www site.
  if (!isHttps) {
    res.writeHead(301, { Location: canonicalOrigin + url });
    return res.end();
  }

  res.writeHead(301, { Location: canonicalOrigin + url });
  return res.end();
};
