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
              />
                <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      fontSize: "12px",
      color: "#1A73E8",
      cursor: "pointer",
      float: "right",
      marginTop: "4px",
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </span> 
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
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
              />
               <span
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    style={{
      fontSize: "12px",
      color: "#1A73E8",
      cursor: "pointer",
      float: "right",
      marginTop: "4px",
    }}
  >
    {showConfirmPassword ? "Hide" : "Show"}
  </span>
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
                <Link href="/terms-and-conditions" style={{ color: "#1A73E8" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" style={{ color: "#1A73E8" }}>
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
