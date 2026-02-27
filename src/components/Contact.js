"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

/* ─── SVG Illustration ───────────────────────────────────── */
const QR_PIXELS = [[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[30,0],[31,0],[32,0],[33,0],[34,0],[35,0],[36,0],[37,0],[38,0],[39,0],[40,0],[41,0],[42,0],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[25,1],[26,1],[27,1],[28,1],[29,1],[30,1],[31,1],[32,1],[33,1],[34,1],[35,1],[36,1],[37,1],[38,1],[39,1],[40,1],[41,1],[42,1],[43,1],[44,1],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],[23,2],[24,2],[25,2],[26,2],[27,2],[28,2],[29,2],[30,2],[31,2],[32,2],[33,2],[34,2],[35,2],[36,2],[37,2],[38,2],[39,2],[40,2],[41,2],[42,2],[43,2],[44,2],[45,2],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],[18,3],[19,3],[20,3],[21,3],[22,3],[23,3],[24,3],[25,3],[26,3],[27,3],[28,3],[29,3],[30,3],[31,3],[32,3],[33,3],[34,3],[35,3],[36,3],[37,3],[38,3],[39,3],[40,3],[41,3],[42,3],[43,3],[44,3],[45,3],[46,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[19,4],[20,4],[21,4],[22,4],[23,4],[24,4],[25,4],[26,4],[27,4],[28,4],[29,4],[30,4],[31,4],[32,4],[33,4],[34,4],[35,4],[36,4],[37,4],[38,4],[39,4],[40,4],[41,4],[42,4],[43,4],[44,4],[45,4],[46,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5],[14,5],[15,5],[16,5],[17,5],[18,5],[19,5],[20,5],[21,5],[22,5],[23,5],[24,5],[25,5],[26,5],[27,5],[28,5],[29,5],[30,5],[31,5],[32,5],[33,5],[34,5],[35,5],[36,5],[37,5],[38,5],[39,5],[40,5],[41,5],[42,5],[43,5],[44,5],[45,5],[46,5],[47,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[41,6],[42,6],[43,6],[44,6],[45,6],[46,6],[47,6],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[42,7],[43,7],[44,7],[45,7],[46,7],[47,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[23,8],[24,8],[25,8],[29,8],[30,8],[31,8],[32,8],[33,8],[34,8],[35,8],[36,8],[37,8],[38,8],[42,8],[43,8],[44,8],[45,8],[46,8],[47,8],[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],[14,9],[15,9],[16,9],[17,9],[18,9],[22,9],[23,9],[24,9],[25,9],[29,9],[30,9],[31,9],[32,9],[33,9],[34,9],[35,9],[36,9],[37,9],[38,9],[39,9],[42,9],[43,9],[44,9],[45,9],[46,9],[47,9],[0,10],[1,10],[2,10],[3,10],[4,10],[5,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10],[19,10],[22,10],[23,10],[24,10],[25,10],[26,10],[29,10],[30,10],[31,10],[32,10],[33,10],[34,10],[35,10],[36,10],[37,10],[38,10],[39,10],[42,10],[43,10],[44,10],[45,10],[46,10],[47,10],[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[17,11],[18,11],[19,11],[22,11],[23,11],[24,11],[25,11],[29,11],[30,11],[31,11],[32,11],[33,11],[34,11],[35,11],[36,11],[37,11],[38,11],[39,11],[42,11],[43,11],[44,11],[45,11],[46,11],[47,11],[0,12],[1,12],[2,12],[3,12],[4,12],[5,12],[8,12],[9,12],[10,12],[11,12],[16,12],[17,12],[18,12],[19,12],[22,12],[23,12],[24,12],[25,12],[29,12],[30,12],[31,12],[32,12],[33,12],[34,12],[35,12],[36,12],[37,12],[38,12],[39,12],[42,12],[43,12],[44,12],[45,12],[46,12],[47,12],[0,13],[1,13],[2,13],[3,13],[4,13],[5,13],[8,13],[9,13],[10,13],[11,13],[16,13],[17,13],[18,13],[19,13],[29,13],[30,13],[31,13],[32,13],[33,13],[34,13],[35,13],[36,13],[37,13],[38,13],[39,13],[42,13],[43,13],[44,13],[45,13],[46,13],[47,13],[0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[8,14],[9,14],[10,14],[11,14],[16,14],[17,14],[18,14],[19,14],[29,14],[30,14],[31,14],[32,14],[33,14],[34,14],[35,14],[36,14],[37,14],[38,14],[39,14],[42,14],[43,14],[44,14],[45,14],[46,14],[47,14],[0,15],[1,15],[2,15],[3,15],[4,15],[5,15],[8,15],[9,15],[10,15],[11,15],[16,15],[17,15],[18,15],[19,15],[24,15],[25,15],[26,15],[27,15],[28,15],[29,15],[30,15],[31,15],[32,15],[33,15],[34,15],[35,15],[36,15],[37,15],[38,15],[39,15],[42,15],[43,15],[44,15],[45,15],[46,15],[47,15],[0,16],[1,16],[2,16],[3,16],[4,16],[5,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,16],[17,16],[18,16],[19,16],[24,16],[25,16],[26,16],[27,16],[28,16],[29,16],[30,16],[31,16],[32,16],[33,16],[34,16],[35,16],[36,16],[37,16],[38,16],[39,16],[42,16],[43,16],[44,16],[45,16],[46,16],[47,16],[0,17],[1,17],[2,17],[3,17],[4,17],[5,17],[8,17],[9,17],[10,17],[11,17],[12,17],[13,17],[14,17],[15,17],[16,17],[17,17],[18,17],[19,17],[24,17],[25,17],[26,17],[27,17],[28,17],[29,17],[30,17],[31,17],[32,17],[33,17],[34,17],[35,17],[36,17],[37,17],[38,17],[39,17],[42,17],[43,17],[44,17],[45,17],[46,17],[47,17],[0,18],[1,18],[2,18],[3,18],[4,18],[5,18],[8,18],[9,18],[10,18],[11,18],[12,18],[13,18],[14,18],[15,18],[16,18],[17,18],[18,18],[19,18],[24,18],[25,18],[26,18],[27,18],[28,18],[29,18],[30,18],[31,18],[32,18],[33,18],[34,18],[35,18],[36,18],[37,18],[38,18],[39,18],[42,18],[43,18],[44,18],[45,18],[46,18],[47,18],[0,19],[1,19],[2,19],[3,19],[4,19],[5,19],[9,19],[10,19],[11,19],[12,19],[13,19],[14,19],[15,19],[16,19],[17,19],[18,19],[24,19],[25,19],[26,19],[27,19],[28,19],[29,19],[30,19],[31,19],[32,19],[33,19],[34,19],[35,19],[36,19],[37,19],[38,19],[39,19],[42,19],[43,19],[44,19],[45,19],[46,19],[47,19],[0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[24,20],[25,20],[26,20],[27,20],[30,20],[31,20],[32,20],[33,20],[42,20],[43,20],[44,20],[45,20],[46,20],[47,20],[0,21],[1,21],[2,21],[3,21],[4,21],[5,21],[24,21],[25,21],[26,21],[27,21],[30,21],[31,21],[32,21],[33,21],[42,21],[43,21],[44,21],[45,21],[46,21],[47,21],[0,22],[1,22],[2,22],[3,22],[4,22],[5,22],[14,22],[15,22],[16,22],[21,22],[22,22],[23,22],[24,22],[25,22],[26,22],[27,22],[28,22],[29,22],[30,22],[31,22],[32,22],[33,22],[37,22],[38,22],[42,22],[43,22],[44,22],[45,22],[46,22],[47,22],[0,23],[1,23],[2,23],[3,23],[4,23],[5,23],[14,23],[15,23],[16,23],[17,23],[20,23],[21,23],[22,23],[23,23],[24,23],[25,23],[26,23],[27,23],[28,23],[29,23],[30,23],[31,23],[32,23],[33,23],[35,23],[36,23],[37,23],[38,23],[39,23],[42,23],[43,23],[44,23],[45,23],[46,23],[47,23],[0,24],[1,24],[2,24],[3,24],[4,24],[5,24],[14,24],[15,24],[16,24],[17,24],[20,24],[21,24],[22,24],[23,24],[24,24],[25,24],[26,24],[27,24],[28,24],[29,24],[30,24],[31,24],[32,24],[33,24],[35,24],[36,24],[37,24],[38,24],[39,24],[42,24],[43,24],[44,24],[45,24],[46,24],[47,24],[0,25],[1,25],[2,25],[3,25],[4,25],[5,25],[14,25],[15,25],[16,25],[17,25],[20,25],[21,25],[22,25],[23,25],[24,25],[25,25],[26,25],[27,25],[28,25],[29,25],[30,25],[31,25],[32,25],[33,25],[35,25],[36,25],[37,25],[38,25],[39,25],[42,25],[43,25],[44,25],[45,25],[46,25],[47,25],[0,26],[1,26],[2,26],[3,26],[4,26],[5,26],[14,26],[15,26],[16,26],[17,26],[20,26],[21,26],[22,26],[23,26],[26,26],[27,26],[28,26],[29,26],[30,26],[31,26],[32,26],[33,26],[36,26],[37,26],[38,26],[39,26],[42,26],[43,26],[44,26],[45,26],[46,26],[47,26],[0,27],[1,27],[2,27],[3,27],[4,27],[5,27],[20,27],[21,27],[22,27],[23,27],[26,27],[27,27],[28,27],[29,27],[42,27],[43,27],[44,27],[45,27],[46,27],[47,27],[0,28],[1,28],[2,28],[3,28],[4,28],[5,28],[20,28],[21,28],[22,28],[23,28],[24,28],[25,28],[26,28],[27,28],[28,28],[29,28],[42,28],[43,28],[44,28],[45,28],[46,28],[47,28],[0,29],[1,29],[2,29],[3,29],[4,29],[5,29],[17,29],[18,29],[19,29],[20,29],[21,29],[22,29],[23,29],[24,29],[25,29],[26,29],[27,29],[28,29],[29,29],[30,29],[31,29],[32,29],[36,29],[37,29],[38,29],[42,29],[43,29],[44,29],[45,29],[46,29],[47,29],[0,30],[1,30],[2,30],[3,30],[4,30],[5,30],[16,30],[17,30],[18,30],[19,30],[20,30],[21,30],[22,30],[23,30],[24,30],[25,30],[26,30],[27,30],[28,30],[29,30],[30,30],[31,30],[32,30],[33,30],[35,30],[36,30],[37,30],[38,30],[39,30],[42,30],[43,30],[44,30],[45,30],[46,30],[47,30],[0,31],[1,31],[2,31],[3,31],[4,31],[5,31],[16,31],[17,31],[18,31],[19,31],[20,31],[21,31],[22,31],[23,31],[24,31],[25,31],[26,31],[27,31],[28,31],[29,31],[30,31],[31,31],[32,31],[33,31],[35,31],[36,31],[37,31],[38,31],[39,31],[42,31],[43,31],[44,31],[45,31],[46,31],[47,31],[0,32],[1,32],[2,32],[3,32],[4,32],[5,32],[16,32],[17,32],[18,32],[19,32],[20,32],[21,32],[22,32],[23,32],[24,32],[25,32],[26,32],[27,32],[28,32],[29,32],[30,32],[31,32],[32,32],[33,32],[35,32],[36,32],[37,32],[38,32],[39,32],[42,32],[43,32],[44,32],[45,32],[46,32],[47,32],[0,33],[1,33],[2,33],[3,33],[4,33],[5,33],[17,33],[18,33],[19,33],[20,33],[21,33],[22,33],[23,33],[26,33],[27,33],[28,33],[29,33],[30,33],[31,33],[32,33],[33,33],[36,33],[37,33],[38,33],[39,33],[42,33],[43,33],[44,33],[45,33],[46,33],[47,33],[0,34],[1,34],[2,34],[3,34],[4,34],[5,34],[20,34],[21,34],[22,34],[23,34],[26,34],[27,34],[28,34],[29,34],[43,34],[44,34],[45,34],[46,34],[0,35],[1,35],[2,35],[3,35],[4,35],[5,35],[20,35],[21,35],[22,35],[23,35],[24,35],[25,35],[26,35],[27,35],[28,35],[29,35],[0,36],[1,36],[2,36],[3,36],[4,36],[5,36],[20,36],[21,36],[22,36],[23,36],[24,36],[25,36],[26,36],[27,36],[28,36],[29,36],[32,36],[33,36],[34,36],[35,36],[36,36],[39,36],[40,36],[41,36],[42,36],[43,36],[0,37],[1,37],[2,37],[3,37],[4,37],[5,37],[20,37],[21,37],[22,37],[23,37],[24,37],[25,37],[26,37],[27,37],[28,37],[29,37],[32,37],[33,37],[34,37],[35,37],[36,37],[38,37],[39,37],[40,37],[41,37],[42,37],[43,37],[45,37],[46,37],[47,37],[0,38],[1,38],[2,38],[3,38],[4,38],[5,38],[32,38],[33,38],[34,38],[35,38],[36,38],[38,38],[39,38],[40,38],[41,38],[42,38],[43,38],[44,38],[45,38],[46,38],[47,38],[0,39],[1,39],[2,39],[3,39],[4,39],[5,39],[32,39],[33,39],[34,39],[35,39],[36,39],[38,39],[39,39],[40,39],[41,39],[42,39],[43,39],[44,39],[45,39],[46,39],[47,39],[0,40],[1,40],[2,40],[3,40],[4,40],[5,40],[32,40],[33,40],[34,40],[35,40],[36,40],[38,40],[39,40],[40,40],[41,40],[42,40],[43,40],[45,40],[46,40],[47,40],[0,41],[1,41],[2,41],[3,41],[4,41],[5,41],[39,41],[40,41],[41,41],[42,41],[43,41],[0,42],[1,42],[2,42],[3,42],[4,42],[5,42],[6,42],[7,42],[8,42],[9,42],[10,42],[11,42],[12,42],[13,42],[14,42],[15,42],[16,42],[17,42],[18,42],[19,42],[20,42],[21,42],[22,42],[23,42],[24,42],[25,42],[26,42],[27,42],[28,42],[29,42],[30,42],[31,42],[32,42],[33,42],[1,43],[2,43],[3,43],[4,43],[5,43],[6,43],[7,43],[8,43],[9,43],[10,43],[11,43],[12,43],[13,43],[14,43],[15,43],[16,43],[17,43],[18,43],[19,43],[20,43],[21,43],[22,43],[23,43],[24,43],[25,43],[26,43],[27,43],[28,43],[29,43],[30,43],[31,43],[32,43],[33,43],[34,43],[35,43],[43,43],[44,43],[45,43],[46,43],[47,43],[1,44],[2,44],[3,44],[4,44],[5,44],[6,44],[7,44],[8,44],[9,44],[10,44],[11,44],[12,44],[13,44],[14,44],[15,44],[16,44],[17,44],[18,44],[19,44],[20,44],[21,44],[22,44],[23,44],[24,44],[25,44],[26,44],[27,44],[28,44],[29,44],[30,44],[31,44],[32,44],[33,44],[34,44],[35,44],[37,44],[38,44],[39,44],[40,44],[43,44],[44,44],[45,44],[46,44],[47,44],[2,45],[3,45],[4,45],[5,45],[6,45],[7,45],[8,45],[9,45],[10,45],[11,45],[12,45],[13,45],[14,45],[15,45],[16,45],[17,45],[18,45],[19,45],[20,45],[21,45],[22,45],[23,45],[24,45],[25,45],[26,45],[27,45],[28,45],[29,45],[30,45],[31,45],[32,45],[33,45],[34,45],[35,45],[37,45],[38,45],[39,45],[40,45],[43,45],[44,45],[45,45],[46,45],[47,45],[3,46],[4,46],[5,46],[6,46],[7,46],[8,46],[9,46],[10,46],[11,46],[12,46],[13,46],[14,46],[15,46],[16,46],[17,46],[18,46],[19,46],[20,46],[21,46],[22,46],[23,46],[24,46],[25,46],[26,46],[27,46],[28,46],[29,46],[30,46],[31,46],[32,46],[33,46],[34,46],[35,46],[37,46],[38,46],[39,46],[40,46],[43,46],[44,46],[45,46],[46,46],[47,46],[5,47],[6,47],[7,47],[8,47],[9,47],[10,47],[11,47],[12,47],[13,47],[14,47],[15,47],[16,47],[17,47],[18,47],[19,47],[20,47],[21,47],[22,47],[23,47],[24,47],[25,47],[26,47],[27,47],[28,47],[29,47],[30,47],[31,47],[32,47],[33,47],[34,47],[37,47],[38,47],[39,47],[40,47],[43,47],[44,47],[45,47],[46,47],[47,47]];

const ContactIllustration = () => {
  // QR card dimensions and position in the SVG viewport
  const svgW = 420, svgH = 440;
  const cardX = 105, cardY = 80, cardW = 185, cardH = 215;
  const qrOriginX = cardX + 18;
  const qrOriginY = cardY + 42;
  const scale = 3.06; // 48 * 3.06 ≈ 147 fits inside card

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", maxWidth: 420 }}
    >
      <defs>
        {/* Gradient matching the favicon: blue bottom-left → violet top-right */}
        <linearGradient id="qrGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0547FF" />
          <stop offset="55%" stopColor="#7B3FEF" />
          <stop offset="100%" stopColor="#C360FC" />
        </linearGradient>

        {/* Soft blob gradients */}
        <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>

        {/* Card shadow */}
        <filter id="cardShadow" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#7C3AED" floodOpacity="0.18" />
        </filter>

        {/* Element shadows */}
        <filter id="floatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── Background blobs ── */}
      <ellipse cx="320" cy="80" rx="110" ry="90" fill="url(#blob1)" />
      <ellipse cx="70" cy="340" rx="90" ry="80" fill="url(#blob2)" />
      <ellipse cx="350" cy="370" rx="70" ry="60" fill="url(#blob1)" opacity="0.6" />

      {/* ── QR code card ── */}
      <rect
        x={cardX} y={cardY}
        width={cardW} height={cardH}
        rx="20" ry="20"
        fill="white"
        filter="url(#cardShadow)"
      />

      {/* Card top label */}
      <text x={cardX + cardW / 2} y={cardY + 26} textAnchor="middle"
        fontFamily="'Courier New', monospace" fontSize="10" fontWeight="700"
        fill="#7C3AED" letterSpacing="2">SCAN ME</text>

      {/* White QR background area */}
      <rect
        x={qrOriginX - 2} y={qrOriginY - 2}
        width={48 * scale + 4} height={48 * scale + 4}
        rx="6" fill="white"
      />

      {/* ── Pixel-perfect QR from favicon ── */}
      <g fill="url(#qrGrad)">
        {QR_PIXELS.map(([px, py], i) => (
          <rect
            key={i}
            x={qrOriginX + px * scale}
            y={qrOriginY + py * scale}
            width={scale + 0.5}
            height={scale + 0.5}
          />
        ))}
      </g>

      {/* Card bottom domain text */}
      <text x={cardX + cardW / 2} y={cardY + cardH - 12} textAnchor="middle"
        fontFamily="'Courier New', monospace" fontSize="8.5" fill="#94A3B8" letterSpacing="1">
        contact.me/card
      </text>

      {/* ── Floating envelope ── */}
      <g transform="translate(310, 140)" filter="url(#floatShadow)">
        <rect x="0" y="0" width="72" height="50" rx="8" fill="#7C3AED" />
        <polyline points="0,0 36,28 72,0" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round" />
        {/* send dashes */}
        {[0, 10, 20].map((offset, i) => (
          <line key={i}
            x1={14 + offset} y1={62 + i * 9}
            x2={26 + offset} y2={62 + i * 9}
            stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round"
            opacity={1 - i * 0.25}
          />
        ))}
      </g>

      {/* ── Chat bubbles ── */}
      {/* Main bubble */}
      <rect x="22" y="108" width="70" height="36" rx="12" fill="#7C3AED" />
      <polygon points="34,144 24,156 44,144" fill="#7C3AED" />
      {/* Dots inside */}
      {[38, 52, 66].map((cx, i) => (
        <circle key={i} cx={cx} cy={126} r="4" fill="white" opacity={1 - i * 0.2} />
      ))}

      {/* Reply bubble */}
      <rect x="30" y="168" width="62" height="30" rx="10" fill="#EDE9FE" />
      <polygon points="76,198 86,210 66,198" fill="#EDE9FE" />
      {[50, 62, 74].map((cx, i) => (
        <circle key={i} cx={cx} cy={183} r="3" fill="#7C3AED" opacity={0.5 + i * 0.2} />
      ))}

      {/* ── Accent dots ── */}
      <circle cx="300" cy="52" r="6" fill="#C360FC" opacity="0.7" />
      <circle cx="318" cy="42" r="4" fill="#0547FF" opacity="0.5" />
      <circle cx="94" cy="70" r="5" fill="#7C3AED" opacity="0.4" />
      <circle cx="60" cy="290" r="8" fill="#C360FC" opacity="0.3" />
      <circle cx="355" cy="315" r="5" fill="#0547FF" opacity="0.5" />
      <circle cx="370" cy="240" r="4" fill="#7C3AED" opacity="0.6" />

      {/* Phone receiver icon bottom-right */}
      <g transform="translate(340, 290)">
        <rect x="0" y="0" width="52" height="52" rx="14" fill="#EDE9FE" />
        <text x="26" y="35" textAnchor="middle" fontSize="24">📞</text>
      </g>
    </svg>
  );
};


/* ─── Static data ────────────────────────────────────────── */
const features = [
  {
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-bar-chart"></i>
      </span>
    ),
    label: "Smart Analytics",
    desc: "Track every scan in real-time",
  },
  {
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-image-fill"></i>
      </span>
    ),
    label: "High-Quality Exports",
    desc: "SVG, PNG & PDF formats",
  },
  {
    icon: (
      <span className="feature-icon-contact text-white">
      <i class="bi bi-shield-fill-check"></i>
      </span>
    ),
    label: "Security First",
    desc: "Encrypted & abuse-protected",
  },
  {
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-recycle"></i>
      </span>
    ),
    label: "No Reprints Needed",
    desc: "Update destination links on-the-fly",
  },
];
// const features = [
//   { icon: <span className="feature-icon-contact"><i class="bi bi-bar-chart "></i></span>, label: "Smart Analytics",       desc: "Track every scan in real-time"   },
//   { icon: <i class="bi bi-image-fill" ></i>, label: "High-Quality Exports",  desc: "SVG, PNG & PDF formats"          },
//   { icon: <i class="bi bi-shield-fill"></i>, label: "Security First",         desc: "Encrypted & abuse-protected"     },
//   { icon: <i class="bi bi-recycle"></i>, label: "No Reprints Needed",     desc: "Update destination links on-the-fly" },
// ];

// const quickLinks = [
//   { href: "/faq",          label: "Frequently Asked Questions", icon: <i class="bi bi-question-circle"></i> },
//   { href: "/dashboard",    label: "User Dashboard",             icon: <i class="bi bi-person-fill"></i> },
//   { href: "/qr-generator", label: "QR Generator",              icon: <i class="bi bi-qr-code-scan"></i> },
// ];

const quickLinks = [
  {
    href: "/faq",
    label: "Frequently Asked Questions",
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-question"></i>
      </span>
    ),
  },
  {
    href: "/dashboard",
    label: "User Dashboard",
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-person-fill"></i>
      </span>
    ),
  },
  {
    href: "/qr-generator",
    label: "QR Generator",
    icon: (
      <span className="feature-icon-contact text-white">
        <i className="bi bi-qr-code-scan"></i>
      </span>
    ),
  },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill all fields", confirmButtonColor: "#7c6fcd" });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.qr-dm.com/api/contact/send",
        { name: form.name, email: form.email, subject: form.subject, message: form.message },
        { headers: { Accept: "application/json", "Content-Type": "application/json" } }
      );
      if (response.data.status_code === 1) {
        Swal.fire({ icon: "success", title: "Message Sent!", text: "Our team will contact you within 24 business hours.", confirmButtonColor: "#28a745" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        Swal.fire({ icon: "error", title: "Oops...", text: response.data.message || "Something went wrong", confirmButtonColor: "#dc3545" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Network Error", text: "Failed to send message. Please try again.", confirmButtonColor: "#dc3545" });
    } finally {
      setLoading(false);
    }
  };

  /* shared input style, highlights on focus */
  const inp = (name) => ({
    width: "100%", padding: "11px 14px", marginTop: 6, marginBottom: 16,
    borderRadius: 10, fontSize: 14, color: "#1a1a2e", outline: "none",
    transition: "border 0.2s, background 0.2s",
    border: `1.5px solid ${focused === name ? "#7c6fcd" : "#e2e0f8"}`,
    background: focused === name ? "#fff" : "#fafafa",
  });
  const bind = (name) => ({ onFocus: () => setFocused(name), onBlur: () => setFocused(""), style: inp(name) });

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .c-wrap { display:flex; gap:52px; align-items:flex-start; max-width:1200px; margin:0 auto; padding:44px 24px 64px; }
        .c-left  { flex:1 1 400px; }
        .c-right { flex:1 1 460px; }
        .feat-card {
          display:flex; align-items:flex-start; gap:14px;
          background:#fff; border:1.5px solid #eae8fd; border-radius:14px;
          padding:14px 16px; margin-bottom:12px;
          animation:fadeUp 0.4s ease both;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .feat-card:hover { border-color:#b5aef8; box-shadow:0 4px 18px #b5aef822; }
        .qlink {
          display:flex; align-items:center; gap:10px;
          padding:12px 16px; border-radius:12px;
          background:#fafafa; border:1.5px solid #eae8fd;
          margin-bottom:10px; text-decoration:none;
          color:#1a1a2e; font-weight:600; font-size:14px;
          transition:all 0.2s; animation:fadeUp 0.4s ease both;
        }
        .qlink:hover { background:#eae8fd; border-color:#b5aef8; color:#7c6fcd; }
        .form-card {
          background:#fff; border-radius:24px; border:2px solid #eae8fd;
          padding:36px 32px; box-shadow:0 8px 40px #b5aef814;
          animation:fadeUp 0.5s ease both;
        }
        .send-btn {
          width:100%; padding:13px;
          background:linear-gradient(135deg,#7c6fcd 0%,#c06c84 100%);
          color:#fff; border:none; border-radius:12px;
          font-size:15px; font-weight:700; letter-spacing:1px;
          cursor:pointer; transition:opacity 0.2s, transform 0.2s;
          margin-top:4px;
        }
        .send-btn:hover:not(:disabled) { opacity:0.9; transform:translateY(-1px); }
        .send-btn:disabled { opacity:0.65; cursor:not-allowed; }
        @media(max-width:800px){
          .c-wrap { flex-direction:column; padding:24px 16px 40px; }
        }
      `}</style>

      <div className="c-wrap">

        {/* ════════ LEFT — Graphics ════════ */}
        <div className="c-left">
          <span style={{ display:"inline-block", background:"linear-gradient(135deg,#eae8fd,#fce5e6)", color:"#7c6fcd", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"5px 16px", borderRadius:100, border:"1px solid #d6d0fa", marginBottom:14 }}>
            We're here to help
          </span>

          <h1 style={{ fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:"#1a1a2e", lineHeight:1.2, margin:"0 0 14px" }}>
            Have a question?<br/>
            <span style={{ background:"linear-gradient(135deg,#7c6fcd,#c06c84)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Let's talk.
            </span>
          </h1>

          <p style={{ fontSize:15, color:"#666", lineHeight:1.75, marginBottom:30 }}>
            Whether you're curious about our 17+ QR code types, need help with scan analytics, or want business solutions — our team responds within{" "}
            <strong style={{ color:"#7c6fcd" }}>24 business hours</strong>.
          </p>

          <ContactIllustration />

          {/* Why Choose */}
          <h2 style={secHead}>Why Choose QR DM?</h2>
          {features.map((f, i) => (
            <div className="feat-card" key={i} style={{ animationDelay:`${i*0.08}s` }}>
              <span style={{ fontSize:24, lineHeight:1 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:"#1a1a2e" }}>{f.label}</div>
                <div style={{ fontSize:13, color:"#888", marginTop:2 }}>{f.desc}</div>
              </div>
            </div>
          ))}

          {/* Quick Links */}
          <h2 style={{ ...secHead, marginTop:28 }}>Quick Links & Resources</h2>
          {quickLinks.map((l, i) => (
            <Link href={l.href} className="qlink" key={i} style={{ animationDelay:`${i*0.09}s` }}>
              <span style={{ fontSize:18 }}>{l.icon}</span>
              {l.label}
              <span style={{ marginLeft:"auto", color:"#000000", fontWeight:900 }}>→</span>
            </Link>
          ))}
        </div>

        {/* ════════ RIGHT — Form ════════ */}
        <div className="c-right">
          <div className="form-card">
            <h2 style={{ fontSize:22, fontWeight:800, color:"#1a1a2e", margin:"0 0 4px" }}>
              Send us a message
            </h2>
            <p style={{ fontSize:13, color:"#999", marginBottom:28 }}>
              A member of our team will get back to you within 24 business hours.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={lbl}>Name and Surname <span style={{ color:"#e57373" }}>*</span></label>
              <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" {...bind("name")}/>

              <label style={lbl}>Email Address <span style={{ color:"#e57373" }}>*</span></label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" {...bind("email")}/>

              <label style={lbl}>Subject <span style={{ color:"#e57373" }}>*</span></label>
              <select name="subject" value={form.subject} onChange={handleChange} {...bind("subject")}>
                <option value="">Select a Topic</option>
                <option>Technical Support (Generating & Downloading)</option>
                <option>Dynamic QR & Analytics</option>
                <option>Billing & Subscriptions</option>
                <option>API & Developer Integration</option>
                <option>Report Abuse / Security</option>
              </select>

              <label style={lbl}>Question / Enquiry <span style={{ color:"#e57373" }}>*</span></label>
              <textarea
                name="message" rows={5} value={form.message} onChange={handleChange}
                placeholder="Write your message here..."
                {...bind("message")}
                style={{ ...inp("message"), resize:"vertical" }}
              />

              <button type="submit" disabled={loading} className="send-btn">
                {loading
                  ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>Sending…</>
                  : <i className="bi bi-send"> SEND MESSAGE</i>}
              </button>
            </form>

            {/* Trust badge */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:20, padding:"12px 16px", background:"linear-gradient(135deg,#eae8fd,#fce5e6)", borderRadius:12, border:"1px solid #d6d0fa" }}>
              <span style={{ fontSize:20 }}><i class="bi bi-shield-check"></i></span>
              <span style={{ fontSize:12, color:"#666", lineHeight:1.6 }}>
                Your information is safe with us. We never share your data with third parties.
              </span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

/* ─── Static styles ──────────────────────────────────────── */
const lbl   = { fontSize:13, fontWeight:600, color:"#444", display:"block" };
const secHead = { fontSize:15, fontWeight:700, color:"#1a1a2e", marginBottom:14, textTransform:"uppercase", letterSpacing:1 };