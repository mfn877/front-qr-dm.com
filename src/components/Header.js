"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = secureLocalStorage.getItem("qr_user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    secureLocalStorage.removeItem("qr_user");
    secureLocalStorage.removeItem("qr_token");
    window.location.href = "/";
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          <img style={{ width: "150px" }} src="/img/logo.png" alt="Logo" />
        </Link>

        <nav className="nav">
          <Link className="d-lg-block d-none" href="/">Home</Link>
          <Link className="d-lg-block d-none" href="/#nav-generator">QR Generate</Link>
          <Link className="d-lg-block d-none" href="/dashboard">Dashboard</Link>
        </nav>

        <div className="header-buttons">
          {user ? (
            <>
              <button
                className="btn user-btn dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="user-name">
                  {user.name || "User"}
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <Link className="dropdown-item" href="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/settings">
                    Reset Password
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a
                    className="dropdown-item text-danger"
                    href="/"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
