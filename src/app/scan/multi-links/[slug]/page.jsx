"use client";

export default function MultiLinkQRPage() {
  return (
    <>
      <div className="page">

        {/* Header */}
        <div className="header">
          <h1>QR Generator</h1>
          <p>New Content Everyday</p>
        </div>

        {/* Links Card */}
        <div className="content">
          <div className="card">
             
            <a href="https://google.com" className="link">
              <div className="link-left">
               <img src="/img/google.png" alt="icon" className="icon" />
               <span> Google </span>
               </div>
                <Arrow />
                </a>


              <a href="https://google.com" className="link">
               <div className="link-left">
               <img src="/img/google.png" alt="icon" className="icon" />
               <span>  Google  </span>
                 </div>
                  <Arrow />
                   </a>


                   <a href="https://google.com" className="link">
                  <div className="link-left">
                 <img src="/img/google.png" alt="icon" className="icon" />
                 <span>  Google  </span>
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
