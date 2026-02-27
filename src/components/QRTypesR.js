"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import QRShimmerPage from "./shimmer/qrsType";

const getIcon = (icon) => {
  return "/images/qrtypes/" + icon;
};
const getSLUG = (icon) => {
  //need to return only file name , without extension in lower case
  return icon.split('.')[0].toLowerCase();
}

export default function QRTypes({ qrData = [], loading = false, error = null }) {
  // if (loading) return <p className="text-center py-10">Loading QR Types...</p>;
  // if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  const showShimmer = loading || error || qrData.length === 0;

  return (
    <section className="qr-types-section" id="nav-generator">
      <div className="container">
        <div className="section-header">
          <h2>All QR Types We Support</h2>
          <p>
            Our <b>QR code generator</b> supports powerful QR code types designed
            for every use case.
          </p>
        </div>

        <div className="qr-grid">
          {showShimmer &&
            <QRShimmerPage />
          }
          {!loading && !error && qrData.map((qr, index) => (
            <Link
              key={qr.id}
              href={`/qr-generator/${getSLUG(qr.icon)}`}
              className={`qr-card color-${index + 1}`}
            >
              <div className="qr-card-icon">
                <Image
                  src={getIcon(qr.icon)}
                  alt={qr.name}
                  width={40}
                  height={40}
                />
              </div>

              <h3>{qr.name}</h3>
              <p>{qr.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
