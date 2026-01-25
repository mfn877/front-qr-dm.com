"use client";
import { sanitizeSvg } from "@/utils/sanitizeSvg";
import { truncate } from "@/utils/text";
import React from "react";

export default function QrCodeCard({
  title,
  type,
  scans = 0,
  image,
  onDownload,
  onEdit,
  onDelete,
  svg,
  track = 0,
}) {
  return (
    <div className="card qr-code-card">
      {/* Thumbnail */}
      <div className="qr-thumbnail">
        {svg ? (
          <div
            className="qr-svg"
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(svg) }}
          />
        ) : (
          <img
            className="w-100"
            src="/img/qr-code.svg"
            alt="QR code"
          />
        )}
      </div>

      {/* Title */}
      <h3 style={{ marginBottom: "0.25rem" }}> {truncate(title, 25)}</h3>

      {/* Info */}
      <div className="qr-info">
        <span>{type}</span>
        {track > 0 && <span>{scans.toLocaleString()} scans</span>}
      </div>

      {/* Actions */}
      <div className="qr-actions">
        <button className="action-btn" onClick={onDownload}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </button>

        <button className="action-btn" onClick={onEdit}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>

        <button className="action-btn delete" onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
