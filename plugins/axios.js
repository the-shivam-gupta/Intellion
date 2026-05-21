import https from "https";

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
  $axios.onRequest(req => {
    store.commit("updateGlobalLoader", true);
  });
  $axios.onResponse(response => {
    store.commit("updateGlobalLoader", false);
    return response.data;
  });
}
