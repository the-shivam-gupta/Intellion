export const youtube_parser = url => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

export const uniqueByKeepLast = (data, key) => {
  return [...new Map(data.map(x => [key(x), x])).values()];
};

export const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isNotEmpty = str => {
  var pattern = /\S+/;
  return pattern.test(str);
};
export const validateName = name => {
  var re = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
  return re.test(name);
};
export const validateNumber = number => {
  var re = /^[0]?[1-9]\d{9}$/;
  return re.test(String(number));
};

export const containsHtmlTags = value => {
  return typeof value === "string" && /<[^>]+>/i.test(value);
};

export const autoFocusInput = fieldId => {
  document.getElementById(fieldId).focus();
};

const IMAGE_SIZE_KEYS = [
  "medium",
  "medium_large",
  "large",
  "post-thumbnail",
  "1536x1536",
  "2048x2048",
];

const IMAGE_SIZE_PRESETS = {
  banner: "100vw",
  hero: "100vw",
  projectCard: "(max-width: 576px) 260px, 350px",
  projectHoverCard: "(max-width: 576px) 100vw, 455px",
  fullSlider: "(max-width: 576px) 100vw, (max-width: 768px) 475px, (max-width: 1024px) 630px, 690px",
  fitSlider: "(max-width: 576px) 75px, (max-width: 768px) 120px, 160px",
  default: "100vw",
};

const getFullImageWidth = (sizes) =>
  Number(sizes.width) ||
  Number(sizes["2048x2048-width"]) ||
  Number(sizes["1536x1536-width"]) ||
  Number(sizes["post-thumbnail-width"]) ||
  Number(sizes["large-width"]) ||
  Number(sizes["medium_large-width"]) ||
  1920;

/** Width-based srcset so the browser picks resolution from layout + DPR. */
export const buildImageSrcset = (image, sizesOverride) => {
  if (!image || !image.src) {
    return undefined;
  }
  const sizes = sizesOverride || image.sizes || {};
  const byUrl = new Map();

  const addCandidate = (url, width) => {
    if (!url) {
      return;
    }
    const w = Number(width);
    if (!w || w <= 0) {
      return;
    }
    const existing = byUrl.get(url);
    if (!existing || existing < w) {
      byUrl.set(url, w);
    }
  };

  IMAGE_SIZE_KEYS.forEach((key) => {
    addCandidate(sizes[key], sizes[`${key}-width`]);
  });

  addCandidate(image.src, getFullImageWidth(sizes));

  const candidates = Array.from(byUrl.entries())
    .map(([url, width]) => ({ url, width }))
    .sort((a, b) => a.width - b.width);

  if (candidates.length <= 1) {
    return undefined;
  }

  return candidates.map(({ url, width }) => `${url} ${width}w`).join(", ");
};

export const buildImageSizes = (context = "default") =>
  IMAGE_SIZE_PRESETS[context] || IMAGE_SIZE_PRESETS.default;
