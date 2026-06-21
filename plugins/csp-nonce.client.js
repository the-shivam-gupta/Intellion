function patchStyleNonce(nonce) {
  if (!nonce) {
    return;
  }

  // eslint-disable-next-line no-undef
  __webpack_nonce__ = nonce;

  if (document.documentElement.dataset.cspStyleNonceApplied !== "1") {
    document.documentElement.dataset.cspStyleNonceApplied = "1";

    const originalCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function createElement(tagName, options) {
      const element = originalCreateElement.call(this, tagName, options);

      if (tagName && String(tagName).toLowerCase() === "style") {
        element.setAttribute("nonce", nonce);
      }

      return element;
    };

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          nonceStyleNodes(node, nonce);
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  document.querySelectorAll("style:not([nonce])").forEach((node) => {
    node.setAttribute("nonce", nonce);
  });
}

function nonceStyleNodes(node, nonce) {
  if (node.nodeType !== 1) {
    return;
  }

  if (node.tagName === "STYLE" && !node.getAttribute("nonce")) {
    node.setAttribute("nonce", nonce);
  }

  for (let i = 0; i < node.children.length; i += 1) {
    nonceStyleNodes(node.children[i], nonce);
  }
}

export default function () {
  const nonceMeta = document.querySelector('meta[name="csp-nonce"]');

  if (!nonceMeta) {
    return;
  }

  patchStyleNonce(nonceMeta.getAttribute("content"));
}
