"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import { getToken } from "@/utils/storage";
import Header2 from "@/components/Header2";

export default function Page() {
  return (
    <div>
      {getToken() ? <Header2 /> : <Header />}

      <div id="home-page" className="page active">
        {/* ================= HERO ================= */}
        <section
          className="hero"
          style={{
            background:
              "linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center text-center">
                <h1 className="mb-0">Features</h1>
              </div>
              {/* <div className="col-md-5 text-center">
                <img
                  style={{ width: 200 }}
                  src="/img/feature.png"
                  alt="Features"
                />
              </div> */}
            </div>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="features-section">
          <div className="container">
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
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
