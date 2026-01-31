
"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Blog from "@/components/Blog";
import Header2 from "@/components/Header2";
import { getToken } from "@/utils/storage";
// import PrivacyPolicy from "@/components/PrivacyPolicy";

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
              <div className="col-md-7 order-lg-1 order-2 align-self-center">
                <h1>Blog</h1>
             </div>
              <div className="col-md-5 order-lg-2 order-1 text-center">
                <img src="img/blog.png" />
              </div>
            </div>
          </div>
        </section>
        <section className="features-section content-section">
          <div className="container">
         <Blog />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}