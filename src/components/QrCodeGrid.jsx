import QrCodeCard from "@/components/QrCodeCard";
import QRShimmerDashboard from "./shimmer/dashboard";

export default function QrCodeGrid({ qrs = [], onDelete, loading, isMobile }) {
    if (loading) {
        return <QRShimmerDashboard />;
    }
    if (!qrs.length) {
        return <>

            <h2 className="text-center text-muted py-10">No QR Codes Found</h2>

        </>;
    }

    return (
        <>
            {qrs.map((qr) => (
                <QrCodeCard
                    isMobile={isMobile}
                    id={qr.id}
                    title={qr.title}
                    type={qr.typeName}
                    label={qr.label}
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
