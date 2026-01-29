"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

export default function Page() {
  return (
    <div>
      <Header />

      <div id="home-page" className="page active">
        {/* ================= HERO ================= */}
        <section
          className="hero"
          style={{
            background:
              "linear-gradient(138.18deg, #eae8fd 0%, #fce5e6 94.44%)",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-7 align-self-center">
                <h1 className="mb-0">Features</h1>
              </div>
              <div className="col-md-5 text-center">
                <img
                  style={{ width: 200 }}
                  src="/img/feature.png"
                  alt="Features"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="features-section">
          <div className="container">
            <Features />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
