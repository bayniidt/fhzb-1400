import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const noto = Noto_Sans_SC({ 
  subsets: ["latin"], 
  weight: ['400', '700'],
  variable: '--font-sans' 
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
      <body className={`${noto.variable} font-sans bg-background text-foreground antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
