import Link from 'next/link'
import React from 'react'

const Powredbybrand = () => {
  return (
    <div className="container my-4">
              <div className="d-flex justify-content-center">
                <Link
                  href="/"
                  className="text-decoration-none"
                >
                  <div className="d-flex align-items-center bg-white shadow-sm rounded-4 px-4 py-3 border">
                    <img
                      src="/img/logo.png"
                      alt="QRDM Logo"
                      className="img-fluid me-3"
                      style={{ maxWidth: "130px" }}
                    />
                    <div>
                      <small className="text-muted d-block">Powered by</small>
                      <span className="fw-bold text-primary">QR-DM</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
  )
}

export default Powredbybrand