import { Metadata } from "next";
import { Suspense } from "react";
import HomeClient from "./page-client";

export const metadata: Metadata = {
  metadataBase: new URL("https://greenleaf-catering.vercel.app"),
  title: {
    default: "GREENLEAF Catering & Dekor | Nasi Box & Catering Salatiga",
    template: "%s | GREENLEAF Catering Salatiga",
  },
  description:
    "GREENLEAF Catering & Dekor Salatiga — spesialis nasi box, prasmanan, tumpeng, snack dus, hantaran, dan dekorasi tenda plafon. Berdiri sejak 2018. Menu fleksibel sesuai permintaan & budget. Hubungi kami sekarang!",
  keywords: [
    "catering salatiga",
    "nasi box salatiga",
    "prasmanan salatiga",
    "tumpeng salatiga",
    "greenleaf catering",
    "catering pernikahan salatiga",
    "dekorasi tenda salatiga",
    "catering syukuran salatiga",
    "nasi kotak salatiga",
    "snack dus salatiga",
    "catering murah salatiga",
    "catering hajatan salatiga",
    "hantaran salatiga",
    "bento nasi salatiga",
    "catering argomulyo salatiga",
    "hampers salatiga",
    "tumpeng mini salatiga",
    "catering jawa tengah",
    "nasi box murah salatiga",
    "catering 50 porsi salatiga",
  ],
  authors: [{ name: "GREENLEAF Catering & Dekor", url: "https://greenleaf-catering.vercel.app" }],
  creator: "GREENLEAF Catering & Dekor",
  publisher: "GREENLEAF Catering & Dekor",
  category: "Food & Beverage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "GREENLEAF Catering & Dekor | Nasi Box & Catering Salatiga",
    description:
      "Spesialis nasi box, prasmanan, tumpeng, snack dus, hantaran, dan dekorasi tenda plafon di Salatiga. Menu fleksibel, harga terjangkau, halal. Berdiri sejak 2018.",
    type: "website",
    locale: "id_ID",
    url: "https://greenleaf-catering.vercel.app",
    siteName: "GREENLEAF Catering & Dekor",
    images: [
      {
        url: "/og-food.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "GREENLEAF Catering & Dekor Salatiga - Menu Nasi Liwet & Nasi Box",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREENLEAF Catering & Dekor | Nasi Box Salatiga",
    description:
      "Spesialis nasi box, prasmanan, tumpeng, dan dekorasi di Salatiga. Menu fleksibel & halal.",
    images: ["/og-food.jpg"],
  },
  alternates: {
    canonical: "https://greenleaf-catering.vercel.app",
    languages: {
      id: "https://greenleaf-catering.vercel.app",
    },
  },
  verification: {
    google: "",
  },
  other: {
    "geo.region": "ID-JT",
    "geo.placename": "Salatiga, Jawa Tengah",
    "geo.position": "-7.356463;110.487572",
    "ICBM": "-7.356463, 110.487572",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#06140a" }} />}>
      <HomeClient />
    </Suspense>
  );
}
  