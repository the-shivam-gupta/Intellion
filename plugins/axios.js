import https from "https";
import {
  encryptSensitivePayload,
  shouldEncryptRequest,
  toEncryptedApiPath
} from "~/utils/encryptSensitivePayload";

export default function({ $axios, app, redirect, store }) {
  // Dev only: local/corporate networks often fail Node TLS to webapi.intellion.in.
  // Production keeps full certificate verification (VAPT requirement).
  if (process.env.NODE_ENV === "development") {
    $axios.defaults.httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
  }

  $axios.onError(async error => {
    store.commit("updateGlobalLoader", false);

    if (error.config && error.config.skipErrorRedirect) {
      return Promise.reject(error);
    }

    const res = error.response;
    if (res) {
      redirect(`/error?status=${res.status}`);
    }

    return Promise.resolve(false);
  });
  $axios.onRequest(async (req) => {
    store.commit("updateGlobalLoader", true);

    if (
      process.client &&
      req.method === "post" &&
      req.data &&
      shouldEncryptRequest(req.url || "")
    ) {
      req.skipErrorRedirect = true;
      req.data = await encryptSensitivePayload(
        req.data,
        app.$config.encryptionPublicKey
      );
      req.baseURL = "";
      req.url = toEncryptedApiPath(req.url || "");
    }

    return req;
  });
  $axios.onResponse(response => {
    store.commit("updateGlobalLoader", false);
    return response.data;
  });
}
