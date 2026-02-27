//scr/app/scan/business-card/[slug]/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import Powredbybrand from "@/components/powredbybrand";
export default function Page() {
  const { slug } = useParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) return;

    api.get(`qr-data/front/${slug}`, {
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res?.data?.status_code === 1) {
          setQrData(res.data.data);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: 40 }}>Loading…</p>;
  }

  const content = qrData?.content || {};
  const socialLinks = Array.isArray(content?.social_links)
    ? content.social_links.filter((item) => item?.url)
    : [];
  const mapUrl = content?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.address)}`
    : "";

  /* COMPONENTS */
  const Contact = ({ icon, label, value }) => (
    <div className="list-item" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
      <div className="icon-left bg-white">
        {icon}
      </div>
      <div className="list-text">
        <label>{label}</label>
        <p>{value}</p>
      </div>
    </div>
  );

  /* SVG ICONS */
const ClockIcon = () => (
  <i className="bi bi-clock-fill  fs-5"></i>
);

const LocationIcon = () => (
  <i className="bi bi-geo-alt-fill  fs-5"></i>
);

const ArrowIcon = () => (
  <i className="bi bi-arrow-right-circle-fill  fs-5"></i>
);

const GridIcon = () => (
  <i className="bi bi-grid-fill  fs-5"></i>
);

const UserIcon = () => (
  <i className="bi bi-person-fill  fs-5"></i>
);

const GlobeIcon = () => (
  <i className="bi bi-globe2  fs-5"></i>
);

const PhoneIcon = () => (
  <i className="bi bi-telephone-fill  fs-5"></i>
);

 const LandlineIcon = () => (<img src="/images/land-line.svg" width="20" height="20" />);

const MailIcon = () => (
  <i className="bi bi-envelope-fill fs-5"></i>
);
  const DefaultSocialIcon = () => <GlobeIcon />;

  const getFaviconUrl = (rawUrl) => {
    try {
      const parsed = new URL(rawUrl);
      return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(
        parsed.origin
      )}`;
    } catch {
      return "";
    }
  };

  const getSocialMeta = (type) => {
    const normalized = (type || "").toLowerCase().trim();
    if (normalized === "google") return { label: "Google Review" };
    if (normalized === "facebook") return { label: "Facebook" };
    if (normalized === "instagram") return { label: "Instagram" };
    if (normalized === "x" || normalized === "twitter") return { label: "X" };
    if (normalized === "linkedin") return { label: "LinkedIn" };
    if (normalized === "twitch") return { label: "Twitch" };
    return {
      label: normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : "Social",
    };
  };

  const WebsiteIcon = ({ url }) => {
    const [iconFailed, setIconFailed] = useState(false);
    const faviconUrl = getFaviconUrl(url);

    if (!faviconUrl || iconFailed) {
      return <DefaultSocialIcon />;
    }

    return (
      <img
        src={faviconUrl}
        alt="website icon"
        width="22"
        height="22"
        style={{ display: "block", borderRadius: 4 }}
        onError={() => setIconFailed(true)}
      />
    );
  };

  return (
    <>
      <div className="page" >
        {/* HEADER */}
        <div className="header">
          <h1>Digital Business Card Data</h1>
        </div>
        {/* MAIN CARD */}
        <div className="main-card">
          <h2>{content?.name || "Unnamed"}</h2>
          <p>{content?.title || ""}</p>
          {/* <button>View</button> */}
        </div>
        <div className="content-wrapper">
          {/* OPEN HOURS */}
          {content?.open_hours && <div className="card">
            {content?.open_hours && (
              <div className="list-item" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
                <div className="icon-left">
                  <ClockIcon />
                </div>
                <div className="list-text">
                  <span><b>Open hours - </b><b className="closed">Closed</b></span></div>
              </div>)}
            {/* OPEN HOURS LIST */}
            {content?.open_hours && content.open_hours.map((day, index) => (
              <div className="row" key={index}>
                <span>{day.day}</span>
                <span>{day.opening_time} - {day.closing_time}</span>
              </div>
            ))}
          </div>}

          {/* ADDRESS */}
          {content?.address && (
            <div className="card mx-2">
              <div className="list-item" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
                <div className="icon-left">
                  <LocationIcon />
                </div>
                <div className="list-text">
                  <span><b>Address</b></span>
                </div>
              </div>
              <p className="text mb-0" style={{ marginTop: 10 }}>{content.address}</p>
              <a
                className="link mb-2"
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Show on Map
              </a>
            </div>)}
          {/* CONTACT */}
          <div className="card mx-2">
            <div className="list-item mb-3" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <GridIcon />
              </div>
              <div className="list-text">
                <span>Contact</span></div>
            </div>

            <Contact icon={<UserIcon />} label="Name" value={content?.name || ""} />
            <Contact icon={<GlobeIcon />} label="Website" value={content?.website || ""} />
            <Contact icon={<PhoneIcon />} label="Phone" value={content?.phone || ""} />
            <Contact icon={<LandlineIcon />} label="Landline" value={content?.landline || ""} />
            <Contact icon={<MailIcon />} label="Email" value={content?.email || ""} />
          </div>
          <div className="social-heading mx-2" >
            <h3>Our Social Networks</h3>
          </div>
          {/* SOCIAL LINKS *
          API DATA
          "content": {
            "name": "Harish",
            "title": "Admin",
            "phone": "+919953300349",
            "email": "allabtweb@gmail.com",
            "address": null,
            "website": null,
            "social_links": [
                {
                    "type": "instagram",
                    "url": "https://ads.google.com/"
                },
                {
                    "type": "facebook",
                    "url": "https://ads.google.com/"
                }
            ]
        },/ SOCIAL LINKS */}
          <div className="mx-2">
            {socialLinks.map((item, index) => {
              const meta = getSocialMeta(item.type);
              return (
                <div className="card social-card" key={`${item.type || "social"}-${index}`}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="list-item social-link"
                  >
                    <div className="icon-left">
                      <WebsiteIcon url={item.url} />
                    </div>
                    <div className="list-text">
                      <strong>{meta.label}</strong>
                      <p>Follow & connect on {meta.label}</p>
                    </div>
                    <span className="arrow"><ArrowIcon /></span>
                  </a>
                </div>
              );
            })}

            <br />
            <hr />
            <br />
            {/* LINKS SECTION */}
            {/* powred by QRDM */}
            {/* <Powredbybrand /> */}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx global>{`
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
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }

        .main-card h2 {
          margin: 0;
          font-size: 22px;
        }

        .main-card p {
          color: #777;
          margin: 6px 0 14px;
        }

        .main-card button {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: none;
          background: #7fbf9f;
          font-size: 16px;
        }

        .card {
          background: #fff;
          margin: 10px 0px;
          padding: 5px 15px;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .row-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-top: 1px solid #eee;
        }

        .row:first-of-type {
          border-top: none;
        }

        .closed {
          color: #e53935;
        }

        .text {
          color: #555;
          margin-bottom: 6px;
        }

        .link {
          color: #4a6cff;
          font-size: 14px;
        }

        h3 {
          margin-bottom: 10px;
        }

        .social {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .social p {
          font-size: 13px;
          color: #777;
          margin: 0;
        }

        .social svg:last-child {
          margin-left: auto;
        }
        .icon-left {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f1f3f6;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    inset 0 1px 2px rgba(255,255,255,0.7),
    0 6px 14px rgba(0,0,0,0.12);
  flex-shrink: 0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
}

.list-text p {
  margin: 0;
  font-size: 13px;
  color: #777;
}

.list-text strong {
  font-size: 15px;
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





.social-card {
  background: linear-gradient(145deg, #ffffff, #f9faff);
  border-radius: 18px;
  padding: 6px 18px;
  transition: all 0.3s ease;
  border: 1px solid #eef1f6;
}

.social-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(90,125,201,0.15);
  background: linear-gradient(145deg, #f7f9ff, #ffffff);
}

.social-link {
  text-decoration: none;
  color: inherit;
}

.icon-left {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #eef3ff, #f7f9ff);
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.8),
    0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.social-card:hover .icon-left {
  transform: scale(1.08) rotate(-4deg);
}

.list-text strong {
  font-size: 16px;
}

.list-text p {
  font-size: 13px;
  color: #8b8fa3;
}

.arrow {
  margin-left: auto;
  transition: transform 0.3s ease;
  color: #7b8cff;
}

.social-card:hover .arrow {
  transform: translateX(6px);
}

.social-heading {
  text-align: center;   /* Mobile default */
  margin: 20px 0 10px;
}

@media (min-width: 992px) {
  .social-heading {
    text-align: left;   /* Desktop */
  }
}
      `}</style>
    </>
  );
}
