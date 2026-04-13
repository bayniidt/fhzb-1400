"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full bg-[#000000] py-16 px-10 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-4 md:mb-0">© 2026 {t('峰壑资本。保留所有权利。', 'FH Capital. All Rights Reserved.')}</div>
        <div className="flex gap-6 text-sm">
          <Link href="/contact" className="hover:text-white">{t('联系我们', 'Contact Us')}</Link>
          <Link href="/philosophy" className="hover:text-white">{t('关于峰壑', 'About FH')}</Link>
        </div>
      </div>
    </footer>
  );
}
