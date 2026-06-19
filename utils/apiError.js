export function getApiErrorMessage(
  error,
  fallback = "Unable to submit the form. Please try again later."
) {
  const data = error && error.response && error.response.data;

  if (data && data.error && data.error.message) {
    return data.error.message;
  }

  if (data && data.message) {
    return data.message;
  }

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  return fallback;
}

// WordPress saves the entry but returns 406 when notification email fails.
export function isSavedDespiteServerError(error) {
  const status = error && error.response && error.response.status;

  if (status !== 406) {
    return false;
  }

  const message = getApiErrorMessage(error, "");

  return /feedback could not sent/i.test(message);
}
