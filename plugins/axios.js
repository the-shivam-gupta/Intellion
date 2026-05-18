export default function({ $axios, app, redirect, store }) {
  $axios.onError(async error => {
    error = {
      ...error
    };
    let returnVal = false;
    let redir = true;
    store.commit("updateGlobalLoader", false);

    const res = error.response;
    if (redir && res) {
      redirect(`/error?status=${res.status}`);
    }

    return Promise.resolve(returnVal);
  });
  $axios.onRequest(req => {
    store.commit("updateGlobalLoader", true);
  });
  $axios.onResponse(response => {
    store.commit("updateGlobalLoader", false);
    return response.data;
  });
}
