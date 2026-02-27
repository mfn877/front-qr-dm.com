"use client";
import Link from "next/link";
import FeaturesPage from "./Features";

const features = [
  { icon: "bi bi-lightning-charge-fill", label: "Dynamic QR Codes",      desc: "Update destinations anytime without reprinting" },
  { icon: "bi bi-bar-chart-line-fill",   label: "Scan Analytics",         desc: "Track total scans and engagement over time" },
  { icon: "bi bi-link-45deg",            label: "Multi-Link Pages",       desc: "Share multiple destinations from one QR code" },
  { icon: "bi bi-person-vcard-fill",     label: "Digital Business Cards", desc: "Professional cards for individuals and teams" },
  { icon: "bi bi-filetype-svg",          label: "High-Quality Exports",   desc: "Transparent PNG and print-ready SVG formats" },
  { icon: "bi bi-rocket-takeoff-fill",   label: "Free & Fast Access",     desc: "No account required to get started" },
];

const stats = [
  { value: "17+", label: "QR Code Types" },
  { value: "30s",  label: "To Create a Code" },
  { value: "100%", label: "Free to Start" },
  { value: "∞",    label: "Downloads" },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .about-wrap { max-width:100%; margin:0 auto; padding:48px 24px 72px;  }

        /* Hero */
        .about-hero { text-align:center; margin-bottom:64px; animation:fadeUp 0.5s ease both; }
        .about-badge { display:inline-block; background:linear-gradient(135deg,#eae8fd,#fce5e6); color:#7c6fcd; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:5px 18px; border-radius:100px; border:1px solid #d6d0fa; margin-bottom:20px; }
        .about-hero h1 { font-size:clamp(28px,5vw,48px); font-weight:800; color:#1a1a2e; line-height:1.2; margin:0 0 18px; }
        .about-hero h1 span { background:linear-gradient(135deg,#7c6fcd,#c06c84); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .about-hero p { font-size:17px; color:#666; line-height:1.8; max-width:620px; margin:0 auto; }

        /* Divider */
        .about-divider { display:flex; align-items:center; gap:16px; margin:48px 0; }
        .about-divider span { height:1px; flex:1; background:linear-gradient(to right,transparent,#e2e0f8,transparent); }
        .about-divider-dot { width:8px; height:8px; border-radius:50%; background:#b5aef8; flex-shrink:0; }

        /* Stats row */
        .stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:64px; animation:fadeUp 0.5s ease 0.1s both; }
        .stat-box { text-align:center; padding:24px 12px; background:#fff; border:1.5px solid #eae8fd; border-radius:16px; transition:border 0.2s, box-shadow 0.2s; }
        .stat-box:hover { border-color:#b5aef8; box-shadow:0 4px 20px #b5aef820; }
        .stat-val { font-size:34px; font-weight:800; color:#7c6fcd;line-height:1; }
        .stat-lbl { font-size:12px; color:#999; font-weight:600; letter-spacing:0.5px; margin-top:6px; text-transform:uppercase; }

        /* Section titles */
        .sec-label { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:#b5aef8; margin-bottom:10px; }
        .sec-title { font-size:clamp(20px,3vw,28px); font-weight:800; color:#1a1a2e; margin:0 0 16px; line-height:1.3; }
        .sec-body  { font-size:15px; color:#666; line-height:1.85; margin:0 0 14px; }

        /* Two-col text section */
        .two-col { display:grid; grid-template-columns:1fr 1fr; gap:40px; margin-bottom:64px; animation:fadeUp 0.5s ease 0.15s both; }

        /* Features grid */
        .feat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-bottom:64px; }
        .feat-item { display:flex; gap:14px; align-items:flex-start; padding:18px 20px; background:#fff; border:1.5px solid #eae8fd; border-radius:14px; animation:fadeUp 0.4s ease both; transition:border 0.2s, box-shadow 0.2s; }
        .feat-item:hover { border-color:#b5aef8; box-shadow:0 4px 18px #b5aef820; }
        .feat-icon { font-size:22px; flex-shrink:0; line-height:1; }
        .feat-name { font-size:14px; font-weight:700; color:#1a1a2e; margin-bottom:3px; }
        .feat-desc { font-size:13px; color:#888; line-height:1.55; }

        /* Vision card */
        .vision-card { background:linear-gradient(135deg,#eae8fd 0%,#fce5e6 100%); border:1.5px solid #d6d0fa; border-radius:24px; padding:40px 44px; margin-bottom:64px; animation:fadeUp 0.5s ease 0.2s both; }
        .vision-card p { color:#555; font-size:15px; line-height:1.85; margin:0 0 14px; }
        .vision-card p:last-child { margin:0; }

        /* CTA */
        .cta-box { text-align:center; padding:48px 32px; background:#fff; border:2px solid #eae8fd; border-radius:24px; animation:fadeUp 0.5s ease 0.25s both; }
        .cta-box p { font-size:15px; color:#666; line-height:1.75; max-width:520px; margin:0 auto 28px; }
        .cta-btn { display:inline-block; padding:14px 36px; background:linear-gradient(135deg,#7c6fcd,#c06c84); color:#fff; border-radius:12px; font-weight:700; font-size:15px; text-decoration:none; letter-spacing:0.5px; transition:opacity 0.2s, transform 0.2s; }
        .cta-btn:hover { opacity:0.9; transform:translateY(-2px); color:#fff; }

        @media(max-width:680px){
          .stats-row { grid-template-columns:repeat(2,1fr); }
          .two-col   { grid-template-columns:1fr; gap:0; }
          .vision-card { padding:28px 24px; }
          .cta-box { padding:32px 20px; }
        }
      `}</style>

      <div className="about-wrap">

        {/* ── Hero ── */}
        <div className="about-hero">
          <h1>Create Smart QR Codes<br/><span>in Seconds</span></h1>
          <p>
            A fast, reliable QR code platform for personal, academic, and business use —
            connecting the physical and digital world with ease.
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="stats-row">
          {stats.map((s, i) => (
            <div className="stat-box" key={i} style={{ animationDelay:`${i*0.07}s` }}>
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="about-divider"><span/><div className="about-divider-dot"/><span/></div>

        {/* ── Platform Overview ── */}
        <div className="two-col" style={{ marginBottom:48 }}>
          <div>
            <div className="sec-label">The Platform</div>
            <h2 className="sec-title">Built for Speed, Simplicity, and Reliability</h2>
            <p className="sec-body">
              QR DM was built with a strong focus on speed, clarity, and performance.
              Our intuitive interface allows users to generate, download, and share
              QR codes instantly — whether for websites, documents, payments, or digital profiles.
            </p>
          </div>
          <div style={{ paddingTop: 42 }}>
            <p className="sec-body">
              With support for <strong style={{ color:"#7c6fcd" }}>17 powerful QR code types</strong>, QR DM covers everything
              from basic sharing to advanced business use cases in one platform.
            </p>
            <p className="sec-body">
              From students and creators to professionals and growing businesses,
              QR DM helps anyone get started without technical knowledge.
            </p>
          </div>
        </div>

        <div className="about-divider"><span/><div className="about-divider-dot"/><span/></div>

        {/* ── Features ── */}
        <div style={{ marginBottom:48, marginTop:48 }}>
          <div className="sec-label">Features</div>
          <h2 className="sec-title">Smart Features That Work for You</h2>
        </div>
            <div className="features-grid ">
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

        <div className="about-divider"><span/><div className="about-divider-dot"/><span/></div>

        {/* ── Vision ── */}
        <div style={{ marginTop:48, marginBottom:20 }}>
          <div className="sec-label">Our Vision</div>
          <h2 className="sec-title">Designed for Everyone</h2>
        </div>
        <div className="vision-card">
          <p>
            QR DM is designed to be simple for beginners and powerful enough for businesses.
            The platform works smoothly across devices and delivers reliable, high-quality
            QR codes every time — whether you're sharing a quick link or managing a long-term campaign.
          </p>
          <p>
            We believe QR codes should be fast, smart, and accessible to everyone.
            As digital interaction continues to grow, QR DM is committed to building tools
            that make information sharing easier, more efficient, and more connected.
          </p>
          <p>
            We continuously improve our platform based on user feedback and real-world use cases.
          </p>
        </div>

        {/* ── CTA ── */}
        <div className="cta-box">
          <div className="about-badge" style={{ marginBottom:16 }}>Get Started</div>
          <h2 className="sec-title" style={{ margin:"0 0 12px" }}>Ready to create your first QR code?</h2>
          <p>
            Create your first smart QR code in under 30 seconds using QR DM.
            Fast, clean, and powerful QR code generation for everyday and business use.
          </p>
          <Link href="/qr-generator" className="cta-btn">
            Generate a QR Code →
          </Link>
        </div>

      </div>
    </>
  );
}
