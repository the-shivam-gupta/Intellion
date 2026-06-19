export function setCspDynamicStyle(styleId, cssText) {
  if (typeof document === "undefined") {
    return;
  }

  const nonceMeta = document.querySelector('meta[name="csp-nonce"]');
  const nonce = nonceMeta ? nonceMeta.getAttribute("content") : "";
  let styleEl = document.getElementById(styleId);

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;

    if (nonce) {
      styleEl.setAttribute("nonce", nonce);
    }

    document.head.appendChild(styleEl);
  }

  styleEl.textContent = cssText;
}
