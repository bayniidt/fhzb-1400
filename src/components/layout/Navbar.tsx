"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const NAV_LINKS = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/philosophy", zh: "峰壑哲学", en: "Philosophy" },
  { href: "/os", zh: "资本系统", en: "Capital O.S." },
  { href: "/galaxy", zh: "峰壑星系", en: "Galaxy" },
  { href: "/alliance", zh: "共筑峰峦", en: "Alliance" },
  { href: "/vision", zh: "峰壑视野", en: "Vision" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-6 md:px-10 bg-[#161616]/80 backdrop-blur-2xl border-b border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    >
      <Link href="/" className="group flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 border border-[#D4AF37] flex items-center justify-center rotate-45 group-hover:bg-[#D4AF37] transition-all duration-500">
           <div className="w-4 h-4 bg-[#D4AF37] group-hover:bg-black transition-colors -rotate-45" />
        </div>
        <span className="text-xl font-serif font-black tracking-[0.2em] text-[#ECECEC] group-hover:text-[#D4AF37] transition-all duration-500 hidden sm:block">
          FENGHE<span className="text-[#D4AF37] italic">.</span>
        </span>
      </Link>
      
      <div className="flex gap-0 md:gap-1 items-center">
        {NAV_LINKS.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`px-3 md:px-5 py-2 text-[11px] md:text-[13px] uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 relative group/item ${isActive ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-[#ECECEC]'}`}
            >
              <span className="relative z-10">{language === 'zh' ? link.zh : link.en}</span>
              
              <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.5)] ${isActive ? 'scale-x-75 opacity-100' : 'scale-x-0 opacity-0 group-hover/item:scale-x-50 group-hover/item:opacity-30'}`} />
              
              {isActive && (
                <motion.div 
                  layoutId="nav-active-bg" 
                  className="absolute inset-0 bg-[#D4AF37]/5 rounded-sm -z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button 
          onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          className="text-[10px] md:text-[12px] font-bold tracking-widest text-gray-400 hover:text-[#D4AF37] transition-colors border border-white/10 px-2 py-1 min-w-[3.5rem]"
        >
          {language === 'zh' ? 'EN' : '中文'}
        </button>

        <Link href="/contact" className="group relative px-4 md:px-6 py-2 overflow-hidden border border-[#D4AF37]/40 hidden sm:block">
           <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
           <span className={`relative z-10 text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${pathname === '/contact' ? 'text-black' : 'text-[#D4AF37] group-hover:text-black'}`}>
             {t('联系我们', 'Join Us')}
           </span>
           {pathname === '/contact' && <div className="absolute inset-0 bg-[#D4AF37] z-0" />}
        </Link>
      </div>
    </motion.nav>
  );
}
