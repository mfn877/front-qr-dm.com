"use client";
import { useRef } from "react";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";

export default function QRPreview3({
  value,
  size = 240,
}) {
  const hasValue = value && value.trim().length > 0;
  const imgRef = useRef(null);

  const downloadBlob = (blob, fileName) => {
     const blobUrl = URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = blobUrl;
     link.download = fileName;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     URL.revokeObjectURL(blobUrl);
   };
 
   const drawToPngBlob = (imageUrl) =>
     new Promise((resolve, reject) => {
       const img = new Image();
       img.onload = () => {
         const width = img.naturalWidth || img.width || 1024;
         const height = img.naturalHeight || img.height || 1024;
         const canvas = document.createElement("canvas");
         canvas.width = width;
         canvas.height = height;
 
         const ctx = canvas.getContext("2d");
         if (!ctx) {
           reject(new Error("Canvas context unavailable"));
           return;
         }
 
         ctx.drawImage(img, 0, 0, width, height);
         canvas.toBlob((blob) => {
           if (!blob) {
             reject(new Error("Failed to create PNG blob"));
             return;
           }
           resolve(blob);
         }, "image/png");
       };
       img.onerror = () => reject(new Error("Failed to load QR image"));
       img.src = imageUrl;
     });
 
   const getCandidateUrls = () => {
     const raw = (value || "").trim();
     if (!raw) return [];
 
     if (
       raw.startsWith("data:") ||
       raw.startsWith("blob:") ||
       raw.startsWith("http://") ||
       raw.startsWith("https://")
     ) {
       return [raw];
     }
 
     const urls = [];
     if (raw.startsWith("/")) {
       if (typeof window !== "undefined") {
         urls.push(`${window.location.origin}${raw}`);
       }
       if (apiBase) {
         try {
           const apiOrigin = new URL(apiBase).origin;
           urls.push(`${apiOrigin}${raw}`);
         } catch {
           // noop
         }
       }
     } else {
       if (typeof window !== "undefined") {
         urls.push(`${window.location.origin}/${raw}`);
       }
       if (apiBase) {
         try {
           const apiOrigin = new URL(apiBase).origin;
           urls.push(`${apiOrigin}/${raw}`);
         } catch {
           // noop
         }
       }
     }
 
     return urls;
   };
 
   const fetchAsBlob = async (url) => {
     const res = await fetch(url, { cache: "no-store" });
     if (!res.ok) {
       throw new Error(`Fetch failed: ${res.status}`);
     }
     return res.blob();
   };
 
   const downloadAsPNG = async () => {
     if (!value) {
       Swal.fire("Error", "No QR image available to download.", "error");
       return;
     }
 
     const fileName = `${"qr-dm-code"}.png`;
 
     try {
       let sourceBlob = null;
       const candidates = getCandidateUrls();
 
       for (const candidate of candidates) {
         try {
           sourceBlob = await fetchAsBlob(candidate);
           if (sourceBlob) break;
         } catch {
           // try next candidate
         }
       }
 
       if (!sourceBlob && candidates[0]) {
         // Fallback through same-origin API proxy to avoid CORS failures.
         const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(candidates[0])}`;
         sourceBlob = await fetchAsBlob(proxyUrl);
       }
 
       if (!sourceBlob) {
         throw new Error("Unable to fetch QR image from all sources");
       }
 
       const objectUrl = URL.createObjectURL(sourceBlob);
       try {
         const pngBlob = await drawToPngBlob(objectUrl);
         downloadBlob(pngBlob, fileName);
       } finally {
         URL.revokeObjectURL(objectUrl);
       }
     } catch (error) {
       console.error("PNG download failed:", error);
       Swal.fire("Error", "PNG download failed. Please try again.", "error");
     }
   };
  return (
    <div
      className="image-preview"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <div
        className="card p-4"
        style={{
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22%",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Image Preview
        </h3>

        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed #ccc",
            borderRadius: 8,
            margin: "0 auto",
            overflow: "hidden",
            background: "#fafafa",
          }}
        >
          {!hasValue ? (
            <span style={{ opacity: 0.5, fontSize: 14 }}>
              image preview
            </span>
          ) : (
            <img
              ref={imgRef}
              src={value}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        <div style={{ marginTop: "1rem", width: "100%" }}>
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={downloadAsPNG}
            disabled={!hasValue}
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}
