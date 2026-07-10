// Tiny bus so scroll animations wait for the black splash intro to finish.
export function markIntroDone() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event("jt:intro-done"));
}

export function isIntroDone() {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "done";
}
