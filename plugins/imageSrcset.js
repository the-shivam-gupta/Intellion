import { buildImageSrcset, buildImageSizes } from "~/middleware/utils";

export default (_context, inject) => {
  inject("buildImageSrcset", buildImageSrcset);
  inject("buildImageSizes", buildImageSizes);
};
