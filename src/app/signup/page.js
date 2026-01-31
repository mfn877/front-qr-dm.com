"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { signupUser } from "@/services/authService";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const EyeIcon = ({ visible }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {!visible && <path d="M4 4l16 16" strokeLinecap="round" />}
    </svg>
  );

  const passwordFieldStyles = {
    position: "relative",
    width: "100%",
  };

  const toggleButtonStyles = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    color: "#1A73E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.agree) {
      setError("You must agree to the Terms & Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const res = await signupUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.status_code === 1 && res?.data?.token) {
        // Store JWT securely
        secureLocalStorage.setItem("qr_token", res.data.token);
        secureLocalStorage.setItem("qr_logged_in", true);
        window.parent.postMessage("LOGIN_SUCCESS", "*");
        // Redirect after successful signup
        router.push("/dashboard");
      } else {
        setError(res?.message || "Signup failed");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signup-page" className="page auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <img width="200" src="/img/logo.png" alt="QR DM" />
          </Link>
          <h1>Create your account</h1>
          <p>Start creating smart QR codes today</p>
        </div>

        <div className="card auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input"
                placeholder="John Doe"
                autoComplete="name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div style={passwordFieldStyles}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  style={{ paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={toggleButtonStyles}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div style={passwordFieldStyles}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  style={{ paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={toggleButtonStyles}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showConfirmPassword} />
                </button>
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "start",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "#5F6368",
              }}
            >
              <input
                type="checkbox"
                className="checkbox"
                checked={form.agree}
                onChange={(e) =>
                  setForm({ ...form, agree: e.target.checked })
                }
              />
              <span>
                I agree to the{" "}
                <Link target="_blank" href="/terms-and-conditions" style={{ color: "#1A73E8" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link target="_blank" href="/privacy-policy" style={{ color: "#1A73E8" }}>
                  Privacy Policy
                </Link>
              </span>
            </label>

            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
