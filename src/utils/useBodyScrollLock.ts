export function lockBodyScroll() {
  if (typeof document !== "undefined" && window.innerWidth < 768) {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }
}

export function unlockBodyScroll() {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  }
}
