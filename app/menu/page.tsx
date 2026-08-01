import { Metadata } from "next";
import { Suspense } from "react";
import MenuClient from "./page-client";

export const metadata: Metadata = {
  title: "Menu & Layanan",
  description:
    "Lihat daftar lengkap menu GREENLEAF Catering Salatiga: nasi box, prasmanan, tumpeng, snack dus, hantaran, dekorasi tenda plafon. Harga mulai Rp 15.000. Chat admin untuk pemesanan.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu & Layanan | GREENLEAF Catering Salatiga",
    description:
      "Daftar lengkap menu istimewa GREENLEAF Catering Salatiga untuk acara Anda.",
    url: "/menu",
    type: "website",
    siteName: "GREENLEAF Catering & Dekor",
    images: [
      {
        url: "/og-food.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Menu & Layanan GREENLEAF Catering Salatiga - Nasi Liwet & Nasi Box",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu & Layanan | GREENLEAF Catering Salatiga",
    description:
      "Daftar lengkap menu istimewa GREENLEAF Catering Salatiga untuk acara Anda.",
    images: ["/og-food.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#06140a" }} />}>
      <MenuClient />
    </Suspense>
  );
}
