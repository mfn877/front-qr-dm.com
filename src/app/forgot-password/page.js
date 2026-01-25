"use client";

import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import api from "@/lib/api"; // axios instance

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/forgot-password", {
        email,
      });

      if (res.data?.status === "success") {
        Swal.fire(
          "Email Sent",
          "A password reset link has been sent to your email.",
          "success"
        );
        setEmail("");
      } else {
        Swal.fire("Error", res.data?.message || "Unable to send email", "error");
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
          <h1>Forgot Password</h1>
          <p>We’ll send a reset link to your email</p>
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
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
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
