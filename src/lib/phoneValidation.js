/**
 * International phone validation (E.164)
 * + is mandatory
 * Spaces allowed while typing
 * India (+91) must have exactly 10 digits after country code
 */

export function validatePhone(phone) {
  if (!phone) {
    return {
      isValid: false,
      cleanPhone: "",
      digitsOnly: "",
      countryCode: "",
      nationalNumber: "",
    };
  }

  // 1️⃣ Remove spaces, dashes, brackets
  const cleanPhone = phone.replace(/[\s()-]/g, "");

  // Must start with +
  if (!cleanPhone.startsWith("+")) {
    return {
      isValid: false,
      cleanPhone,
      digitsOnly: cleanPhone.replace("+", ""),
      countryCode: "",
      nationalNumber: "",
    };
  }

  // 2️⃣ Extract digits only
  const digitsOnly = cleanPhone.replace("+", "");

  // 3️⃣ E.164 basic rule (8–15 digits total)
  const e164Regex = /^[1-9]\d{7,14}$/;
  if (!e164Regex.test(digitsOnly)) {
    return {
      isValid: false,
      cleanPhone,
      digitsOnly,
      countryCode: "",
      nationalNumber: "",
    };
  }

  // 4️⃣ Detect country code (basic split)
  let countryCode = "";
  let nationalNumber = "";

  if (digitsOnly.startsWith("91")) {
    countryCode = "91";
    nationalNumber = digitsOnly.slice(2);

    // 🇮🇳 India rule → exactly 10 digits
    if (nationalNumber.length !== 10) {
      return {
        isValid: false,
        cleanPhone,
        digitsOnly,
        countryCode,
        nationalNumber,
      };
    }
  } else {
    // Other countries (1–3 digit country code assumption)
    countryCode = digitsOnly.slice(0, digitsOnly.length - 10);
    nationalNumber = digitsOnly.slice(-10);
  }

  return {
    isValid: true,
    cleanPhone,        // +919876543210
    digitsOnly,        // 919876543210
    countryCode,       // 91
    nationalNumber,    // 9876543210
  };
}
