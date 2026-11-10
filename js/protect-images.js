// Discourage saving images: block right-click and drag on <img> elements.
(function () {
  function isImage(target) {
    return target && target.tagName === "IMG";
  }

  document.addEventListener("contextmenu", function (e) {
    if (isImage(e.target)) e.preventDefault();
  });

  document.addEventListener("dragstart", function (e) {
    if (isImage(e.target)) e.preventDefault();
  });
})();
