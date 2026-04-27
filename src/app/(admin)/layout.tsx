import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

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
  title: "峰壑资本 | 后台管理系统",
  description: "峰壑资本官方网站内容管理系统",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${sourceHanSans.variable} font-sans bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
