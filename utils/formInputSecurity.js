const HTML_TAG_PATTERN = /<[^>]+>/;

function containsHtmlTags(value) {
  return typeof value === "string" && HTML_TAG_PATTERN.test(value);
}

function sanitizeFormText(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/<[^>]*>/g, "").trim();
}

function sanitizeFormPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  const sanitized = { ...payload };

  Object.keys(sanitized).forEach((key) => {
    if (typeof sanitized[key] === "string") {
      sanitized[key] = sanitizeFormText(sanitized[key]);
    }
  });

  return sanitized;
}

function payloadContainsHtml(payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  return Object.values(payload).some((value) => containsHtmlTags(value));
}

module.exports = {
  containsHtmlTags,
  sanitizeFormText,
  sanitizeFormPayload,
  payloadContainsHtml
};
