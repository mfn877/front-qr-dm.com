"use client";
import React from "react";

export default function QrToolbar({
  search = "",
  onSearchChange,
  view = "grid", // "grid" | "list"
  onViewChange,
}) {
  return (
    <div className="card" style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Search Bar */}
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            className="input"
            placeholder="Search QR codes..."
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* View Controls */}
        {/* <div className="view-controls">
          <button
            className={`view-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => onViewChange?.("grid")}
            aria-label="Grid view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>

          <button
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => onViewChange?.("list")}
            aria-label="List view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
}
