// src/app/scan/multi-links/[slug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function MultiLinkQRPage() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchQRData = async () => {
      try {
        const res = await api.get(`qr-data/front/${slug}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (res?.data?.status_code === 1) {
          setQrData(res.data.data);
        } else {
          setError("QR data not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load QR data");
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [slug]);

  const content = qrData?.content || {};
  const links = content?.links || [];
  const bgColor = qrData?.design?.bg_color || "#c4a8e8";

const getFaviconUrl = (rawUrl) => {
  const fallback = "/img/google.png";
  if (!rawUrl || typeof rawUrl !== "string") return fallback;

  try {
    const cleaned = rawUrl.trim();
    const hasProtocol = /^https?:\/\//i.test(cleaned);
    const parsed = new URL(hasProtocol ? cleaned : `https://${cleaned}`);

    return `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
      parsed.origin
    )}`;
  } catch {
    return fallback;
  }
};


  return (
    <>
      <div className="page">

        {/* Header */}
        <div className="header" style={{ background: "#1b0c40" }}>
          <h1 style={{ color: "#fff" }}>{content.title || "QR Generator"}</h1>
          <p style={{ color: "#fff" }}>{content.description || ""}</p>
        </div>

        {/* Links Card */}
        <div className="content">
          <div className="card">

            {loading && (
              <p style={{ textAlign: "center", padding: 20 }}>
                Loading...
              </p>
            )}

            {!loading && error && (
              <p style={{ textAlign: "center", color: "red", padding: 20 }}>
                {error}
              </p>
            )}

            {!loading && !error && links.length === 0 && (
              <p style={{ textAlign: "center", padding: 20 }}>
                No links available
              </p>
            )}

            {!loading &&
              !error &&
              links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="link-left">
                    <img
                      src={getFaviconUrl(link.url)}
                      alt={`${link.label || "link"} favicon`}
                      className="icon"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/img/google.png";
                      }}
                    />
                    <span>{link.label}</span>
                  </div>
                  <Arrow />
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* PAGE CSS */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .header {
          text-align: center;
          padding: 40px 20px 60px;
        }

        .header h1 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .header p {
          font-size: 14px;
          opacity: 0.75;
          margin-top: 6px;
        }

        .content {
          padding: 0 16px;
          margin-top: -40px;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          padding: 14px;
        }

        .link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-radius: 14px;
          background: #fafafa;
          color: #111;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 10px;
          transition: all 0.2s ease;
        }

        .link:last-child {
          margin-bottom: 0;
        }

        .link:hover {
          background: #efe6ff;
        }

        .link-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon {
          width: 22px;
          height: 22px;
        }

        svg {
          color: #555;
        }

        @media (min-width: 768px) {

  .content {
    max-width: 900px;
    margin: -60px auto 60px;
    padding: 0;
  }

  .header {
    padding: 80px 20px 100px;
  }

  .header h1 {
    font-size: 32px;
  }

  .header p {
    font-size: 16px;
  }

  .card {
    padding: 24px;
  }

  .link {
    font-size: 16px;
  }

}
      `}</style>
    </>
  );
}

/* Arrow Icon */
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
