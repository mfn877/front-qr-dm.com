"use client";
import Link from "next/link";

const QR_TYPES = [
    {
        key: "url",
        label: "URL",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
        )
    },
    {
        key: "wifi",
        label: "WiFi",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        )
    },
    {
        key: "phone",
        label: "Phone",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        )
    },
    {
        key: "sms",
        label: "SMS",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        )
    },
    {
        key: "email",
        label: "Email",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        )
    },
    {
        key: "vcard",
        label: "vCard (Digital)",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        )
    },
    {
        key: "location",
        label: "Location",
        svg: (
            <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </>
        )
    },
    {
        key: "text",
        label: "Text",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        )
    },
    {
        key: "whatsapp",
        label: "WhatsApp",
        svg: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M12.04 2C6.58 2 2.15 6.29 2.15 11.58c0 1.98.6 3.82 1.63 5.37L2 22l5.2-1.7a10.2 10.2 0 004.84 1.23c5.46 0 9.9-4.29 9.9-9.58C21.94 6.29 17.5 2 12.04 2zm0 17.5c-1.54 0-3.05-.41-4.37-1.18l-.31-.18-3.09 1.01 1.01-2.96-.2-.3a7.7 7.7 0 01-1.23-4.31c0-4.25 3.63-7.71 8.19-7.71 4.52 0 8.18 3.46 8.18 7.71s-3.66 7.72-8.18 7.72zm4.48-5.8c-.24-.12-1.42-.69-1.64-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.36-1.92-1.16-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.29-.74-1.77-.19-.46-.38-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.55 4.1 3.58.57.24 1.02.38 1.37.49.58.18 1.11.15 1.53.09.47-.07 1.42-.57 1.62-1.12.2-.55.2-1.03.14-1.12-.06-.09-.22-.15-.46-.27z"/>
</svg>
        )
    },
    {
        key: "app-link",
        label: "Application Link",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        )
    },
    {
        key: "document",
        label: "Document",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        )
    },
    {
        key: "pdf",
        label: "PDF / File Upload",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        )
    },
    {
        key: "event",
        label: "Event QR",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        )
    },
    {
        key: "app-download",
        label: "App Download QR",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        )
    },
    {
        key: "payment",
        label: "Payment QR",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3v-8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        )
    },
    {
        key: "multi-link",
        label: "Multi-Link QR",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        )
    },
    {
        key: "business-card",
        label: "Digital Business Card",
        svg: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        )
    }
];

export default function QRTypesSidebar({ activeType }) {
    return (
        <div>
            <div className="card">
                <h3 style={{ marginBottom: "1rem" }}>QR Types</h3>
                <div className="qr-types-list">
                    {QR_TYPES.map((item) => (
                        <Link
                            key={item.key}
                            href={`/qr-generator/${item.key}`}
                            style={{ textDecoration: "none" }}
                            className={`qr-type-btn ${activeType === item.key ? "active" : ""}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {item.svg}
                            </svg>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
