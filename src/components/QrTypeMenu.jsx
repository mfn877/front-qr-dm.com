"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";
import QRShimmerList from "./shimmer/qrsTypeList";
import { useQrTypesQuery } from "@/services/qrtypes";

/* helper: slug from icon */
const getSLUG = (icon) => icon.split(".")[0].toLowerCase();

/* helper: icon */
const getIcon = (icon) => (
  <Image
    src={`/images/qrtypes/${icon}`}
    alt=""
    width={20}
    height={20}
  />
);

export default function QrTypeMenu({ activeType, onSelect,setSelectedSlug }) {
  // const [qrTypes, setQrTypes] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadQrTypes = async () => {
  //     try {
  //       const res = await api.get("/qr-types");
  //       const data = res.data;


  //       if (data?.status_code === 1) {
  //         setQrTypes(data.data.filter((q) => q.status === 1));
  //       }
  //     } catch (err) {
  //       console.error("Failed to load QR types menu");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadQrTypes();
  // }, []);
  const {
    data: qrTypes = [],
    isLoading: qrTypesLoading,
    error: qrTypesError,
  } = useQrTypesQuery({
    staleTime: 10 * 60 * 1000,
  });
  if (qrTypesLoading) return <QRShimmerList />;

  return (
    <div className="qr-type-wrapper">

      {/* ALL BUTTON */}
      <button
        type="button"
        className={`qr-type-btn ${activeType === "all" ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect("");
        }}
      >
        <span className="qr-type-label">
          All
        </span>
      </button>

      {/* DYNAMIC QR TYPES */}
      {qrTypes.map((type) => {
        const slug = getSLUG(type.icon);

        return (
          <button
            key={type.id ?? "all"}
            type="button"
            className={`qr-type-btn ${activeType === type.id ? "active" : ""
              }`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(type.id)
              // console.log("CLICKED:", slug);
              setSelectedSlug(slug);
            }}

          >
            <span className="qr-type-icon">
              {getIcon(type.icon)}
            </span>
            <span className="qr-type-label">
              {type.name}
            </span>
          </button>

        );
      })}

    </div>

  );
}
