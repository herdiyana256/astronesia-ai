// This is a dynamic import helper for html2canvas
export async function loadHtml2Canvas() {
  return import("html2canvas").then((module) => module.default)
}
