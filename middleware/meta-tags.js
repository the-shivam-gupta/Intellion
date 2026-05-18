export default ({ route, store }) => {
  let meta = false;
  if (!Object.prototype.hasOwnProperty.call(route.params, "project")) {
    const pagesMeta = store.getters["meta"];
    for (let i = 0; i < pagesMeta.length; i++) {
      meta = pagesMeta[i];
      if (route.name == meta.page_route) {
        break;
      }
    }
    store.dispatch("updateMeta", meta);
  }
};
