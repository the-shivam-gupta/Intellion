const EMAIL_FAILURE_PATTERN = /feedback could not sent|something went wrong/i;

function parseJsonBody(body) {
  if (!body) {
    return null;
  }

  if (typeof body === "object") {
    return body;
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}

function getErrorMessageFromBody(data) {
  if (!data || typeof data !== "object") {
    return "";
  }

  if (data.error && data.error.message) {
    return data.error.message;
  }

  if (data.message) {
    return data.message;
  }

  return "";
}

function isSavedDespiteEmailFailure(statusCode, body) {
  if (statusCode !== 406) {
    return false;
  }

  const data = parseJsonBody(body);

  if (!data) {
    return false;
  }

  return EMAIL_FAILURE_PATTERN.test(getErrorMessageFromBody(data));
}

function normalizeFormApiResponse(statusCode, body) {
  if (!isSavedDespiteEmailFailure(statusCode, body)) {
    return { statusCode, body };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 200,
      data: { saved: true },
      message: "Feedback submitted successfully."
    })
  };
}

module.exports = {
  getErrorMessageFromBody,
  isSavedDespiteEmailFailure,
  normalizeFormApiResponse
};
