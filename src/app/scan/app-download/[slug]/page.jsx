"use client";

export default function AppDownloadQRPage() {
  return (
    <>
      <div className="page">

        {/* Header */}
        <div className="header">
          <h1>App Download </h1>
          <p>My App Name </p>
        </div>

        {/* Links Card */}
        <div className="content">
          <div className="card">

               <a href="https://apple.com" className="link">
               <div className="link-left">
                 <img src="/img/ios.png" alt="icon" className="icon" />
                  <span>App Store Link (IOS)</span>
                 </div>
                <Arrow />
              </a>

          
             <a href="https://play.google.com" className="link">
             <div className="link-left">
               <img src="/img/play.png" alt="icon" className="icon" />
              <span>Google Play Link (Android)</span>
             </div>
            <Arrow />
           </a>

          
              <a href="https://apk.com" className="link">
              <div className="link-left">
                <img src="/img/apk.png" alt="icon" className="icon" />
               <span>Alternative APK Link (Optional)</span>
              </div>
              <Arrow />
               </a>

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
          background: #c4a8e8;
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
  justify-content: space-between; /* arrow goes right */
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

.link-left {
  display: flex;
  align-items: center;
  gap: 12px; /* space between icon and text */
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

svg {
  color: #555;
}


        .link:hover {
          background: #efe6ff;
        }

        svg {
          color: #555;
        }
      `}</style>
    </>
  );
}

/* Arrow Icon */
function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
