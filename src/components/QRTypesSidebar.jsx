"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import QRShimmerList from "./shimmer/qrsTypeList";
import { useQrTypesQuery } from "@/services/qrtypes";

/* 🔹 helper: get slug from icon */
const getSLUG = (icon) => icon.split(".")[0].toLowerCase();

/* 🔹 helper: render svg icon from file */
const getIcon = (icon) => {
    return (
        <Image
            src={`/images/qrtypes/${icon}`}
            alt=""
            width={22}
            height={22}
            style={{ display: "block" }}
        />
    );
};
export default function QRTypesSidebar({ activeType, onTypeChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: qrTypes = [],
        isLoading: qrTypesLoading,
        error: qrTypesError,
    } = useQrTypesQuery({
        staleTime: 10 * 60 * 1000,
    });

    // if (loading) return <p style={{ padding: 10 }}>Loading...</p>;
    useEffect(() => {
        setIsOpen(false);
    }, [activeType]);

    return (
        <div>
            <div className="card mb-lg-0 mb-4">
                <div
                    className="qr-sidebar-header"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 style={{ marginBottom: 0 }}>QR Types</h3>
                    <span className="toggle-icon">{isOpen ? "−" : "+"}</span>
                </div>
                <div className={`qr-types-list ${isOpen ? "open" : ""}`}>
                    {qrTypesLoading && <QRShimmerList />}
                    {!qrTypesLoading && qrTypesError && (
                        <p className="mb-0 p-2">Failed to load QR types.</p>
                    )}

                    {
                        qrTypes.map((item) => {
                            const slug = getSLUG(item.icon);

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`qr-type-btn ${activeType === slug ? "active" : ""
                                        }`}
                                    onClick={() => onTypeChange?.(slug)}
                                >
                                    <span className="qr-type-icon">
                                        {getIcon(item.icon)}
                                    </span>
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
