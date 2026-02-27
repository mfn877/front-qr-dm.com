"use client";

import React from "react";
import Link from "next/link";   // ✅ MUST BE HERE


export default function FeaturesPage() {
  return (
    <div>
      {/* ================= INTRO ================= */}
      {/* <h1 style={{ fontSize: 22, marginBottom: 16 }}>
       Dynamic QR
      </h1>

      <p>
        QR DM offers a complete set of smart features designed to help individuals,
        creators, and businesses generate, manage, and track QR codes with ease.
        Every feature is built to be fast, reliable, and simple to use.
      </p>

      <p>
     Update your QR code destination anytime without changing the printed QR. Dynamic QR codes let you modify links, content, or campaigns even after distribution, saving time and reprint costs.
      </p> */}

      {/* ================= CORE FEATURES ================= */}
      {/* <h2 style={{ fontSize: 22,marginTop:10, marginBottom: 16 }}>
        Scan Analytics
      </h2>
      <p>Understand how your QR codes perform with detailed scan tracking. View total scans, engagement trends, and performance insights to measure the success of your campaigns.</p>

      <ul>
        <li>
  <b>Total Scan Tracking</b> – View how many times your QR code has been scanned
  across all campaigns.
</li>
<li>
  <b>Engagement Insights</b> – Monitor scan activity to understand user interest
  and interaction trends.
</li>
<li>
  <b>Time-Based Analytics</b> – Analyze scans by date and time to identify peak
  engagement periods.
</li>
<li>
  <b>Performance Monitoring</b> – Measure QR code effectiveness to optimize
  marketing and sharing strategies.
</li>
      </ul> */}

      {/* ================= DOWNLOAD & ACCESS ================= */}
      {/* <h2 style={{ fontSize: 22, marginBottom: 16 }}>
        Professional Business Cards
      </h2>
      <p>Create modern digital business cards for individuals and teams. Share contact details, social profiles, and professional information instantly with a simple QR scan.</p>

      <ul>
      <li>
  <b>Digital Contact Sharing</b> – Share your contact details instantly using a
  QR code instead of physical business cards.
</li>
<li>
  <b>Modern & Professional Profiles</b> – Create clean, modern digital business
  cards that represent individuals, teams, or organizations.
</li>
<li>
  <b>Easy Updates</b> – Update contact information anytime without reprinting or
  redistributing cards.
</li>
<li>
  <b>Universal Accessibility</b> – Your business card works seamlessly across
  mobile, tablet, and desktop devices.
</li>

      </ul> */}

      {/* ================= SECURITY & CONTROL ================= */}
      {/* <h2 style={{ fontSize: 22, marginBottom: 16 }}>
        Multi-Link Pages
      </h2>
      <p>Share multiple links, profiles, or resources through a single QR code. Perfect for creators, influencers, and brands who want one QR to represent everything they offer.</p>

      <ul>
       <li>
  <b>Multiple Destinations</b> – Share several links such as websites, social
  profiles, stores, or resources using one QR code.
</li>
<li>
  <b>Easy Link Updates</b> – Add, remove, or reorder links anytime without
  changing or reprinting the QR code.
</li>
      </ul> */}

      {/* ================= EXPERIENCE ================= */}
      {/* <h2 style={{ fontSize: 22, marginBottom: 16 }}>
      High-Quality Downloads
      </h2>
      <p>Download your QR codes in transparent PNG format for digital use and SVG format for high-resolution printing. Your QR codes stay sharp and professional across all platforms.</p>

      <p>
        Our platform balances simplicity for beginners with powerful features
        for professionals and growing businesses.
      </p> */}

      {/* ================= CTA ================= */}
      {/* <h2 style={{ fontSize: 22, marginBottom: 16 }}>
        Fast And Free
      </h2>
      <p>Generate QR codes instantly with no account required. QR DM is designed for speed and simplicity, letting you create and download QR codes in seconds.</p>

      <p>
        Create, customize, and manage smart QR codes in minutes using QR DM.
        No technical knowledge required — just fast, flexible, and modern QR
        code generation.
      </p>

       <h2 style={{ fontSize: 22, marginBottom: 16 }}>
        Password Protection
      </h2>
      <p>Secure sensitive QR content by adding password protection. Control who can access your information and protect private links, documents, or campaigns.</p>

      <p>
       Secure your QR codes with passwords to control who can access your content.
      </p> 

       <h2 style={{ fontSize: 22, marginBottom: 16 }}>
     Custom Branding & Design

      </h2>
      <p>Customize your QR codes with brand colors, logos, and styles. Branded QR codes look more professional, build trust, and help maintain visual consistency across marketing materials.</p>

      <p>
        Brands love consistency, and custom-looking QR codes feel more professional and trustworthy
      </p> */}

    <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Features That Make QR Simple</h2>
              <p> Explore powerful features designed to make QR code creation fast, flexible,and reliable for personal and business use. </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>


                <h3>Dynamic QR</h3>
                <p>
                  Update your QR code destination anytime, no reprints needed.{" "}
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3>Scan Analytics</h3>
                <p>Track total scan counts and monitor engagement.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3>Professional Business Cards</h3>
                <p>
                  Create modern digital identities for individuals and teams
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3>Multi-Link Pages</h3>
                <p>Perfect for creators, influencers, and brands.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </div>

                <h3>High-Quality Downloads </h3>
                <p>
                  Download transparent PNG files for digital use and SVG files
                  for print
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 4a8 8 0 100 16 8 8 0 000-16z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 12l4-2"
                    />
                  </svg>
                </div>


                <h3>Fast and Free </h3>
                <p>
                  Start creating QR codes instantly with no account required.{" "}
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M5 11h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                  </svg>
                </div>

                <h3>Password Protection</h3>
                <p>
                  Secure your QR codes with passwords to control who can access your content.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 21v-2a6 6 0 0112 0v2"
                    />
                  </svg>
                </div>
                <h3>Custom Branding & Design</h3>
                <p>
                  Brands love consistency, and custom-looking QR codes feel more professional and trustworthy.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <AdScriptSlot
          html={ads.ads_position_three}
          className="ads-slot ads-slot-three"
        /> */}
        <section className="cta-section">
          <div className="container">
            <img className="mb-3" src="/img/favicon.png" />
            <h2>Ready to get started?</h2>
            <p>
              Create your first QR code in under 30 seconds with our fast,
              simple, and reliable <b>QR code generator</b>designed for everyday
              and business use.{" "}
            </p>
            <Link className="btn btn-primary" href="/qr-generator/url">
              <i className="fa fa-qrcode me-1"></i> Create QR Code
            </Link>
          </div>
        </section>

    </div>

    
  );
}
