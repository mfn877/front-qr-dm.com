"use client";

export default function Page() {
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
  const ClockIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="8" /><path d="M10 5v5l3 2" /></svg>);
  const LocationIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6z" /><circle cx="10" cy="8" r="2" /></svg>);
  const GoogleIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.18 3.6l6.85-6.85C35.9 2.38 30.4 0 24 0 14.6 0 6.48 5.38 2.56 13.22l7.98 6.19C12.48 13.02 17.78 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.63-.15-3.2-.42-4.72H24v9.04h12.42c-.54 2.9-2.18 5.36-4.66 7.02l7.22 5.61C43.94 37.36 46.1 31.4 46.1 24.5z" />
      <path fill="#FBBC05" d="M10.54 28.41c-.5-1.48-.78-3.06-.78-4.66s.28-3.18.78-4.66l-7.98-6.19C.92 16.48 0 20.12 0 24s.92 7.52 2.56 11.09l7.98-6.68z" />
      <path fill="#34A853" d="M24 48c6.4 0 11.78-2.12 15.7-5.76l-7.22-5.61c-2 1.34-4.56 2.14-8.48 2.14-6.22 0-11.52-3.52-13.46-8.36l-7.98 6.68C6.48 42.62 14.6 48 24 48z" />
    </svg>
  );

  const ArrowIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 10h10" /><path d="M11 6l4 4-4 4" /></svg>);
  const GridIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="6" height="6" /><rect x="11" y="3" width="6" height="6" /><rect x="3" y="11" width="6" height="6" /><rect x="11" y="11" width="6" height="6" /></svg>);
  const UserIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="6" r="3" /><path d="M4 18c0-3 12-3 12 0" /></svg>);
  const GlobeIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="8" /><path d="M2 10h16" /><path d="M10 2a12 12 0 0 1 0 16" /></svg>);
  const PhoneIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 2l4 2-2 4c2 4 4 6 8 8l4-2 2 4c-8 4-16-4-16-12z" /></svg>);
  const MailIcon = () => (<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="16" height="12" /><path d="M2 4l8 6 8-6" /></svg>);
const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 9h3V6h-3c-2.76 0-5 2.24-5 5v2H7v3h2v6h3v-6h3l1-3h-4v-2c0-.55.45-1 1-1z"
      fill="#1877F2"
    />
  </svg>
);
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#E1306C" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2"/>
    <circle cx="17" cy="7" r="1.2" fill="#E1306C"/>
  </svg>
);
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 4l7.5 9.5L4 20h3.5l5.5-5.8L17.5 20H21l-8-10 7-6h-3.5L12.5 8.7 7.5 4H4z"
      fill="#000000"
    />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="#0A66C2"/>
    <path d="M7 10v7" stroke="#fff" strokeWidth="2"/>
    <circle cx="7" cy="7" r="1" fill="#fff"/>
    <path d="M11 10v7" stroke="#fff" strokeWidth="2"/>
    <path d="M11 13c0-2 3-2 3 0v4" stroke="#fff" strokeWidth="2"/>
  </svg>
);

  return (
    <>
      <div className="page">
        {/* HEADER */}
        <div className="header">
          <h1>ABC Company</h1>
        </div>
        {/* MAIN CARD */}
        <div className="main-card">
          <h2>Clothing</h2>
          <p>Selling</p>
          <button>View</button>
        </div>
        <div className="container-fluid">
          {/* OPEN HOURS */}
          <div className="card">
            <div className="list-item" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <ClockIcon />
              </div>
              <div className="list-text">
                <span><b>Open hours - </b><b className="closed">Closed</b></span></div>
            </div>
            <div className="row">
              <span>Monday</span>
              <span>04:34 pm - 08:34 pm</span>
            </div>
            <div className="row">
              <span>Tuesday</span>
              <span>05:34 pm - 08:34 pm</span>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="card">
            <div className="list-item" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <LocationIcon />
              </div>
              <div className="list-text">
                <span><b>Address</b></span>
              </div>
            </div>
            <p className="text mb-0" style={{ marginTop: 10 }}>Patna, BR, India</p>
            <a className="link mb-2">Show on Map</a>
          </div>
          {/* CONTACT */}
          <div className="card">
            <div className="list-item mb-3" style={{ paddingTop: 5, borderBottom: "1px solid #eee" }}>
              <div className="icon-left">
                <GridIcon />
              </div>
              <div className="list-text">
                <span>Contact</span></div>
            </div>

            <Contact icon={<UserIcon />} label="Name" value="7688449856" />
            <Contact icon={<GlobeIcon />} label="google" value="www.google.com" />
            <Contact icon={<PhoneIcon />} label="Phone" value="+91 6536374679" />
            <Contact icon={<MailIcon />} label="Email" value="manya@kumari.com" />
          </div>
          <h3>Our Social Networks</h3>
          <div className="card">
            <div className="list-item">
              <div className="icon-left">
                <GoogleIcon />
              </div>
              <div className="list-text">
                <strong>Google Review</strong>
                <p>follow and comment</p>
              </div>
              <span style={{ marginLeft: "auto" }}><ArrowIcon /></span>
            </div>

          </div>
          <div className="card">
            <div className="list-item">
              <div className="icon-left">
                <FacebookIcon />
              </div>
              <div className="list-text">
                <strong>Facebook</strong>
                <p>follow and comment</p>
              </div>
              <span style={{ marginLeft: "auto" }}><ArrowIcon /></span>
            </div>
          </div>
          <div className="card">
            <div className="list-item">
              <div className="icon-left">
                <InstagramIcon />
              </div>
              <div className="list-text">
                <strong>Instagram</strong>
                <p>follow and comment</p>
              </div>
              <span style={{ marginLeft: "auto" }}><ArrowIcon /></span>
            </div>
          </div>
          <div className="card">
            <div className="list-item">
              <div className="icon-left">
                <XIcon />
              </div>
              <div className="list-text">
                <strong>X</strong>
                <p>follow and comment</p>
              </div>
              <span style={{ marginLeft: "auto" }}><ArrowIcon /></span>
            </div>
          </div>
          <div className="card">
            <div className="list-item">
              <div className="icon-left">
                <LinkedinIcon />
              </div>
              <div className="list-text">
                <strong>Linkedin</strong>
                <p>follow and comment</p>
              </div>
              <span style={{ marginLeft: "auto" }}><ArrowIcon /></span>
            </div>
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
          background: #5a7dc9;
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
      `}</style>
    </>
  );
}