/* TEMPORARY DEV TOOL — safe to delete this file and its <script> tag at any time.
   Adds a floating button that opens the current page in a phone-width iframe so
   mobile layout can be checked without resizing the real browser window.
   Uses an iframe (not a CSS width hack) because @media queries key off the
   actual viewport, which only an iframe's own browsing context provides. */
(function () {
  "use strict";

  if (window.self !== window.top) {
    return;
  }

  var style = document.createElement("style");
  style.textContent = [
    "#dev-viewport-toggle{position:fixed;bottom:20px;right:20px;z-index:99999;",
    "background:#ffcc00;color:#111;border:2px dashed #111;border-radius:8px;",
    "padding:10px 16px;font-family:sans-serif;font-size:14px;font-weight:700;",
    "cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.35);}",
    "#dev-viewport-toggle:hover{background:#ffd633;}",
    "#dev-mobile-frame-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);",
    "display:flex;flex-direction:column;align-items:center;justify-content:center;",
    "gap:12px;z-index:99998;}",
    "#dev-mobile-frame-close{background:#ffcc00;color:#111;border:2px dashed #111;",
    "border-radius:8px;padding:8px 14px;font-family:sans-serif;font-size:13px;",
    "font-weight:700;cursor:pointer;}",
    "#dev-mobile-frame{width:375px;height:780px;max-height:80vh;border:10px solid #111;",
    "border-radius:30px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,0.5);}"
  ].join("");
  document.head.appendChild(style);

  var toggleBtn = document.createElement("button");
  toggleBtn.id = "dev-viewport-toggle";
  toggleBtn.type = "button";
  toggleBtn.textContent = "📱 Preview Mobile";
  document.body.appendChild(toggleBtn);

  var overlay = null;

  function closePreview() {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
    document.removeEventListener("keydown", onKeydown);
    toggleBtn.style.display = "";
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      closePreview();
    }
  }

  function openPreview() {
    overlay = document.createElement("div");
    overlay.id = "dev-mobile-frame-overlay";
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closePreview();
      }
    });

    var closeBtn = document.createElement("button");
    closeBtn.id = "dev-mobile-frame-close";
    closeBtn.type = "button";
    closeBtn.textContent = "✕ Exit Mobile Preview";
    closeBtn.addEventListener("click", closePreview);

    var iframe = document.createElement("iframe");
    iframe.id = "dev-mobile-frame";
    iframe.title = "Mobile preview";
    iframe.src = window.location.href;

    overlay.appendChild(closeBtn);
    overlay.appendChild(iframe);
    document.body.appendChild(overlay);

    document.addEventListener("keydown", onKeydown);
    toggleBtn.style.display = "none";
  }

  toggleBtn.addEventListener("click", openPreview);
})();
