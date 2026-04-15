import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Toko Obdal | Premium Ornamental Fish",
  description: "The premier destination for elite ornamental fish. Discover the ocean's most exquisite living jewels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={`${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
