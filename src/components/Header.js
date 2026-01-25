import React from 'react'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <Link href="/" className="logo">
                    <img style={{ width: "150px" }} src="/img/logo.png" />
                </Link>
                <nav className="nav">
                    <Link href="/" id="nav-home">Home</Link>
                    <Link href="/#nav-generator">QR Generate</Link>
                    <Link href="/dashboard" id="nav-dashboard">Dashboard</Link>
                </nav>

                <div className="header-buttons">
                    <Link href="/login" className="btn btn-ghost">Login</Link>
                    <Link href="/signup" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </header>
    )
}
