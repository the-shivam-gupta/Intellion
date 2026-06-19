export default function () {
  const nonceMeta = document.querySelector('meta[name="csp-nonce"]');

  if (!nonceMeta) {
    return;
  }

  const nonce = nonceMeta.getAttribute("content");

  if (nonce) {
    // Webpack uses this when injecting lazy-loaded JS/CSS at runtime.
    // eslint-disable-next-line no-undef
    __webpack_nonce__ = nonce;
  }
}
