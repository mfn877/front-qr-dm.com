import QrCodeCard from "@/components/QrCodeCard";

export default function QrCodeGrid({ qrs = [], onDelete }) {
    if (!qrs.length) {
        return <p>Your saved QRs will appear here.</p>;
    }

    return (
        <>
            {qrs.map((qr) => (
                // console.log("Rendering QR Code:", qr) ||
                <QrCodeCard
                    key={qr.id}
                    title={qr.title}
                    type={qr.typeName}
                    icon={qr.typeIcon}
                    scans={qr.scans}
                    svg={qr.svg}
                    track={qr.track}
                    onDelete={() => onDelete?.(qr.id)}
                />
            ))}
        </>
    );
}
