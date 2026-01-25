export function sanitizeSvg(svg) {
  if (!svg || typeof svg !== "string") return "";

  return svg
    .replace(/<\?xml.*?\?>/g, "") // remove xml header
    .replace(/<!DOCTYPE.*?>/g, "") // remove doctype
    .trim();
}
