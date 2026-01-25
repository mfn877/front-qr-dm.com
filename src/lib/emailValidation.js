/**
 * Email validation
 * - Empty email → invalid (QR should not generate)
 * - Must follow standard email format
 */

export function validateEmail(email) {
  if (!email) {
    return {
      isValid: false,
      cleanEmail: "",
    };
  }

  const cleanEmail = email.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(cleanEmail);

  return {
    isValid,
    cleanEmail, // example: john@example.com
  };
}
