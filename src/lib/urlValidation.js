export function isValidHttpsUrl(url) {
  if (!url || url.trim() === "") return false;

  // 🔴 must explicitly start with https://
  if (!url.startsWith("https://")) return false;

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") return false;

    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
    return domainRegex.test(parsed.hostname);
  } catch {
    return false;
  }
}
