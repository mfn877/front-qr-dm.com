// src/components/Header2.js
"use client";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import React from "react";
import Link from "next/link";
import { logoutUser } from "@/lib/auth";
export default function Header2() {
  const [userName, setUserName] = useState("");
  const user = secureLocalStorage.getItem("qr_user");
  // console.log("Header2 User:", user);
  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user]);
  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser();
    window.location.href = "/";
  };
  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          <img style={{ width: "150px" }} src="/img/logo.png" alt="QR DM" />
        </Link>
        <nav className="nav">
          <Link className='d-lg-block d-none' href="/" id="nav-home">Home</Link>
          <Link href="/#nav-generator">QR Generate</Link>
          <Link className='d-lg-block d-none' href="/dashboard" id="nav-dashboard">Dashboard</Link>
        </nav>
        <div className="header-buttons d-flex align-items-center">
          <div className="dropdown ms-auto">
            <button
              className="btn user-btn dropdown-toggle d-flex align-items-center"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
                className="user-avatar me-2"
                alt="User"
              /> */}
              <span
                className="user-name"
                style={{
                  display: "inline-block",
                  maxWidth: "100px", 
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userName || "User"}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/settings">
                  Reset Password
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item text-danger"
                  href="/login"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
