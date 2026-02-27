// src/app/login/page.js
"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser, loginUser } from "@/services/authService";
import secureLocalStorage from "react-secure-storage";
import { getToken, isLoggedIn, removeToken } from "@/utils/storage";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const validateUser = async () => {
      const token = getToken();
      if (!token) return;

      try {
        // validate token with backend
        await getCurrentUser();
        // token valid → go dashboard
        router.replace("/dashboard");
      } catch (error) {
        // token invalid or expired → go login
        removeToken();
      }
    };

    validateUser();
  }, [router]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res?.status_code === 1 && res?.data?.token) {
        // console.log("Login successful", res.data);
        // Store token
        secureLocalStorage.setItem("qr_token", res.data.token);
        // ✅ Store user object
        if (res.user) {
          secureLocalStorage.setItem("qr_user", res.user);
        }

        // Optional: store login flag
        secureLocalStorage.setItem("qr_logged_in", "true");
        window.parent.postMessage("LOGIN_SUCCESS", "*");
        // Redirect to provided path or default dashboard
        const redirectPath = searchParams.get("redirect");
        router.push(redirectPath || "/dashboard");
      } else {
        setError(res?.message || "Invalid credentials");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div id="login-page" className="page auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <img width="200" src="/img/logo.png" alt="QR DM" />
          </Link>
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>

        <div className="card auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
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

            <div className="form-row">
              {/* <label>
                <input type="checkbox" className="checkbox" />
                Remember me
              </label> */}
              <Link href="/forgot-password">Forgot password?</Link>
            </div>

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
              {loading ? <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Signing In</> : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="page auth-page">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
