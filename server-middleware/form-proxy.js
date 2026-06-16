const https = require("https");
const { URL } = require("url");
const {
  decryptSensitivePayload,
  isEncryptedPayload
} = require("../utils/decryptSensitivePayload");

const API_BASE = (
  process.env.BASE_URL || "https://webapi.intellion.in/wp-json/intellion/v1"
).replace(/\/$/, "");

const PROXY_ROUTES = {
  "/api/query": "/query",
  "/api/enquiry": "/enquiry",
  "/api/subscribe": "/subscribe"
};

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });
}

function forwardToApi(route, body) {
  const target = new URL(`${API_BASE}${route}`);
  const payload = JSON.stringify(body);
  const isDev = process.env.NODE_ENV === "development";

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || 443,
        path: `${target.pathname}${target.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        agent: isDev
          ? new https.Agent({ rejectUnauthorized: false })
          : undefined
      },
      (response) => {
        const chunks = [];

        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          resolve({
            statusCode: response.statusCode || 500,
            body: Buffer.concat(chunks).toString("utf8")
          });
        });
      }
    );

    request.on("error", reject);
    request.write(payload);
    request.end();
  });
}

module.exports = async function formProxy(req, res, next) {
  const path = (req.url || "").split("?")[0];
  const apiRoute = PROXY_ROUTES[path];

  if (!apiRoute || req.method !== "POST") {
    return next();
  }

  try {
    const rawBody = await readRequestBody(req);
    const parsedBody = rawBody ? JSON.parse(rawBody) : {};
    const decryptedBody = isEncryptedPayload(parsedBody)
      ? decryptSensitivePayload(parsedBody)
      : parsedBody;
    const apiResponse = await forwardToApi(apiRoute, decryptedBody);

    res.statusCode = apiResponse.statusCode;
    res.setHeader("Content-Type", "application/json");
    res.end(apiResponse.body);
  } catch (error) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Unable to process encrypted form submission"
      })
    );
  }
};
