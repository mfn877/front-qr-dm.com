"use client";

import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import QRTypesSidebar from "@/components/QRTypesSidebar";
import QRContent from "@/components/QRContent";
import { useState, useEffect, use } from "react";
import { getToken } from "@/utils/storage";

export default function QRGeneratorPage({ params }) {
  // ✅ unwrap async params correctly
  const { type = "url" } = use(params);

  // ✅ keep state in sync with URL
  const [qrType, setQrType] = useState(type);

  useEffect(() => {
    setQrType(type);
  }, [type]);

  const handleTypeChange = (nextType) => {
    if (!nextType || nextType === qrType) return;
    setQrType(nextType);
    window.history.pushState({}, "", `/qr-generator/${nextType}`);
  };

  useEffect(() => {
    const onPopState = () => {
      const parts = window.location.pathname.split("/");
      const last = parts[parts.length - 1];
      if (last) setQrType(last);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrColor, setQrColor] = useState("#000000");
  const [size, setSize] = useState(512);

  return (
    <>
    {getToken() ? <Header2 /> : <Header />}

      <div id="generator-page" className="page generator-page">
        <div className="container">
          <div className="generator-header">
            <h2>QR Code Generator</h2>
            <p>Select a QR type and customize your code</p>
          </div>

          <div className="generator-layout">
            {/* LEFT */}
            <QRTypesSidebar activeType={qrType} onTypeChange={handleTypeChange} />

            {/* CENTER */}
            <QRContent
              type={qrType}
              bgColor={bgColor}
              setBgColor={setBgColor}
              qrColor={qrColor}
              setQrColor={setQrColor}
              size={size}
              setSize={setSize}
            />

            {/* RIGHT */}
            {/* Preview block unchanged */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
