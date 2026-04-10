import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "峰壑资本俱乐部 | 共筑峰峦",
  description: "顶级数字门户、价值引擎与全球声望门户",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
