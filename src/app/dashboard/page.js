//src\app\dashboard\page.js
"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Header2 from '@/components/Header2'
import Footer from '@/components/Footer'
import UrlQR from '@/components/qr-contents/UrlQR'
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/storage";
import QrToolbar from '@/components/QrToolbar';
import QrCodeCard from '@/components/QrCodeCard';
import QrTypeMenu from '@/components/QrTypeMenu';
import { fetchQrData } from "@/services/qrService";
import QrCodeGrid from '@/components/QrCodeGrid';
import { mapQrFromApi } from '@/utils/qrMapper';
export default function page() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [activeType, setActiveType] = useState("");
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    }
  }, [router]);
  useEffect(() => {
    loadQrs(activeType);
  }, [activeType]);

  async function loadQrs(qrtype) {
    try {
      setLoading(true);
      const data = await fetchQrData({ qrtype });

      if (!data || data.length === 0) {
        setQrs([]);
        return;
      }
      setQrs(data.map(mapQrFromApi));
    } catch (e) {
      console.error("QR fetch failed", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header2 />
      <div id="dashboard-page" className="page dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Manage and track your QR codes</p>
            </div>
            <Link className="btn btn-primary" href="/qr-generator/url"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
              </svg>
              Create New QR
            </Link>
          </div>
          {/* <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-header">
                <span>Total Static QR Codes</span>
                <i className="fa fa-qrcode text-primary" style={{ fontSize: "30px" }}></i>
              </div>
              <div className="stat-value">8</div>
            </div>
            <div className="card stat-card">
              <div className="stat-header">
                <span>Total Dynamic QR Codes</span>
                <i className="fa fa-qrcode text-primary" style={{ fontSize: "30px" }}></i>
              </div>
              <div className="stat-value">12</div>
            </div>
            <div className="card stat-card">
              <div className="stat-header">
                <span>Total Scans</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="stat-value">7,693</div>
            </div>
            <div className="card stat-card">
              <div className="stat-header">
                <span>This Month</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="stat-value">+24%</div>
            </div>
          </div> */}
          <div className="dashboard-layout">
            <div>
              <div className="card" style={{ padding: "1rem 0.5rem" }}>
                <h3 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <i className="fa fa-qrcode me-1 ms-1"></i> QR Types
                </h3>
                <div className="folder-list">
                  <div className="qr-types-list">
                    <QrTypeMenu
                      activeType={activeType}
                      onSelect={setActiveType}
                    />
                    
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <QrToolbar
                search={search}
                onSearchChange={setSearch}
                view={view}
                onViewChange={setView}
              />
              <div className={view === "grid" ? "qr-codes-grid" : "qr-codes-list"}>
                <QrCodeGrid
                  qrs={qrs}
                  onDelete={() => onDelete?.(qr.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  )
}
