import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-grid">
                        <div>
                            <img style={{ width: "150px" }} src="/img/logo-white.png" alt="Logo" />
                            <p style={{ color: "#ffffff", marginTop: "20px" }}>Create smart QR codes in seconds. Fast, clean, and
                                powerful.</p>
                        </div>

                        <div className='ms-lg-5'>
                            <h3>Product</h3>
                            <ul>
                                <li><Link href="/qr-generator/url">QR Generator</Link></li>
                                <li><Link href="/dashboard">Dashboard</Link></li>
                                <li><Link href="/feature">Features</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3>Resources</h3>
                            <ul>
                                <li><Link href="/disclaimer">Disclaimer</Link></li>
                                <li><Link href="/faq">FAQs</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3>Company</h3>
                            <ul>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        © 2026 QR-DM. All rights reserved. Managed by <Link href="https://ipistis.com">iPistis</Link>.
                    </div>
                </div>
            </div>
        </footer>
    )
}
