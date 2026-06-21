// VAPT: HSTS value must match Deloitte recommendation exactly.
const HSTS_VALUE = "max-age=31536000; includeSubDomains; preload";

function isHttpsRequest(req) {
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
}

function isLocalDevHost(host) {
  if (!host) {
    return false;
  }

  const hostname = String(host).split(":")[0].toLowerCase();

  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|::1)/.test(hostname)
  );
}

function shouldSendHsts(req) {
  return process.env.NODE_ENV === "production" && isHttpsRequest(req);
}

module.exports = {
  HSTS_VALUE,
  isHttpsRequest,
  isLocalDevHost,
  shouldSendHsts
};
