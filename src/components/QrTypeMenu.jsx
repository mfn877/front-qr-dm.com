"use client";
import { QR_TYPES } from "@/constants/qrTypes";

export default function QrTypeMenu({ activeType, onSelect }) {
  return (
    <div>
      {QR_TYPES.map((type) => (
        <button
          key={type.id ?? "all"}
          className={`qr-type-btn ${
            activeType === type.id ? "active" : ""
          }`}
          onClick={() => onSelect(type.id)}
        >
          <i className={`fa fa-${type.icon}`} />
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
}
