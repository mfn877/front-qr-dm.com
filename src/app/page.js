"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRTypesR from "@/components/QRTypesR";
import AdScriptSlot from "@/components/AdScriptSlot";
import Link from "next/link";
import Header2 from "@/components/Header2";
import { getToken, isLoggedIn } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAdsSettings } from "@/services/settingsService";
import { useQrTypesQuery } from "@/services/qrtypes";
import { getCurrentUser } from "@/services/authService";

export default function Home() {
  const router = useRouter();
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [ads, setAds] = useState({});
  const {
    data: qrTypes = [],
    isLoading: qrTypesLoading,
    error: qrTypesError,
  } = useQrTypesQuery({
    staleTime: 10 * 60 * 1000,
  });
  useEffect(() => {
    if (isLoggedIn()) {
      setLoggedInStatus(true);
    }
  }, [router]);

  useEffect(() => {
    let mounted = true;
    const loadAds = async () => {
      try {
        const { values } = await fetchAdsSettings();
        if (mounted) {
          setAds(values || {});
        }
      } catch (error) {
        console.error("Failed to load ads settings:", error);
      }
    };

    loadAds();
    return () => {
      mounted = false;
    };
  }, []);

  const faqData = [
    {
      section: "General Questions",
      items: [
        {
          q: "What is QR DM?",
          a: "QR DM is a fast and reliable QR code generator designed for personal, academic, and business use. It allows you to create high-quality QR codes in seconds without technical skills.",
        },
        {
          q: "Is QR DM free to use?",
          a: "Yes. You can generate and download QR codes for free without signing up. Premium features may be available for advanced use cases.",
        },
        {
          q: "Do I need to create an account to generate QR codes?",
          a: "No account is required to create and download QR codes. Creating an account allows you to manage and track QR codes more efficiently.",
        },
      ],
    },
    {
      section: "QR Code Types & Features",
      items: [
        {
          q: "What types of QR codes can I create with QR DM?",
          a: "QR DM supports URL, WiFi, Phone, SMS, Email, vCard, Location, Text, WhatsApp, App Links, Documents, Events, App Downloads, Payments, Multi-Link Pages, and Business Profiles.",
        },
        {
          q: "Can I create QR codes for business use?",
          a: "Yes. QR DM QR codes are perfect for marketing, menus, business cards, payments, events, and more.",
        },
        {
          q: "Can I create a digital business card QR code?",
          a: "Yes. Business Card and vCard QR codes allow instant sharing of contact and company details.",
        },
      ],
    },
    {
      section: "Editing & Dynamic QR Codes",
      items: [
        {
          q: "Can I edit my QR code after creating it?",
          a: "Yes. Dynamic QR codes allow content updates without changing the QR design.",
        },
        {
          q: "Will my QR codes expire?",
          a: "Static QR codes never expire. Dynamic QR codes remain active while your plan is active.",
        },
      ],
    },
    {
      section: "Scanning & Compatibility",
      items: [
        {
          q: "How do users scan QR codes?",
          a: "Most smartphones scan QR codes directly using the camera app.",
        },
        {
          q: "What happens if part of the QR code is damaged?",
          a: "QR codes include error correction and can still be scanned even if partially damaged.",
        },
      ],
    },
    {
      section: "Design & Download",
      items: [
        {
          q: "What file formats can I download?",
          a: "You can download QR codes in PNG and SVG formats.",
        },
        {
          q: "Does color affect QR code scanning?",
          a: "Yes. High contrast between code and background ensures better scanning.",
        },
      ],
    },
    {
      section: "Analytics & Tracking",
      items: [
        {
          q: "Does QR DM provide scan analytics?",
          a: "Yes. Dynamic QR codes offer scan tracking and performance insights.",
        },
      ],
    },
    {
      section: "Security & Privacy",
      items: [
        {
          q: "Are QR codes secure?",
          a: "Yes. QR codes are secure, but users should verify sources before scanning.",
        },
        {
          q: "Does QR DM store or sell my data?",
          a: "No. QR DM respects user privacy and does not sell personal data.",
        },
      ],
    },
    {
      section: "Payments & Commercial Use",
      items: [
        {
          q: "Can I use QR DM QR codes commercially?",
          a: "Yes. QR codes created with QR DM can be used for commercial, educational, and promotional purposes.",
        },
        {
          q: "Can I create payment QR codes?",
          a: "Yes. QR DM supports payment QR codes for fast and secure transactions.",
        },
      ],
    },
    {
      section: "Support",
      items: [
        {
          q: "Where can I get help if I have questions?",
          a: "You can visit our Help Center, read our blog and guides, or contact our support team.",
        },
      ],
    },
  ];

  useEffect(() => {
    const validateUser = async () => {
      const token = getToken();
      if (!token) return;

      try {
        // validate token with backend
        await getCurrentUser();
      } catch (error) {
        // token invalid or expired → go login
        removeToken();
      }
    };

    validateUser();
  }, [router]);
  
  return (
    <div>
      {
        loggedInStatus ? <Header2 /> : <Header />
      }
      <div id="home-page" className="page active">
        <section
          className="hero"
          style={{
            background:
              "linear-gradient(138.18deg,  #1b0c40 0%,  #1b0c40 94.44%)",
           
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7 align-self-center">
                <h1 className="text-white">Create Smart QR Codes in Seconds</h1>
                <p className="text-white">
                  QR DM is a fast and reliable QR code generator built for
                  personal, academic, and business use. Generate high-quality QR
                  codes, download them instantly, and share information
                  effortlessly with no technical skills required.{" "}
                </p>
                <Link className="btn  home-gradient-btn" href="/qr-generator/url">
                  <i className="fa fa-qrcode me-1"></i> Create QR
                </Link>
              </div>
              <div className="col-md-5 mt-lg-0 mt-5 align-self-center">
                <img className="w-100" src="/img/bg1.png" />
              </div>
            </div>
          </div>
        </section>
        {/* <AdScriptSlot
          html={ads.ads_position_one}
          className="ads-slot ads-slot-one"
        /> */}
        <QRTypesR
          qrData={qrTypes}
          loading={qrTypesLoading}
          error={qrTypesError}
        />
        {/* <AdScriptSlot
          html={ads.ads_position_two}
          className="ads-slot ads-slot-two"
        /> */}
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
      <Footer />
    </div>
  );
}
