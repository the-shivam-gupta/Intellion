module.exports = function forceWww(req, res, next) {
  const {
    HSTS_VALUE,
    isHttpsRequest,
    isLocalDevHost,
    shouldSendHsts
  } = require("./security-constants");
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

  // Skip redirect for local dev hosts (localhost, 127.0.0.1, private IPs).
  if (isLocalDevHost(host)) {
    return next();
  }

  const isHttps = isHttpsRequest(req);

  const redirect = (location) => {
    const headers = { Location: location };

    if (shouldSendHsts(req)) {
      headers["Strict-Transport-Security"] = HSTS_VALUE;
    }

    res.writeHead(301, headers);
    return res.end();
  };

  // Staging / alternate hosts: stay on same host; only upgrade HTTP → HTTPS when needed.
  if (allowedHosts.has(host)) {
    if (!isHttps) {
      return redirect(`https://${host}${url}`);
    }
    return next();
  }

  // Unknown hosts in production → canonical www site.
  if (!isHttps) {
    return redirect(canonicalOrigin + url);
  }

  return redirect(canonicalOrigin + url);
};
