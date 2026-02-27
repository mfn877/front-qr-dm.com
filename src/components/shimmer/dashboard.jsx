export default function QRShimmerDashboard() {
    return (
        <>
            <style>
                {`
@keyframes nerveShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.nerve-shimmer {
  background: linear-gradient(
    90deg,
    #f3f3f3 25%,
    #e5e5e5 37%,
    #f3f3f3 63%
  );
  background-size: 200% 100%;
  animation: nerveShimmer 1.6s infinite linear;
}
`}
            </style>
                {Array.from({ length: 6 }).map((_, index) => (
                   <div key={index} className="qr-card shimmer">
                        <div className="p-3 h-100">

                            {/* QR Preview Area */}
                            <div
                                className="nerve-shimmer rounded mb-3"
                                style={{
                                    height: "180px",
                                    width: "100%"
                                }}
                            />

                            {/* Title */}
                            <div
                                className="nerve-shimmer rounded mb-2"
                                style={{
                                    height: "16px",
                                    width: "90px"
                                }}
                            />

                            {/* Small Text */}
                            <div
                                className="nerve-shimmer rounded"
                                style={{
                                    height: "12px",
                                    width: "60px"
                                }}
                            />

                        </div>
                    </div>
                ))}


        </>
    );
}
