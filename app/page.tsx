"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import content from "../data/content.json";

/* ─── SVG components ──────────────────────────────────── */
const LeafSVG = ({ size = 28, color = "#9ccb57", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 4-9 4-1.5 0-2 .5-2 1C11 9 11.5 9.5 12 9c.5 0 .5.5 0 .5" />
  </svg>
);

const WASvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.87 9.87 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const TrophySVG = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z" />
  </svg>
);

const ClockSVG = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PlateSVG = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/>
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/>
  </svg>
);

const HeartSVG = ({ size = 28, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarSVG = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PackageSVG = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15"/>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
  </svg>
);

const Wave = ({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) => (
  <div className="wave-wrap" style={{ backgroundColor: from, transform: flip ? "scaleX(-1)" : undefined }}>
    <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "72px" }}>
      <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={to} />
    </svg>
  </div>
);

/* ─── Main Page ─────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicMenu, setDynamicMenu] = useState<any[]>([]);

  /* ── scroll → navbar glass ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Drive sync ── */
  useEffect(() => {
    // 1. Fetch Menu Utama (dari API baru yang lebih rapi)
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDynamicMenu(data);
        }
      })
      .catch(() => {});

  }, []);

  /* ── Intersection Observer ── */
  const obsRef = useRef<IntersectionObserver | null>(null);
  const revealCb = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (!obsRef.current) {
      obsRef.current = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); obsRef.current?.unobserve(e.target); } }),
        { threshold: 0.1 }
      );
    }
    const animate = node.querySelectorAll(".r-up, .r-scale, .r-left, .r-right");
    animate.forEach((el) => obsRef.current!.observe(el));
  }, []);

  const waNumber = content.contact.whatsapp?.[0]?.replace(/\D/g, "") || "6281575757048";
  const waLink = `https://wa.me/${waNumber.startsWith("62") ? waNumber : "62" + waNumber.replace(/^0/, "")}`;

  /* ── Placeholder images ── */
  const FOOD_IMGS = [
    "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=800",
  ];

  const AVATARS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
  ];

  /* ═══════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className={`gl-nav${scrolled ? " stuck" : ""}`}>
        <div className="c nav-inner">
          <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/greenleaf-catering.png" alt="GREENLEAF Logo" width={80} height={80} style={{ objectFit: "contain" }} />
            <span className="nav-logo-text">
              GREEN<span style={{ color: "var(--lime)" }}>LEAF</span>
            </span>
          </Link>

          <ul className="hide-sm nav-links">
            {[["Beranda", "#hero"], ["Menu", "/menu"], ["Kenalan Yuk", "#tentang"], ["Visi & Misi", "#visimisi"], ["Kenapa Pilih Kami", "#keunggulan"], ["Cerita Manis", "#testimoni"], ["Kontak", "#kontak"]].map(([label, href]) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary hide-sm nav-cta">
            <WASvg /> Hubungi Kami
          </a>

          <button className="hide-lg hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-drawer">
            {[["Beranda", "#hero"], ["Menu", "/menu"], ["Kenalan Yuk", "#tentang"], ["Visi & Misi", "#visimisi"], ["Kenapa Pilih Kami", "#keunggulan"], ["Cerita Manis", "#testimoni"], ["Kontak", "#kontak"]].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setMobileOpen(false)}>
              <WASvg /> Hubungi via WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="hero" className="hero-section">
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "80vw", height: "80vw", borderRadius: "50%", background: "radial-gradient(circle, var(--lime-glow) 0%, transparent 70%)", filter: "blur(40px)", opacity: 0.8, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        
        <div ref={revealCb} className="c hero-content">
          <div className="hero-text-col">
            <div className="r-up badge badge-glass" style={{ marginBottom: 24, padding: "10px 24px", fontSize: "0.8rem", border: "1px solid rgba(156,203,87,0.3)", color: "var(--lime-light)" }}>
              <LeafSVG size={16} color="var(--lime)" /> Premium Catering &amp; Dekor Salatiga
            </div>

            <h1 className="r-up d1 hero-title" style={{ marginBottom: 24 }}>
              Sajian <span className="text-lime-gradient" style={{ fontStyle: "italic", fontWeight: 600 }}>Istimewa</span><br />
              Untuk Momen<br />
              Berharga.
            </h1>

            <p className="r-up d2 hero-desc" style={{ marginBottom: 40 }}>
              {content.hero.description}
            </p>

            <div className="r-up d3 hero-cta-group">
              <Link href="/menu" className="btn-primary" style={{ padding: "18px 36px", fontSize: "1rem" }}>
                Lihat Menu
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--white)", fontWeight: 600, fontSize: "1rem", transition: "color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <WASvg />
                </div>
                Konsultasi Gratis
              </a>
            </div>
            
            <div className="r-up d4 hero-motto">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--lime)", color: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <HeartSVG size={22} color="currentColor" />
              </div>
              <div style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--white)", fontWeight: 500, fontStyle: "italic", letterSpacing: "0.5px" }}>
                &ldquo;{content.hero.motto}&rdquo;
              </div>
            </div>
          </div>

          <div className="hide-sm hero-collage-wrapper r-scale d2">
            {/* Image 1: Tall / Pill shape on the right */}
            <div style={{ position: "absolute", top: 20, right: 20, width: 260, height: 400, borderRadius: 200, overflow: "hidden", border: "4px solid rgba(255,255,255,0.05)", animation: "lf 6s ease-in-out infinite", boxShadow: "0 30px 60px rgba(0,0,0,0.5)", zIndex: 2 }}>
              <Image src={FOOD_IMGS[0]} alt="GREENLEAF Catering" fill style={{ objectFit: "cover" }} priority />
            </div>

            {/* Image 2: Small overlapping circle */}
            <div style={{ position: "absolute", bottom: 60, right: 0, width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "4px solid rgba(156,203,87,0.3)", animation: "lf 8s ease-in-out infinite reverse", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", zIndex: 3 }}>
              <Image src={FOOD_IMGS[1]} alt="GREENLEAF Sajian" fill style={{ objectFit: "cover" }} />
            </div>

            {/* Image 3: Medium rounded rectangle on the left */}
            <div style={{ position: "absolute", top: 140, left: 0, width: 250, height: 320, borderRadius: 32, overflow: "hidden", border: "4px solid rgba(255,255,255,0.05)", animation: "lf 7s ease-in-out infinite 1s", boxShadow: "0 20px 50px rgba(0,0,0,0.4)", zIndex: 1 }}>
              <Image src={FOOD_IMGS[2]} alt="Tumpeng" fill style={{ objectFit: "cover" }} />
            </div>
            
            {/* Floating Glass Badge */}
            <div style={{ position: "absolute", bottom: 120, left: -20, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 24, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 16px 40px rgba(0,0,0,0.3)", animation: "lf 5s ease-in-out infinite", zIndex: 4 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrophySVG size={28} color="var(--forest)" />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: "var(--white)", fontSize: "1.2rem", letterSpacing: "0.5px" }}>8+ Tahun</div>
                <div style={{ color: "var(--lime-light)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Pengalaman Melayani</div>
              </div>
            </div>
          </div>

          <div className="hide-lg hero-mobile-fallback r-up d3">
            <Image src={FOOD_IMGS[0]} alt="GREENLEAF Catering" fill style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      {/* Wave */}
      <Wave from="var(--forest)" to="var(--lime)" />

      {/* ── STATS STRIP ─────────────────────────────────────── */}
      <div style={{ background: "var(--lime)" }}>
        <div className="c" ref={revealCb}>
          <div className="stats-grid">
            {[
              { num: "500+", label: "Acara Sukses", icon: <TrophySVG size={36} color="rgba(6,20,10,0.8)" /> },
              { num: "8+", label: "Tahun Melayani", icon: <ClockSVG size={36} color="rgba(6,20,10,0.8)" /> },
              { num: "32+", label: "Pilihan Menu", icon: <PlateSVG size={36} color="rgba(6,20,10,0.8)" /> },
              { num: "100%", label: "Kepuasan Klien", icon: <HeartSVG size={36} color="rgba(6,20,10,0.8)" /> },
            ].map((s, i) => (
              <div key={s.label} className={`stat-item r-up d${i + 1}`}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <Wave from="var(--lime)" to="var(--cream)" />

      {/* ── KENALAN YUK (About) ──────────────────────────────── */}
      <section id="tentang" className="section-pad" style={{ background: "var(--cream)" }}>
        <div className="c" ref={revealCb}>
          <div className="responsive-grid">
            {/* Left: image collage */}
            <div className="r-left" style={{ position: "relative" }}>
              {/* Main image */}
              <div style={{ borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 60px rgba(10,31,15,0.12)" }}>
                <Image src={FOOD_IMGS[1]} alt="GREENLEAF Catering Sajian" width={600} height={450} style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover" }} />
              </div>
              {/* Floating small image */}
              <div className="about-float-img">
                <Image src={FOOD_IMGS[2]} alt="Tumpeng GREENLEAF" width={220} height={220} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Green badge */}
              <div style={{ position: "absolute", top: 30, left: 30, background: "var(--white)", color: "var(--forest)", borderRadius: 50, padding: "12px 24px", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
                <LeafSVG size={18} color="var(--lime)" /> GREENLEAF Catering
              </div>
            </div>

            {/* Right: text */}
            <div>
              <div className="r-up badge badge-dark" style={{ marginBottom: 20 }}>Kenalan Yuk!</div>
              <h2 className="r-up d1 section-title" style={{ color: "var(--on-light)", marginBottom: 24 }}>
                Hadir untuk <br /><span style={{ color: "var(--lime-dark)" }}>Setiap Momen Spesial</span>
              </h2>
              <p className="r-up d2" style={{ color: "var(--muted-light)", lineHeight: 1.8, fontSize: "1.1rem", marginBottom: 40 }}>
                {content.about?.description || "GREENLEAF Catering & Dekor hadir untuk memenuhi segala kebutuhan konsumsi dan dekorasi acara Anda di Salatiga & sekitarnya. Berdiri sejak tahun 2018, kami siap melayani dari skala kecil hingga besar."}
              </p>

              {/* Services list */}
              <div className="r-up d3 features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px 20px", marginBottom: 48 }}>
                {content.features.items.map((item) => (
                  <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(156,203,87,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <LeafSVG size={14} color="var(--lime-dark)" />
                    </div>
                    <span style={{ fontSize: "1rem", color: "var(--on-light)", fontWeight: 600 }}>{item.title}</span>
                  </div>
                ))}
              </div>

              <div className="r-up d4 about-cta-group">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: "#22c55e", color: "white" }}><WASvg /> Konsultasi Gratis</a>
                <Link href="/menu" className="btn-secondary" style={{ color: "var(--forest)", borderColor: "rgba(10,31,15,0.2)" }}>Lihat Menu</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave */}
      <Wave from="var(--cream)" to="var(--forest)" />

      {/* ── VISI & MISI ─────────────────────────────────────── */}
      <section id="visimisi" className="section-pad" style={{ background: "var(--forest)" }}>
        <div className="c" ref={revealCb}>
          <div className="section-header">
            <div className="r-up badge badge-glass" style={{ marginBottom: 20 }}>Visi &amp; Misi</div>
            <h2 className="r-up d1 section-title" style={{ color: "var(--white)" }}>
              {content.visiMisi.title}
            </h2>
          </div>

          <div className="r-scale card-glass visi-card">
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--lime-glow)", border: "1px solid rgba(156,203,87,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <LeafSVG size={36} color="var(--lime)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--lime)", marginBottom: 12 }}>VISI</div>
              <p style={{ fontSize: "1.2rem", color: "var(--white)", lineHeight: 1.7, fontWeight: 300 }}>{content.visiMisi.visi.description}</p>
            </div>
          </div>

          <div className="features-grid">
            {content.visiMisi.misi.items.map((item, i) => (
              <div key={i} className={`r-scale d${i + 1} card-glass`} style={{ padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px)" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(156,203,87,0.15)", border: "1px solid rgba(156,203,87,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.5rem", color: "var(--lime)" }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1.3rem", color: "var(--white)", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--muted-dark)", lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <Wave from="var(--forest)" to="var(--cream)" />

      {/* ── KENAPA PILIH KAMI ────────────────────────────────── */}
      <section id="keunggulan" className="section-pad" style={{ background: "var(--cream)" }}>
        <div className="c" ref={revealCb}>
          <div className="section-header">
            <div className="r-up badge badge-dark" style={{ marginBottom: 20 }}>Kenapa Pilih Kami?</div>
            <h2 className="r-up d1 section-title" style={{ color: "var(--on-light)", marginBottom: 20 }}>
              {content.features.subtitle}
            </h2>
            <p className="r-up d2" style={{ color: "var(--muted-light)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8, fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)" }}>
              {content.features.description}
            </p>
          </div>

          <div className="features-grid">
            {content.features.items.map((feat, i) => (
              <div key={i} className={`r-scale d${(i % 4) + 1} card-light`} style={{ padding: "32px 24px" }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(156,203,87,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <LeafSVG size={28} color="var(--lime-dark)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.3rem", color: "var(--on-light)", marginBottom: 12 }}>{feat.title}</h3>
                <p style={{ fontSize: "1rem", color: "var(--muted-light)", lineHeight: 1.7 }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <Wave from="var(--cream)" to="var(--forest)" />

      {/* ── INTIP MENU (teaser) ──────────────────────────────── */}
      <section id="menu" className="section-pad" style={{ background: "var(--forest)" }}>
        <div className="c" ref={revealCb}>
          <div className="menu-section-header">
            <div>
              <div className="r-up badge badge-glass" style={{ marginBottom: 20 }}>Intip Menu</div>
              <h2 className="r-up d1 section-title" style={{ color: "var(--white)" }}>
                {content.menu.subtitle}
              </h2>
            </div>
            <Link href="/menu" className="r-up d2 btn-primary" style={{ flexShrink: 0 }}>
              Lihat Semua Menu →
            </Link>
          </div>

          {/* Horizontal scroll */}
          <div className="r-scale menu-track">
            {dynamicMenu.slice(0, 8).map((cat: any, idx: number) => (
              <div key={idx} className="menu-item">
                <div style={{ position: "relative", width: "100%", height: 200 }}>
                  {cat.images && cat.images.length > 0 ? (
                    <Image src={cat.images[0]} alt={cat.name} fill style={{ objectFit: "cover" }} sizes="280px" />
                  ) : (
                    <Image src={FOOD_IMGS[idx % FOOD_IMGS.length]} alt={cat.name} fill style={{ objectFit: "cover" }} sizes="280px" />
                  )}
                  {cat.price && (
                    <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", color: "var(--forest)", borderRadius: 12, padding: "6px 16px", fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                      {cat.price}
                    </div>
                  )}
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--white)", marginBottom: 8, lineHeight: 1.3 }}>{cat.name}</h3>
                  {cat.description && (
                    <p style={{ fontSize: "0.9rem", color: "var(--muted-dark)", lineHeight: 1.5, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1 }}>
                      {cat.description}
                    </p>
                  )}
                  <a href={`${waLink}?text=Halo%20saya%20mau%20pesan%20${encodeURIComponent(cat.name)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem", padding: "12px 16px", marginTop: "auto" }}>
                    <WASvg /> Pesan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <Wave from="var(--forest)" to="var(--cream)" />

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
<section id="testimoni" className="section-pad" style={{ background: "var(--cream)" }}>
         <div className="c" ref={revealCb}>
           <div className="section-header">
             <div className="r-up badge badge-dark" style={{ marginBottom: 20 }}>Cerita Manis dari Klien</div>
             <h2 className="r-up d1 section-title" style={{ color: "var(--on-light)" }}>
               Apa Kata Mereka
             </h2>
           </div>

           <div className="r-scale d2 testimonial-list">
             {/* Review 1 */}
             <div className="testimonial-card">
               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--white)" }}>PH</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, color: "var(--on-light)", fontSize: "1rem" }}>Pak HENDRO</div>
                   <div style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>Local Guide · 404 reviews · 537 photos</div>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                 {[...Array(5)].map((_, i) => (
                   <StarSVG key={i} size={16} color="var(--gold)" />
                 ))}
               </div>
               <p style={{ fontSize: "0.95rem", color: "var(--on-light)", lineHeight: 1.7, marginBottom: 8 }}>Saya cocok dengan rasanya.</p>
               <div style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>2 months ago</div>
             </div>

             {/* Review 2 */}
             <div className="testimonial-card">
               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--white)" }}>DN</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, color: "var(--on-light)", fontSize: "1rem" }}>Desi Natalia</div>
                   <div style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>4 reviews · 4 photos</div>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                 {[...Array(5)].map((_, i) => (
                   <StarSVG key={i} size={16} color="var(--gold)" />
                 ))}
               </div>
               <p style={{ fontSize: "0.95rem", color: "var(--on-light)", lineHeight: 1.7, marginBottom: 8 }}>Masakannya selalu fresh, enak mantep, biar cabe mahal sambelnya ga pelit di semua nasi box</p>
               <div style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>8 months ago</div>
             </div>

             {/* Review 3 */}
             <div className="testimonial-card">
               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--white)" }}>EH</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, color: "var(--on-light)", fontSize: "1rem" }}>Emi Handayani</div>
                   <div style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>7 reviews · 1 photo</div>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                 {[...Array(5)].map((_, i) => (
                   <StarSVG key={i} size={16} color="var(--gold)" />
                 ))}
               </div>
               <p style={{ fontSize: "0.95rem", color: "var(--on-light)", lineHeight: 1.7, marginBottom: 8 }}>The best services</p>
               <div style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>4 months ago</div>
             </div>

             {/* Review 4 */}
             <div style={{ background: "var(--white)", borderRadius: 24, padding: "32px", boxShadow: "0 4px 24px rgba(10,31,15,0.06)", border: "1px solid rgba(0,0,0,0.03)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--white)" }}>HP</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, color: "var(--on-light)", fontSize: "1rem" }}>Heni Puspitasari</div>
                   <div style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>3 reviews</div>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                 {[...Array(5)].map((_, i) => (
                   <StarSVG key={i} size={16} color="var(--gold)" />
                 ))}
               </div>
               <p style={{ fontSize: "0.95rem", color: "var(--on-light)", lineHeight: 1.7, marginBottom: 8 }}>It feels good, mak nyusssss👍 … <span style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>Translated by Google · See original (Malay)</span></p>
               <div style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>8 months ago</div>
             </div>

             {/* Review 5 */}
             <div style={{ background: "var(--white)", borderRadius: 24, padding: "32px", boxShadow: "0 4px 24px rgba(10,31,15,0.06)", border: "1px solid rgba(0,0,0,0.03)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                 <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                   <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--white)" }}>YP</span>
                 </div>
                 <div>
                   <div style={{ fontWeight: 700, color: "var(--on-light)", fontSize: "1rem" }}>Yolanda Pasya</div>
                   <div style={{ fontSize: "0.85rem", color: "var(--muted-light)" }}>6 reviews · 1 photo</div>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                 {[...Array(5)].map((_, i) => (
                   <StarSVG key={i} size={16} color="var(--gold)" />
                 ))}
               </div>
               <p style={{ fontSize: "0.95rem", color: "var(--on-light)", lineHeight: 1.7, marginBottom: 8 }}>When it comes to taste, there is no need to hesitate⭐️⭐️⭐️⭐️⭐️ <span style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>Translated by Google · See original (Malay)</span></p>
               <div style={{ fontSize: "0.8rem", color: "var(--muted-light)" }}>8 months ago</div>
             </div>
           </div>
         </div>
       </section>

       {/* ── LOKASI & KONTAK ──────────────────────────────────── */}
       <section id="kontak" className="section-pad" style={{ background: "var(--forest)" }}>
         <div className="c" ref={revealCb}>
           <div className="section-header">
             <div className="r-up badge badge-glass" style={{ marginBottom: 20 }}>Kunjungi Kami</div>
             <h2 className="r-up d1" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "var(--white)", lineHeight: 1.2 }}>
               Lokasi &amp; Kontak
             </h2>
           </div>

           <div className="contact-grid">
            <div className="r-left card-glass" style={{ padding: "32px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--lime-glow)", border: "1px solid rgba(156,203,87,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.4rem", color: "var(--white)" }}>Lokasi Produksi</h3>
              </div>
              <p style={{ color: "var(--muted-dark)", lineHeight: 1.8, marginBottom: 32, fontSize: "1.05rem" }}>
                {content.contact?.address || "Jln. Amarta RT04/01, Randuares Kumpulrejo, Jl. Amarta, Kumpulrejo, Kec. Argomulyo, Kota Salatiga, Jawa Tengah 50734, Indonesia"}
              </p>
               <div className="map-frame">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.9770925659886!2d110.48757227605014!3d-7.356463972383561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79216c4db0b1%3A0x8c2116c4e7368aae!2sGREENLEAF%20Catering%2C%20Nasi%20Box%20%26%20Dekorasi!5e0!3m2!1sen!2sid!4v1784997057067!5m2!1sen!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
               </div>
            </div>

            {/* Contact links */}
            <div className="r-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="card-glass" style={{ padding: "24px", display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <WASvg />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "1.1rem", marginBottom: 4 }}>WhatsApp</div>
                  <div style={{ color: "var(--muted-dark)", fontSize: "0.95rem" }}>{content.contact.whatsapp?.[0] || "081575757048"}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "var(--lime)", fontSize: "1.5rem" }}>→</span>
              </a>

              {content.contact.tiktok && (
                <a href={content.contact.tiktok} target="_blank" rel="noopener noreferrer" className="card-glass" style={{ padding: "32px", display: "flex", alignItems: "center", gap: 24, textDecoration: "none" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--white)"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.83a8.16 8.16 0 0 0 4.77 1.52V6.9a4.85 4.85 0 0 1-1-.21z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "1.1rem", marginBottom: 4 }}>TikTok</div>
                    <div style={{ color: "var(--muted-dark)", fontSize: "0.95rem" }}>@nasiboxsantap</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "var(--lime)", fontSize: "1.5rem" }}>→</span>
                </a>
              )}

              {content.contact.instagram && (
                <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="card-glass" style={{ padding: "32px", display: "flex", alignItems: "center", gap: 24, textDecoration: "none" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(168,85,247)" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="rgb(168,85,247)"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--white)", fontSize: "1.1rem", marginBottom: 4 }}>Desty Page / Katalog</div>
                    <div style={{ color: "var(--muted-dark)", fontSize: "0.95rem" }}>greenleaf_catering_salatiga</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: "var(--lime)", fontSize: "1.5rem" }}>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

       {/* ── CTA STRIP ────────────────────────────────────────── */}
       <div className="cta-strip">
        <div className="c cta-strip-inner" style={{ textAlign: "center" }} ref={revealCb}>
          <h2 className="r-up" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--forest)", marginBottom: 20 }}>
            Siap Wujudkan Acara Impian Anda?
          </h2>
          <p className="r-up d1" style={{ fontSize: "1.1rem", color: "rgba(6,20,10,0.8)", marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
            Konsultasikan menu &amp; dekorasi sesuai kebutuhan dan budget Anda. Admin kami siap membantu memberikan solusi terbaik!
          </p>
          <div className="r-up d2 cta-btn-row">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-dark">
              <WASvg /> Chat WhatsApp Sekarang
            </a>
            <Link href="/menu" className="btn-primary" style={{ background: "var(--white)", color: "var(--forest)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
              Lihat Semua Menu
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
       <footer className="site-footer">
         <div className="c">
           <div className="footer-grid">
             {/* Brand */}
             <div>
               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                 <Image src="/greenleaf-catering.png" alt="GREENLEAF Logo" width={40} height={40} style={{ objectFit: "contain" }} />
                 <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 700, color: "var(--white)" }}>GREEN<span style={{ color: "var(--lime)" }}>LEAF</span></span>
               </div>
               <p style={{ color: "var(--muted-dark)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 320, marginBottom: 24 }}>
                 Spesialis catering &amp; dekorasi di Salatiga. Menu bisa menyesuaikan permintaan dan budget Anda, kualitas terjamin.
               </p>
               <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem", padding: "12px 24px" }}>
                 <WASvg /> 081575757048
               </a>
             </div>

             {/* Links */}
             <div>
               <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", marginBottom: 24, fontSize: "1.1rem" }}>Navigasi</h4>
               <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                 {[["Beranda", "#hero"], ["Menu Lengkap", "/menu"], ["Galeri", "#galeri"], ["Kontak", "#kontak"]].map(([label, href]) => (
                   <li key={label}><a href={href} style={{ color: "var(--muted-dark)", fontSize: "0.95rem", transition: "color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-dark)")}>{label}</a></li>
                 ))}
               </ul>
             </div>

             {/* Social */}
             <div>
               <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--white)", marginBottom: 24, fontSize: "1.1rem" }}>Temukan Kami</h4>
               <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                 {content.contact.tiktok && (
                   <a href={content.contact.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-dark)", fontSize: "0.95rem", transition: "color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-dark)")}>TikTok</a>
                 )}
                 {content.contact.instagram && (
                   <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-dark)", fontSize: "0.95rem", transition: "color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-dark)")}>Desty Page</a>
                 )}
                 <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-dark)", fontSize: "0.95rem", transition: "color 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-dark)")}>WhatsApp</a>
               </div>
             </div>
           </div>

             <div className="footer-copyright">
             <p style={{ color: "var(--muted-dark)", fontSize: "0.85rem" }}>&copy; {new Date().getFullYear()} GREENLEAF Catering &amp; Dekor. All rights reserved.</p>
           </div>
         </div>
       </footer>
    </>
  );
}
