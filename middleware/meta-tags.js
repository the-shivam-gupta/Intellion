export default ({ route, store }) => {
  if (Object.prototype.hasOwnProperty.call(route.params, "project")) {
    return;
  }

  const pagesMeta = store.getters["meta"];
  if (!pagesMeta || !pagesMeta.length) {
    return;
  }

  let meta = false;
  for (let i = 0; i < pagesMeta.length; i++) {
    meta = pagesMeta[i];
    if (route.name == meta.page_route) {
      break;
    }
  }

  if (meta) {
    store.dispatch("updateMeta", meta);
  }
};
