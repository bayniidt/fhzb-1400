"use client";

import { useLanguage } from "@/context/LanguageContext"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { fetchContactInfo } from "@/lib/api"
import { CONTACT_SUB_ITEMS, NAV_LINKS } from "./Navbar"

interface FooterContact {
  id: number | string
  type: string
  value: string
  label_zh: string
  label_en: string
}

const DEFAULT_CONTACTS: FooterContact[] = [
  {
    id: "phone-default",
    type: "phone",
    value: "13681660460",
    label_zh: "联系电话",
    label_en: "Phone",
  },
  {
    id: "email-default",
    type: "email",
    value: "zhenyongwv@hotmail.com",
    label_zh: "电子邮箱",
    label_en: "Email",
  },
]

export function Footer() {
  const { t, language } = useLanguage();
  const [contacts, setContacts] = useState<FooterContact[]>(DEFAULT_CONTACTS)

  useEffect(() => {
    fetchContactInfo()
      .then((items: FooterContact[]) => {
        if (!Array.isArray(items) || items.length === 0) {
          setContacts(DEFAULT_CONTACTS)
          return
        }

        const normalized = items.map((item) => {
          if (item.type === "phone") {
            return { ...item, value: "13681660460" }
          }
          if (item.type === "email") {
            return { ...item, value: "zhenyongwv@hotmail.com" }
          }
          return item
        })

        setContacts(normalized)
      })
      .catch(() => {
        setContacts(DEFAULT_CONTACTS)
      })
  }, [])

  return (
    <footer className="w-full bg-[#000000] pt-24 pb-12 px-6 md:px-12 lg:px-20 border-t border-white/5 text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-x-8 gap-y-16 mb-24">
          {/* Column 1: Logo & Slogan */}
          <div className="col-span-1 flex flex-col">
            <div className="mb-12">
              <Link href="/" className="inline-block mb-8">
                <Image
                  src="/images/logo.png"
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
              {contacts.map((contact) => (
                <li key={contact.id} className="pt-2 border-t border-white/5 mt-2">
                  <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                    {language === 'zh' ? contact.label_zh : contact.label_en}
                  </div>
                  <div className="text-white/60 text-[13px] font-mono">
                    {contact.value}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/20 text-[10px] tracking-[0.1em] uppercase font-bold">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">浙ICP备2026025942号-1</a>
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
