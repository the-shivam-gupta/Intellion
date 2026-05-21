/**
 * VAPT: security headers + clickjacking protection (X-Frame-Options, CSP frame-ancestors).
 */
module.exports = function securityHeaders(req, res, next) {
  const isProduction = process.env.NODE_ENV === "production";

  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );

  if (isProduction) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains"
    );
  }

  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://webapi.intellion.in https://media.intellion.in https://intellion.s3.ap-south-1.amazonaws.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://www.googletagmanager.com https://region1.google-analytics.com https://maps.googleapis.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com",
    "media-src 'self' https:"
  ];

  if (isProduction) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const csp = cspDirectives.join("; ");

  res.setHeader("Content-Security-Policy", csp);

  next();
};
