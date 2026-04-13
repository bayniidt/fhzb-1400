"use client"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import Image from "next/image" // 1. 引入组件
import logoFile from "../../public/images/logo.png"; 

const NAV_LINKS = [
  { href: "/", zh: "首页", en: "HOME" },
  { href: "/philosophy", zh: "峰壑哲学", en: "PHILOSOPHY" },
  { href: "/os", zh: "资本系统", en: "CAPITAL O.S." },
  { href: "/galaxy", zh: "峰壑星系", en: "GALAXY" },
  { href: "/alliance", zh: "共筑峰峦", en: "ALLIANCE" },
  { href: "/vision", zh: "峰壑视野", en: "VISION" },
  { href: "/omega", zh: "数字峰壑", en: "GALLERY" },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 inset-x-0 h-20 z-[60] flex items-center justify-between px-6 md:px-12 bg-black/80 backdrop-blur-2xl border-b border-[#b7893b]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <Link href="/" className="group flex items-center shrink-0" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/fhzb-1400/images/logo.png"
            alt="logo"
            width={180}   
            height={50}  
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 md:gap-4 ml-auto">
          <div className="flex gap-0 md:gap-1 items-center">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 md:px-4 py-2 text-[13px] md:text-[15px] font-bold tracking-[0.05em] transition-all duration-500 relative group/item whitespace-nowrap ${isActive ? 'text-[#b7893b]' : 'text-white hover:text-[#b7893b]'}`}
                >
                  <span className="relative z-10">{language === 'zh' ? link.zh : link.en}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#b7893b] shadow-[0_0_8px_rgba(183,137,59,0.6)]"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="h-4 w-[1px] bg-white/20 mx-2" />

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="text-[12px] md:text-[14px] font-bold tracking-widest text-white hover:text-[#b7893b] transition-colors"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>
            <div className="h-4 w-[1px] bg-white/20" />
            <Link href="/contact" className="text-[12px] md:text-[14px] font-bold tracking-widest text-white hover:text-[#b7893b] transition-colors">
              {t('联系我们', 'JOIN US')}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="text-[14px] font-bold text-white"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black pt-24 px-8 lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-bold tracking-widest transition-colors ${pathname === link.href ? 'text-[#b7893b]' : 'text-white'}`}
                  >
                    {language === 'zh' ? link.zh : link.en}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-4 pt-10 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-[#b7893b] tracking-widest"
                >
                  {t('联系我们', 'JOIN US')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

