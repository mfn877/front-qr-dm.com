//application/vnd.openxmlformats-officedocument.wordprocessingml.document
//application/vnd.openxmlformats-officedocument.wordprocessingml.document.


//src\app\dashboard\page.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import UrlQR from "@/components/qr-contents/UrlQR";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/storage";
import QrToolbar from "@/components/QrToolbar";
import QrCodeCard from "@/components/QrCodeCard";
import QrTypeMenu from "@/components/QrTypeMenu";
import { fetchQrData } from "@/services/qrService";
import QrCodeGrid from "@/components/QrCodeGrid";
import { mapQrFromApi } from "@/utils/qrMapper";
import api from "@/lib/api";
import Swal from "sweetalert2";
export default function page() {
  const [isOpen, setIsOpen] = useState(false);
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
  const onDelete = async (id) => {
    //Give Sweet alert confirmation before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteQr(id);
        Swal.fire(
          'Deleted!',
          'Your QR code has been deleted.',
          'success'
        )
      }
    });
  };

  const deleteQr = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete("/qr-data/" + id);
      if (res?.data?.status_code !== 1) {
        Swal.fire(
          'Error!',
          e?.message || 'Failed to delete QR code.',
          'error'
        );
        throw new Error("Failed to delete QR code");
      }
      setQrs((prevQrs) => prevQrs.filter((qr) => qr.id !== id));
    } catch (e) {
      Swal.fire(
        'Error!',
        e?.message || 'Failed to delete QR code.',
        'error'
      );
      console.error("Failed to delete QR code", e);
      return;
    } finally {
      setLoading(false);
    }
  };

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
            <Link
              className="btn btn-primary"
              href="/qr-generator/url"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New QR
            </Link>
          </div>
          <div className="dashboard-layout">
            <div>
              <div className="card" style={{ padding: "1rem 0.5rem" }}>
                <h3
                  style={{
                    marginBottom: "0rem",
                    alignItems: "center",
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <i className="fa fa-qrcode me-1 ms-1"></i> QR Types
                  <span className="toggle-icon float-end">{isOpen ? "−" : "+"}</span>
                </h3>
                <div className="folder-list">
                  <div className={`qr-types-list ${isOpen ? "open" : ""}`}>
                    <QrTypeMenu
                      activeType={activeType}
                      onSelect={setActiveType}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <QrToolbar
                search={search}
                onSearchChange={setSearch}
                view={view}
                onViewChange={setView}
              />
              <div
                className={view === "grid" ? "qr-codes-grid" : "qr-codes-list"}
              >
                <QrCodeGrid qrs={qrs} onDelete={(id) => onDelete?.(id)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
