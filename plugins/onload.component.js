// @ts-nocheck
import Vue from "vue";

// import all global component files
const requireComponent = require.context(
  // The relative path of the components folder
  "~/GlobalComponents",
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Include components globally
  const component = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  Vue.component(
    component,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});
