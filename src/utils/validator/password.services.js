const rules = [
  {
    label: "At least 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    label: "Contains uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    label: "Contains lowercase letter",
    test: (value) => /[a-z]/.test(value),
  },
  {
    label: "Contains number",
    test: (value) => /\d/.test(value),
  },
  {
    label: "Contains special character",
    test: (value) => /[!@#$%^&*]/.test(value),
  },
];

export function usePasswordValidator(password = "") {
  const validations = rules.map((rule) => ({
    ...rule,
    passed: password.length > 0 && rule.test(password),
  }));

  const isValid =
    password.length > 0 && validations.every((v) => v.passed);

  const passed = validations.filter((v) => v.passed).length;
  const total = validations.length;

  const percent = total > 0 ? (passed / total) * 100 : 0;

  let color = "#ef4444";
  let label = "";

  if (percent > 0 && percent <= 33) {
    label = "Weak";
    color = "#ef4444";
  } else if (percent <= 66) {
    label = "Fair";
    color = "#f97316";
  } else if (percent < 100) {
    label = "Good";
    color = "#eab308";
  } else if (percent === 100) {
    label = "Strong";
    color = "#22c55e";
  }

  return {
    isValid,
    validations,
    percent,
    color,
    label,
  };
}