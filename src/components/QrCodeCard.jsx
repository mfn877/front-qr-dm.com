"use client";
import { useUpdateQr } from "@/services/qrtypes";
import React from "react";
import Swal from "sweetalert2";

export default function QrCodeCard({
  title,
  type,
  id,
  scans = 0,
  image,
  onDelete,
  label,
  svg,
  track = 0,
  isMobile
}) {
  const [isRenameModalOpen, setIsRenameModalOpen] = React.useState(false);
  const qrImageSrc =
    typeof svg === "string" && svg.trim() ? svg : "/img/qr-code.svg";
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  // upadte query
  const { mutate: updateQr, isLoading } = useUpdateQr();
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
    const raw = (qrImageSrc || "").trim();
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
    if (!qrImageSrc) {
      Swal.fire("Error", "No QR image available to download.", "error");
      return;
    }

    const fileName = "qr-dm.png";

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
  const downloadAsSVG = (svgString) => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-dm.svg";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="card qr-code-card">
      {/* Thumbnail */}
      <div className="qr-thumbnail">
        <img className="w-100" src={qrImageSrc} alt="QR code" />
      </div>

      {/* Title */}
      <h3
        className="d-flex align-items-center"
        style={{ marginBottom: "0.25rem" }}
      >
        <span
          title={label}
          style={{
            display: "inline-block",
            maxWidth: "calc(100% - 28px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setIsRenameModalOpen(true)}
        >
          <i className="cursor-pointer bi bi-pencil-square ms-2 text-muted"></i>
        </span>
      </h3>

      {/* Info */}
      {/* <div className="qr-info">
        <span>{type}</span>
        {track > 0 && <span>{scans.toLocaleString()} scans</span>}
      </div> */}

      {/* Actions */}
      <div className="row g-2">

        {/* PNG */}
        <div className="col-6 col-md-6">
          <button className="action-btn w-100" onClick={downloadAsPNG}>
            <i className=" d-none d-md-inline bi bi-download me-2"></i> PNG </button>
        </div>

        {/* SVG */}
        <div className="col-6 col-md-6">
          <button className="action-btn w-100" onClick={() => downloadAsSVG(qrImageSrc)}>
            <i className="d-none d-md-inline bi bi-download me-2"></i> SVG </button>
        </div>

        {/* DELETE */}
        <div className="col-12 ">
          <button className="action-btn delete w-100" onClick={onDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="me-md-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="d-none d-md-inline">Delete</span>
          </button>
        </div>

      </div>
      {isRenameModalOpen && Swal.fire({
        title: "Rename QR Code",
        input: "text",
        inputValue: label,
        showCancelButton: true,
        confirmButtonText: "Save",
        showLoaderOnConfirm: true,
        preConfirm: (value) => {
          if (!value.trim()) {
            Swal.showValidationMessage("Please enter a label.");
            return false;
          }
          return value.trim();
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        setIsRenameModalOpen(false);
        if (result.isConfirmed) {
          const newLabel = result.value?.trim();
          if (!newLabel) return;
          updateQr({
            id,
            payload: { label: newLabel },
          });
        }
      })}

    </div>
  );
}
