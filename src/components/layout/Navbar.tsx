"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/philosophy", label: "峰壑哲学" },
  { href: "/os", label: "资本操作系统" },
  { href: "/galaxy", label: "峰壑星系" },
  { href: "/alliance", label: "共筑峰峦" },
  { href: "/vision", label: "峰壑视野" },
  { href: "/contact", label: "合作人口" }
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

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
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-10 bg-[#161616]/70 backdrop-blur-xl border-b border-white/10 group"
    >
      <Link href="/" className="text-2xl font-serif font-black tracking-[0.2em] text-[#ECECEC] hover:text-[#D4AF37] transition-colors">
        FENGHE
      </Link>
      <div className="flex gap-8">
        {NAV_LINKS.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group/item ${isActive ? 'text-[#D4AF37] font-bold' : 'text-gray-400 hover:text-[#D4AF37]'}`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover/item:scale-x-100'}`} />
            </Link>
          );
        })}
      </div>
      {/* 活跃的光晕效果 */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#D4AF37]/[0.02] pointer-events-none opacity-100" />
    </motion.nav>
  );
}
