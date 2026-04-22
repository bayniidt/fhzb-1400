"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, CONTACT_SUB_ITEMS } from "./Navbar";

export function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="w-full bg-[#000000] pt-24 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/5 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-x-8 gap-y-16 mb-24">
          {/* Column 1: Logo & Slogan */}
          <div className="col-span-1 flex flex-col">
            <div className="mb-12">
              <Link href="/" className="inline-block mb-8">
                <Image
                  src="/fhzb-1400/images/logo.png"
                  alt="FH Capital Logo"
                  width={140}
                  height={40}
                  className="brightness-0 invert object-contain opacity-80"
                />
              </Link>
              <p className="text-white/40 text-[13px] leading-relaxed max-w-[160px]">
                {language === 'zh' 
                  ? "资本遇见雄心，我们共筑峰峦。" 
                  : "Where Capital Meets Ambition, We Build Summits."}
              </p>
            </div>
          </div>

          {/* Navigation Columns 2-8 */}
          {NAV_LINKS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-8">
              <h4 className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase">
                {language === 'zh' ? section.zh : section.en}
              </h4>
              <ul className="flex flex-col gap-5">
                {section.subItems?.map((item, sIdx) => (
                  <li key={sIdx}>
                    <Link 
                      href={item.href} 
                      className="text-white/50 hover:text-[#b7893b] transition-colors text-[13px] font-light leading-snug"
                    >
                      {language === 'zh' ? item.zh : item.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 9: Contact (Move back to right) */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase">
              {language === 'zh' ? "合作入口" : "COOPERATION"}
            </h4>
            <ul className="flex flex-col gap-5">
              {CONTACT_SUB_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-white/50 hover:text-[#b7893b] transition-colors text-[13px] font-light whitespace-nowrap"
                  >
                    {language === 'zh' ? item.zh : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/20 text-[10px] tracking-[0.1em] uppercase font-bold">
            © 2026 {t('峰壑资本。保留所有权利。', 'FH CAPITAL. ALL RIGHTS RESERVED.')}
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-white/20 hover:text-white transition-colors text-[10px] tracking-[0.1em] uppercase font-bold">
              {t('隐私政策', 'PRIVACY POLICY')}
            </Link>
            <Link href="/terms" className="text-white/20 hover:text-white transition-colors text-[10px] tracking-[0.1em] uppercase font-bold">
              {t('服务条款', 'TERMS OF SERVICE')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
