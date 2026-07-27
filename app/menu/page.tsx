"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import content from "../../data/content.json";

/* ─── SVG ──────────────────────────────────────────────── */
const LeafSVG = ({ size = 28, color = "#9ccb57" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-9 4-1.5 0-2 .5-2 1C11 9 11.5 9.5 12 9c.5 0 .5.5 0 .5" />
  </svg>
);

const WASvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

type MenuItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
};

export default function MenuPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const waNumber = content.contact.whatsapp?.[0]?.replace(/\D/g, "") || "6281575757048";
  const waLink = `https://wa.me/${waNumber.startsWith("62") ? waNumber : "62" + waNumber.replace(/^0/, "")}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch menu dari API (otomatis baca Google Sheets atau fallback content.json)
  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = menuItems.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className={`gl-nav${scrolled ? " stuck" : ""}`}>
        <div className="c navbar-inner">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(156,203,87,0.3)" }}>
              <Image src="/greenleaf-catering.png" alt="GREENLEAF Logo" width={22} height={22} style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", fontWeight: 700, color: "var(--white)", letterSpacing: "0.5px" }}>
              GREEN<span style={{ color: "var(--lime)" }}>LEAF</span>
            </span>
          </Link>
          <Link href="/" className="btn-secondary" style={{ padding: "clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 28px)" }}>Kembali ke Beranda</Link>
        </div>
      </nav>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="header-pad" style={{ background: "var(--forest)" }}>
        <div className="c" style={{ textAlign: "center" }}>
          <div className="badge badge-glass" style={{ marginBottom: 20 }}>Daftar Lengkap</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--white)", lineHeight: 1.2, marginBottom: 16 }}>
            Menu &amp; Layanan
          </h1>
          <p style={{ color: "var(--muted-dark)", fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)", maxWidth: 560, margin: "0 auto clamp(24px, 5vw, 40px)", lineHeight: 1.8 }}>
            Temukan berbagai pilihan menu istimewa untuk acara Anda. Menu fleksibel menyesuaikan permintaan &amp; budget.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: "min(480px, 90vw)", margin: "0 auto", position: "relative" }}>
            <input
              type="text"
              placeholder="Cari menu... (contoh: tumpeng, nasi box)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "clamp(12px, 3vw, 16px) clamp(18px, 4.5vw, 24px) clamp(12px, 3vw, 16px) clamp(44px, 11vw, 52px)",
                borderRadius: 50,
                border: "1px solid rgba(156,203,87,0.3)",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                color: "var(--white)",
                fontSize: "clamp(0.9rem, 2.2vw, 1rem)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <svg style={{ position: "absolute", left: "clamp(16px, 4vw, 20px)", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── MENU GRID ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--forest)" }}>
        <div className="c">
          {loading ? (
            /* Loading skeleton */
            <div className="menu-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.04)", height: "clamp(380px, 80vw, 420px)", animation: "pulse 1.5s ease-in-out infinite" }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "clamp(60px, 12vw, 80px)", color: "var(--muted-dark)" }}>
              <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", marginBottom: 16 }}>Menu tidak ditemukan.</p>
              <button onClick={() => setSearch("")} className="btn-secondary">Reset Pencarian</button>
            </div>
          ) : (
            <>
              {search && (
                <p style={{ color: "var(--muted-dark)", marginBottom: "clamp(20px, 4vw, 32px)", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
                  Menampilkan <strong style={{ color: "var(--lime)" }}>{filtered.length}</strong> hasil untuk &quot;{search}&quot;
                </p>
              )}
              <div className="menu-grid">
                {filtered.map((cat, idx) => (
                  <div key={cat.id ?? idx} className="card-glass" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
<div className="img-frame">
                      {cat.images && cat.images.length > 1 ? (
                        <Swiper
                          modules={[Pagination]}
                          pagination={{ clickable: true }}
                          slidesPerView={1}
                          spaceBetween={16}
                          breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                          }}
                          style={{ width: "100%", height: "100%" }}
                          className="gl-swiper-small"
                        >
                          {cat.images.map((img, i) => (
                            <SwiperSlide key={i}>
                              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                                <Image
                                  src={img}
                                  alt={`${cat.name} - Foto ${i + 1}`}
                                  fill
                                  style={{ objectFit: "contain" }}
                                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 300px"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : cat.images?.[0] && (
                          <Image
                            src={cat.images[0]}
                            alt={cat.name}
                            width={400}
                            height={300}
                            style={{ width: "100%", height: "auto", objectFit: "contain" }}
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                      )}
                      {cat.price && (
                        <div style={{ position: "absolute", bottom: "clamp(10px, 2vw, 16px)", left: "clamp(10px, 2vw, 16px)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", color: "var(--forest)", borderRadius: 12, padding: "clamp(4px, 1vw, 6px) clamp(10px, 2.5vw, 16px)", fontWeight: 700, fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 10 }}>
                          {cat.price}
                        </div>
                      )}
                    </div>
                    <div className="card-body" style={{ zIndex: 1 }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1rem, 2.5vw, 1.1rem)", fontWeight: 700, color: "var(--white)", marginBottom: 10, lineHeight: 1.3 }}>
                        {cat.name.toUpperCase()}
                      </h3>
                      {cat.description && (
                        <p style={{ fontSize: "clamp(0.85rem, 2vw, 0.9rem)", color: "var(--muted-dark)", lineHeight: 1.6, marginBottom: 20, flexGrow: 1 }}>
                          {cat.description}
                        </p>
                      )}
                      <a
                        href={`${waLink}?text=Halo%20admin%20GREENLEAF%2C%20saya%20mau%20pesan%20*${encodeURIComponent(cat.name)}*%20(${encodeURIComponent(cat.price)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center", marginTop: "auto", fontSize: "clamp(0.85rem, 2.2vw, 0.9rem)", padding: "clamp(12px, 3vw, 14px) clamp(16px, 4vw, 20px)" }}
                      >
                        <WASvg /> Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#040b06", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 0" }}>
        <div className="c" style={{ textAlign: "left" }}>
          <p style={{ color: "var(--muted-dark)", fontSize: "0.85rem" }}>&copy; {new Date().getFullYear()} GREENLEAF Catering &amp; Dekor. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
