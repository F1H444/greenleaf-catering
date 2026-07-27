import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://greenleaf-catering.vercel.app"; // ganti ke domain asli jika sudah custom

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  authors: [{ name: "GREENLEAF Catering & Dekor", url: BASE_URL }],
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
      "Spesialis nasi box, prasmanan, tumpeng, dan dekorasi tenda plafon di Salatiga. Menu fleksibel, harga terjangkau, halal. Berdiri sejak 2018.",
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "GREENLEAF Catering & Dekor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GREENLEAF Catering & Dekor Salatiga - Nasi Box, Prasmanan, Tumpeng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREENLEAF Catering & Dekor | Nasi Box Salatiga",
    description:
      "Spesialis nasi box, prasmanan, tumpeng, dan dekorasi di Salatiga. Menu fleksibel & halal.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "", // isi dengan kode verifikasi Google Search Console
  },
  other: {
    "geo.region": "ID-JT",
    "geo.placename": "Salatiga, Jawa Tengah",
    "geo.position": "-7.356463;110.487572",
    "ICBM": "-7.356463, 110.487572",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Local Business Schema — meningkatkan peluang muncul di Google Maps & Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              name: "GREENLEAF Catering & Dekor",
              description:
                "Spesialis nasi box, prasmanan, tumpeng, snack dus, hantaran, dan dekorasi tenda plafon di Salatiga.",
              url: BASE_URL,
              telephone: "+6281575757048",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jln. Amarta RT04/01 Randuares Kumpulrejo",
                addressLocality: "Argomulyo",
                addressRegion: "Jawa Tengah",
                postalCode: "50734",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -7.356463,
                longitude: 110.487572,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "07:00",
                closes: "21:00",
              },
              priceRange: "Rp 15.000 - Rp 2.000.000",
              servesCuisine: "Indonesian",
              hasMap: "https://maps.app.goo.gl/greenleaf-catering-salatiga",
              foundingDate: "2018",
              areaServed: {
                "@type": "City",
                name: "Salatiga",
              },
              sameAs: [
                "https://www.tiktok.com/@nasiboxsantap",
                "https://desty.page/greenleaf_catering_salatiga",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
