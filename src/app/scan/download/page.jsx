"use client";
import { Suspense } from "react";
import DownloadContent from "./DownloadContent";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import { getToken } from "@/utils/storage";
import QRPreview3 from "@/components/QRPreview3";


/* --------------------------
   Component that uses searchParams
--------------------------- */
function DownloadInner() {
  const searchParams = useSearchParams();
  const value = searchParams.get("file");


}

export default function Page() {
  //     const searchParams = useSearchParams();
  //  // 👇 THIS is the key line
  // const value = searchParams.get("file");
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {getToken() ? <Header2 /> : <Header />}

      {/* PAGE CONTENT */}
      <div style={{ flex: 1 }}>
        <div id="home-page" className="page active">
          <section
            // className="hero banner_top"
            // style={{
            //   background:
            //     "linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)",
            //   paddingTop: 20,
            //   paddingBottom: 20,
            // }}
          >
            {/* <div className="container">
              <div className="row">
                <div className="col-md-7 align-self-center">
                  <h1 className="mb-0">Preview QR</h1>
                </div>
              </div>
            </div> */}
          </section>

          <section className="features-section ">
            <div className="container">
              <Suspense fallback={<div>Loading QR...</div>}>
              <DownloadContent />
                <DownloadInner />
              </Suspense>
              
      
               {/* <QRPreview3 value={value}/> */}
            </div>
          </section>
        </div>
      </div>
         <Footer />
  
    </div>
  );
}
