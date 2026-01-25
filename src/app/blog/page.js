
"use client";
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Blog from "@/components/Blog";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function page() {
  return (
    <div>
      <Header />
      <div id="home-page" className="page active">
        <section
          className="hero"
          style={{
            background:
              "linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)",
              paddingTop: 20, paddingBottom: 20
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7 align-self-center">
                <h1>Blog</h1>
             </div>
              <div className="col-md-5 text-center">
                <img style={{ width: 200 }} src="img/blog.png" />
              </div>
            </div>
          </div>
        </section>
        <section className="features-section">
          <div className="container">
        
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}