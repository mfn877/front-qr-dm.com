//src/app/scan/app-download/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Powredbybrand from "@/components/powredbybrand";

export default function AppDownloadQRPage() {
  const { slug } = useParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");

    api
      .get(`qr-data/front/${slug}`, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        if (res?.data?.status_code === 1) {
          setQrData(res.data.data);
        } else {
          setError("Unable to load QR data.");
        }
      })
      .catch(() => setError("Unable to load QR data."))
      .finally(() => setLoading(false));
  }, [slug]);

  const content = qrData?.content || {};
  const downloadLinks = [
    {
      key: "ios_link",
      label: "App Store",
      icon: "/images/apple-store.svg",
      url: content?.ios_link,
    },
    {
      key: "android_link",
      label: "Google Play",
      icon: "/images/google-play.svg",
      url: content?.android_link,
    },
    {
      key: "apk_link",
      label: "APK Download",
      icon: "/images/android.svg",
      url: content?.apk_link,
    },
  ].filter((item) => Boolean(item.url));

  const primaryUrl = content?.download_url || downloadLinks?.[0]?.url || "";

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading…</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", padding: 40 }}>{error}</p>;
  }

  return (
    <>
      <div className="page">
        <div className="header">
          <h1>App Download</h1>
        </div>

        <div className="main-card">
          <h2>{content?.app_name || qrData?.label || "Application"}</h2>
          <p>Choose your preferred platform to install the app.</p>
          {/* {primaryUrl && (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-link"
            >
              Download now
            </a>
          )} */}
        </div>

        <div className="content-wrapper">
          <div className="card">
            <div className="list-item mb-3" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <GridIcon />
              </div>
              <div className="list-text">
                <span>Download Links</span>
              </div>
            </div>

            {downloadLinks.length === 0 && (
              <p className="muted">No download links are available yet.</p>
            )}

            {downloadLinks.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="list-item social-link"
              >
                <div className="icon-left bg-white">
                  <img src={link.icon} alt={`${link.label} icon`} className="icon" />
                </div>
                <div className="list-text">
                  <strong>{link.label}</strong>
                  <p>Tap to download from {link.label}</p>
                </div>
                <span className="arrow">
                  <Arrow />
                </span>
              </a>
            ))}
          </div>

          <div className="card">
            <div className="list-item mb-3" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <InfoIcon />
              </div>
              <div className="list-text">
                <span>About the app</span>
              </div>
            </div>
            <h2>About the app</h2>
            <p>
              {content?.description ||
                "Install the app from your preferred store to explore every feature."}
            </p>
          </div>
          {/* 
          <Powredbybrand /> */}
        </div>
      </div>

      <style jsx>{`
        .page {
          background: #f4f6f8;
          min-height: 100vh;
        }

        .header {
          background: #1b0c40;
          color: #fff;
          text-align: center;
          padding: 42px 16px 70px;
          border-bottom-left-radius: 30px;
          border-bottom-right-radius: 30px;
        }

        .main-card {
          background: #fff;
          margin: -40px 16px 16px;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .main-card h2 {
          margin: 0;
          font-size: 22px;
        }

        .main-card p {
          color: #777;
          margin: 6px 0 14px;
        }

        .primary-link {
          display: block;
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #7fbf9f;
          color: #111;
          font-size: 16px;
          text-decoration: none;
          font-weight: 600;
        }

        .content-wrapper {
          padding: 0 16px 30px;
        }

        .card {
          background: #fff;
          margin: 10px 0;
          padding: 5px 15px 15px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .social-link {
          text-decoration: none;
          color: inherit;
        }

        .icon-left {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #f1f3f6;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 6px 14px rgba(0, 0, 0, 0.12);
          flex-shrink: 0;
        }

        .bg-white {
          background: #fff;
        }

        .list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
        }

        .list-text strong {
          font-size: 15px;
        }

        .list-text p {
          margin: 0;
          font-size: 13px;
          color: #777;
        }

        .arrow {
          margin-left: auto;
          color: #7b8cff;
        }

        .icon {
          width: 22px;
          height: 22px;
        }

        .card h2 {
          margin: 0 0 8px;
          font-size: 20px;
        }

        .card p {
          margin: 0;
          color: #555;
          font-size: 14px;
          line-height: 1.45;
        }

        .muted {
          text-align: center;
          margin: 0;
          color: #888;
          font-size: 14px;
          padding: 20px 0;
        }

        @media (min-width: 992px) {
          .content-wrapper {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px 60px;
          }

          .main-card {
            max-width: 700px;
            margin: -60px auto 30px;
            padding: 30px;
          }

          .header {
            padding: 70px 20px 120px;
          }

          .main-card h2 {
            font-size: 28px;
          }

          .card {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}

function GridIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="6" height="6" />
      <rect x="11" y="3" width="6" height="6" />
      <rect x="3" y="11" width="6" height="6" />
      <rect x="11" y="11" width="6" height="6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="8" />
      <path d="M10 8v6" />
      <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
