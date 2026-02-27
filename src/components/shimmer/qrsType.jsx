export default function QRShimmerPage() {
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

.qr-card.shimmer {
  pointer-events: none;
}

.qr-card.shimmer h3,
.qr-card.shimmer p {
  border-radius: 6px;
}
`}
            </style>

            {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="qr-card shimmer">

                    <div
                        className="qr-card-icon nerve-shimmer"
                        style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            margin: "0 auto 15px"
                        }}
                    />

                    <h3
                        className="nerve-shimmer"
                        style={{
                            height: "16px",
                            width: "80px",
                            margin: "0 auto 10px"
                        }}
                    />

                    <p
                        className="nerve-shimmer"
                        style={{
                            height: "12px",
                            width: "120px",
                            margin: "0 auto"
                        }}
                    />
                </div>
            ))}
        </>
    );
}
