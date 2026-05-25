module.exports = function forceWww(req, res, next) {
  const host = req.headers.host;
  const url = req.url;
  const env = process.env.NODE_ENV;
  const forceDomain = "https://www.intellion.in";

  if (env !== "production") {
    return next();
  }

  // Skip redirect for local/private IPs (dev, staging, internal testing)
  if (/^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|::1)/.test(host)) {
    return next();
  }

  const proto =
    req.headers["x-forwarded-proto"] ||
    (req.connection && req.connection.encrypted ? "https" : "http");

  if (proto !== "https") {
    res.writeHead(301, { Location: forceDomain + url });
    return res.end();
  }

  if (host !== "www.intellion.in") {
    res.writeHead(301, { Location: forceDomain + url });
    return res.end();
  }

  return next();
};