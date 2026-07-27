import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // ── Security Headers ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Mencegah clickjacking (website dimasukkan dalam iframe oleh hacker)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Mencegah browser menebak tipe konten (MIME sniffing attack)
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Mengaktifkan proteksi XSS bawaan browser
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Memaksa HTTPS selamanya (mencegah HTTP downgrade attack)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Membatasi informasi yang dikirim ke website lain saat klik link
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Membatasi akses ke fitur browser sensitif (kamera, GPS, dll)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Content Security Policy — mencegah script berbahaya dari luar
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // next.js memerlukan ini
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://drive.google.com https://lh3.googleusercontent.com https://i.pravatar.cc",
              "frame-src https://www.google.com", // untuk embed Google Maps
              "connect-src 'self' https://script.google.com https://docs.google.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
