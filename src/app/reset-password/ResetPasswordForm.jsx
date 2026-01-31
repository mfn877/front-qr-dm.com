"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import api from "@/lib/api"; // axios instance

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailFromUrl = searchParams.get("email") || "";
    setEmail(emailFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    if (!otp) {
      Swal.fire("Error", "OTP is required", "error");
      return;
    }

    if (!password) {
      Swal.fire("Error", "Password is required", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/reset-password", {
        email,
        otp,
        password,
        password_confirmation: confirmPassword,
      });

      if (res.data?.status === "success") {
        Swal.fire("Success", "Your password has been reset.", "success");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        router.push("/login");
      } else {
        Swal.fire("Error", res.data?.message || "Unable to reset password", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page" className="page auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <img width="200" src="/img/logo.png" />
          </Link>
          <h1>Reset Password</h1>
          <p>Enter your OTP and new password</p>
        </div>

        <div className="card auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly={Boolean(searchParams.get("email"))}
              />
            </div>

            <div className="input-group">
              <label className="input-label">OTP</label>
              <input
                type="text"
                className="input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                className="input"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-footer">
            Back to login <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
