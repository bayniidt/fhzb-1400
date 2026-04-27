import type { Metadata } from "next";
import localFont from "next/font/local";

import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";


const sourceHanSans = localFont({
  src: [
    {
      path: "../../../public/font/SourceHanSansCN-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/font/SourceHanSansCN-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});



export const metadata: Metadata = {
  title: "峰壑资本俱乐部 | 共筑峰峦",
  description: "顶级数字门户、价值引擎与全球声望门户",
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${sourceHanSans.variable} font-sans bg-background text-foreground antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
