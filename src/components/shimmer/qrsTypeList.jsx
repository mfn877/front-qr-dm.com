export default function QRShimmerList() {
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
            <div className="qr-types-card mt-3">

                {/* List Items */}
                {Array.from({ length: 15 }).map((_, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-center mb-3 ms-2"
                    >
                        {/* Icon Circle */}
                        <div
                            className="rounded-circle nerve-shimmer me-3"
                            style={{ width: "40px", height: "40px" }}
                        />

                        {/* Text */}
                        <div
                            className="nerve-shimmer rounded"
                            style={{ height: "40px", width: "150px" }}
                        />
                    </div>
                ))}

            </div>
        </>
    );
}
