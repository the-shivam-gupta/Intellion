import { buildImageSrcset } from "~/middleware/utils";

export default (_context, inject) => {
  inject("buildImageSrcset", buildImageSrcset);
};
