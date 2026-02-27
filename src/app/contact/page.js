

"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getToken } from "@/utils/storage";
import Header2 from "@/components/Header2";
import ContactPage from "@/components/Contact";

export default function page() {
  return (
    <div>
      {getToken() ? <Header2 /> : <Header />}
      <div id="home-page" className="page active">
        <section
          className="hero banner_top"
          style={{
            background:
              "linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)",
              paddingTop: 20, paddingBottom: 20
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 order-lg-1 order-2 align-self-center text-center">
                <h1 className="mb-0">Contact Us</h1>
              </div>
              {/* <div className="col-md-5 order-lg-2 order-1 text-center">
                <img src="img/contact.png" />
              </div> */}
            </div>
          </div>
        </section>
        <section className="features-section content-section">
        {/* <div className="container"> */}
    {/* <div className="row justify-content-center"> */}
      <div className="col-lg-22 col-xl-22 align-center">
        <ContactPage />
      </div>
    {/* </div> */}
  {/* </div> */}
        </section>
      </div>
      <Footer />
    </div>
  );
}