//src\app\dashboard\page.js
"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import UrlQR from "@/components/qr-contents/UrlQR";
import { useRouter } from "next/navigation";
import { isLoggedIn, removeToken } from "@/utils/storage";
import QrToolbar from "@/components/QrToolbar";
import QrCodeCard from "@/components/QrCodeCard";
import QrTypeMenu from "@/components/QrTypeMenu";
import { fetchQrData } from "@/services/qrService";
import QrCodeGrid from "@/components/QrCodeGrid";
import { mapQrFromApi } from "@/utils/qrMapper";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { useQrsQuery } from "@/services/qrtypes";
import secureLocalStorage from "react-secure-storage";
export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [activeType, setActiveType] = useState("");
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState([]);
  // useEffect(() => {
  //   if (!isLoggedIn()) {
  //     router.replace("/login");
  //   }
  // }, [router]);
  // useEffect(() => {
  //   loadQrs(activeType);
  // }, [activeType]);
  // async function loadQrs(qrtype) {
  //   try {
  //     setLoading(true);
  //     const data = await fetchQrData({ qrtype });

  //     if (!data || data.length === 0) {
  //       setQrs([]);
  //       return;
  //     }
  //     setQrs(data.map(mapQrFromApi));
  //   } catch (e) {
  //     // console.error("QR fetch failed11", e);
  //     if (Number(e?.status) === 401 || Number(e?.response?.status) === 401) {
  //       // logout
  //       localStorage.clear();
  //       router.replace("/login");
  //       return;
  //     }
  //     // console.error("QR fetch failed", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/profile");

        if (data?.status_code === 1) {
          const user = data.data;
          secureLocalStorage.setItem("qr_user", user);
        } else {
          router.replace("/login");
          removeToken();
        }
      } catch (error) {
        console.error("Failed to load profile", error);
        removeToken();
        router.replace("/login");
      }
    };
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      fetchProfile();
    }
  }, [router]);

  const { data, isLoading, isError } = useQrsQuery(activeType);

  useEffect(() => {
    setQrs([]);
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, [activeType]);

  useEffect(() => {
    if (isError) {
      setQrs([]);
      return;
    }
    setQrs(Array.isArray(data) ? data.map(mapQrFromApi) : []);
  }, [data, isError]);


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

  // is  mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsOpen(false);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header2 />
      <div id="dashboard-page" className="page dashboard-page">
        <div className="container">
          <div className="dashboard-header d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">

            <div>
              <h1 className="mb-1">Dashboard</h1>
              <p className="mb-0 text-muted">Manage and track your QR codes</p>
            </div>

            <Link
              className={"btn btn-primary d-inline-flex align-items-center gap-2  w-md-auto justify-content-center" + (isMobile ? " w-100" : "")}
              href={`/qr-generator/${selectedSlug}`}
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
              <span>Create New QR</span>
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
                      setSelectedSlug={setSelectedSlug}
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
              {/* <QrToolbar
                search={search}
                onSearchChange={setSearch}
                view={view}
                onViewChange={setView}
              /> */}
              <div
                className={view === "grid" ? "qr-codes-grid" : "qr-codes-list"} >
                <QrCodeGrid qrs={qrs} loading={isLoading} onDelete={(id) => onDelete?.(id)} isMobile={isMobile} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
