import React from 'react'

function Passwordbar({ percent, color, label, validations }) {
    return (<>
        <div style={{ marginTop:4 }}>
            <div
                style={{
                    height: 6,
                    borderRadius: 4,
                    background: "#e5e7eb",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${percent}%`,
                        background: color,
                        transition: "width 0.3s ease, background 0.3s ease",
                        borderRadius: 4,
                    }}
                />
            </div>

            {label && (
                <p
                    style={{
                        color,
                        fontSize: 12,
                        marginTop: 4,
                        fontWeight: 600,
                    }}
                >
                    {label}
                </p>
            )}
        </div>
        <ul style={{ marginTop: 8, paddingLeft: 16 }}>
            {validations.map((rule, index) => (
                <li
                    key={index}
                    style={{
                        fontSize: 12,
                        color: rule.passed ? "#22c55e" : "#9ca3af",
                    }}
                >
                    {rule.label}
                </li>
            ))}
        </ul>
    </>
    )



}

export default Passwordbar