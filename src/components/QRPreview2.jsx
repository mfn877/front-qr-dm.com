//src\components\QRPreview2.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

export default function QRPreview({
  value,
  size,
  bgColor,
  qrColor,
  pattern,
  eyeStyle,
  logo,
  onSave,
  onSvgReady,
  updateQRID,
  qrtypeID,
  newData
}) {
  // console.log("QRPreview props:", { value, size, bgColor, qrColor, pattern, eyeStyle, logo,updateQRID });
  const [svgReady, setSvgReady] = useState(false);
  const ref = useRef(null);
  const qr = useRef(null);

  const hasValue = value && value.trim().length > 0;

  const generateSVG = async () => {
    if (!qr.current) return;

    const blob = await qr.current.getRawData("svg");
    const text = await blob.text();
    onSvgReady?.(text);
    setSvgReady(true);
  };
  const [btnText, setBtnText] = useState("Save to Dashboard");

  useEffect(() => {
    if (qrtypeID === 17 || qrtypeID === 16) {
      setBtnText("Click to Update QR");
    }
  }, [qrtypeID, updateQRID]);

  useEffect(() => {
    if (newData === 1 && updateQRID > 1 && svgReady) {
      onSave?.();
    }
  }, [newData, updateQRID, svgReady]);


  const getEyeOptions = () => {
    if (eyeStyle === "rounded") {
      return {
        cornersSquareOptions: { type: "extra-rounded", color: qrColor },
        cornersDotOptions: { type: "dot", color: qrColor },
      };
    }

    if (eyeStyle === "soft") {
      return {
        cornersSquareOptions: { type: "dot", color: qrColor },
        cornersDotOptions: { type: "dot", color: qrColor },
      };
    }

    return {
      cornersSquareOptions: { type: "square", color: qrColor },
      cornersDotOptions: { type: "square", color: qrColor },
    };
  };

  useEffect(() => {
    if (!hasValue) {
      if (ref.current) ref.current.innerHTML = "";
      return;
    }

    const options = {
      width: size,
      height: size,
      data: value,
      // ✅ LOGO SUPPORT (ADDED)
      image: logo || undefined,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 6,
        imageSize: 0.3, // center logo size (30%)
      },

      dotsOptions: {
        color: qrColor,
        type: pattern,
      },
      backgroundOptions: {
        color: bgColor,
      },


      qrOptions: {
        errorCorrectionLevel: "H",
      },
      ...getEyeOptions(),
    };

    if (!qr.current) {
      qr.current = new QRCodeStyling(options);
      ref.current.innerHTML = "";
      qr.current.append(ref.current);
    } else {
      qr.current.update(options);
    }
    if (onSvgReady) {
      generateSVG();
    }
  }, [value, size, qrColor, bgColor, pattern, eyeStyle, logo]);

  // ✅ DOWNLOAD FUNCTIONS
  const downloadPNG = () => {
    if (qr.current) {
      qr.current.download({ extension: "png" });
    }
  };

  const downloadSVG = () => {
    if (qr.current) {
      qr.current.download({ extension: "svg" });
    }
  };

  return (
    <div className="qr-preview mt-lg-0 mt-4">
      <div className="card">
        <h3 style={{ marginBottom: "1rem" }}>Preview</h3>

        <div className="preview-qr"
          style={{
            minHeight: 240,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>

          {!hasValue && updateQRID < 2 ? (
            <div style={{ opacity: 0.5, fontSize: 14 }}>
              Enter Details to generate QR
            </div>
          ) : (
            <div ref={ref} />
          )}
        </div>
        {/* DOWNLOAD BUTTONS */}
        <div className="download-buttons">
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={downloadPNG}
            disabled={!hasValue && updateQRID < 2}
          >
            Download PNG
          </button>

          <div className="download-grid">
            <button
              className="btn btn-secondary"
              onClick={downloadSVG}
              disabled={!hasValue && updateQRID < 2}
            >
              SVG
            </button>

            <button
              className="btn btn-secondary"
              onClick={downloadPNG}
              disabled={!hasValue && updateQRID < 2}
            >
              Transparent
            </button>
          </div>
        </div>
      </div>

      <button
        className="btn btn-secondary"
        style={{ width: "100%", marginTop: "1rem" }}
        disabled={!hasValue && !updateQRID}
        onClick={onSave}
      >
        {updateQRID === 1 ? "Click to Generate/Save QR" : btnText}
      </button>
    </div>
  );
}