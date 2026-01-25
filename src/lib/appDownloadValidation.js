import { isValidHttpsUrl } from "@/lib/urlValidation";

export function validateAppDownload(ios, android, apk) {
  const iosValid = ios ? isValidHttpsUrl(ios) : false;
  const androidValid = android ? isValidHttpsUrl(android) : false;
  const apkValid = apk ? isValidHttpsUrl(apk) : false;

  const validCount = [iosValid, androidValid, apkValid].filter(Boolean).length;

  // ❌ No valid link
  if (validCount === 0) {
    return {
      canGenerate: false,
      error: "Enter exactly ONE valid app download link",
      finalUrl: "",
    };
  }

  // ❌ More than one valid link
  if (validCount > 1) {
    return {
      canGenerate: false,
      error: "Only ONE app link is allowed (iOS or Android or APK)",
      finalUrl: "",
    };
  }

  // ❌ One valid, but other fields filled with INVALID URLs
  if (
    (ios && !iosValid) ||
    (android && !androidValid) ||
    (apk && !apkValid)
  ) {
    return {
      canGenerate: false,
      error: "Remove invalid links. Only one valid link is allowed",
      finalUrl: "",
    };
  }

  // ✅ Exactly ONE valid link
  return {
    canGenerate: true,
    error: "",
    finalUrl: iosValid ? ios : androidValid ? android : apk,
  };
}
