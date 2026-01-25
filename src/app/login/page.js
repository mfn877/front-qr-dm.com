// src/app/login/page.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import secureLocalStorage from "react-secure-storage";

export default function Page() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        if (res.data.user) {
          secureLocalStorage.setItem("qr_user", res.data.user);
        }

        // Optional: store login flag
        secureLocalStorage.setItem("qr_logged_in", "true");
        window.parent.postMessage("LOGIN_SUCCESS", window.location.origin);
        // Redirect
        router.push("/dashboard");
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
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <div className="form-row">
              <label>
                <input type="checkbox" className="checkbox" />
                Remember me
              </label>
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
              {loading ? "Signing In..." : "Sign In"}
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
