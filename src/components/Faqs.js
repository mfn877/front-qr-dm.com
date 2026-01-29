"use client";

import React, { useState } from "react";

const faqData = [
  {
    section: "General Questions",
    items: [
      {
        q: "What is QR DM?",
        a: "QR DM is a fast and reliable QR code generator designed for personal, academic, and business use. It allows you to create high-quality QR codes in seconds, download them instantly, and share information effortlessly, no technical skills required."
      },
      {
        q: "Is QR DM free to use?",
        a: "Yes. You can create QR codes for free without signing up. Free users can generate and download QR codes instantly. Premium features may be available for advanced use cases. "
      },
      {
        q: "Do I need to create an account to generate QR codes?",
        a: "No account is required to create and download QR codes. However, creating an account allows you to manage, edit, and track your QR codes more efficiently."
      }
    ]
  },
  {
    section: "QR Code Types & Features",
    items: [
      {
        q: "What types of QR codes can I create with QR DM?",
        a: "QR DM supports 17 powerful QR code types,including: URL, WiFi, Phone, SMS, Email, vCard (Digital Business Card), Location, Text, WhatsApp, App Links, Documents & PDFs, Events, App Downloads, Payments, Multi-Link Pages, and  Professional Business Profiles."
      },
      {
        q: "Can I create QR codes for business use?",
        a: "Absolutely. QR DM QR codes can be used for marketing, menus, business cards, payments, events, and more, perfect for small businesses and enterprises."
      },
      {
        q: "Can I create a digital business card QR code?",
        a: "Yes. Our Business Card and vCard QR codes let you share contact details, company information, and social links instantly with a single scan. "
      }
    ]
  },
   {
    section: "Editing & Dynamic QR Codes",
    items: [
      {
        q: "Can I edit my QR code after creating it?",
        a: "Yes, if you use a dynamic QR code, you can update the content anytime without changing or reprinting the QR code itself."
      },
      {
        q: "Can I change the destination without changing the QR code design?",
        a: "Yes. Dynamic QR codes allow you to update links or content while keeping the same QR code appearance."
      },
      {
        q: "Will my QR codes expire?",
        a: "Static QR codes never expire. Dynamic QR codes remain active as long as your account or plan is active."
      }
    ]
  },
  {
    section: "Scanning & Compatibility",
    items: [
      {
        q: "How do users scan QR codes?",
        a: "Most modern smartphones can scan QR codes directly using the built-in camera, no app required."
      },
       {
        q: "Is there a scan limit?",
        a: "Free QR codes generally have no scan limit. Some advanced analytics or premium features may have usage limits depending on your plan."
      },
      {
        q: "What happens if part of the QR code is damaged?",
        a: "QR codes include built-in error correction, allowing them to remain readable even if part of the code is damaged or obscured."
      }
    ]
  },
   {
    section: "Design & Download",
    items: [
      {
        q: "What file formats can I download?",
        a: "You can download high-quality QR codes in formats suitable for both digital and print use, including PNG and SVG."
      },
       {
        q: " Can I use QR codes on printed materials?",
        a: "Yes. QR DM QR codes are optimized for print materials such as posters, flyers, menus, business cards, and packaging."
      },
      {
        q: "Does color affect QR code scanning?",
        a: "Yes. For best results, ensure high contrast between the QR code and the background (e.g., dark code on a light background)."
      }
    ]
  },
  {
    section: "Analytics & Tracking",
    items: [
      {
        q: "Does QR DM provide scan analytics?",
        a: "Yes. Dynamic QR codes allow you to track total scans and engagement data, helping you measure performance."
      },
       {
        q: " What kind of statistics can I see?",
        a: "You can view scan counts and usage trends. Advanced analytics may be available with premium plans."
      }
    ]
  },
   {
    section: "Security & Privacy",
    items: [
      {
        q: "Are QR codes secure?",
        a: "QR codes themselves are secure. However, users should always verify the source before scanning, especially when linking to payments or downloads."
      },
      {
        q: "Does QR DM store or sell my data?",
        a: "No. QR DM respects user privacy and does not sell personal data. For more details, please review our Privacy Policy."
      }
    ]
  },
  {
    section: "Payments & Commercial Use",
    items: [
      {
        q: "Can I use QR DM QR codes commercially?",
        a: "Yes. QR codes created with QR DM can be used for commercial, educational, and promotional purposes."
      },
      {
        q: "Can I create payment QR codes?",
        a: "Yes. QR DM supports payment QR codes, allowing customers to make quick and convenient payments."
      }
    ]
  },
  {
    section: "Support",
    items: [
      {
        q: "Where can I get help if I have questions?",
        a: "You can visit our Help Center, read our blog and guides, or contact our support team for assistance."
      }
    ]
  }
];

export default function Faqs() {
  return (
    <div className="container" >
       {faqData.map((group, i) => (
        <div key={i} className="mb-lg-5 mb-3">
          <h1>
            {group.section}
          </h1>

          {group.items.map((item, index) => (
            <Accordion
              key={index}
              question={item.q}
              answer={item.a}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ================= ACCORDION ================= */
function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        marginBottom: 10,
        background: "#fff"
      }}
    >
      <button
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className="float-end">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 16px 16px", color: "#555" }}>
          {answer}
        </div>
      )}
    </div>
  );
}

