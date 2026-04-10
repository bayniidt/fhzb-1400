"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/philosophy", label: "峰壑哲学" },
  { href: "/os", label: "资本操作系统" },
  { href: "/galaxy", label: "峰壑星系" },
  { href: "/alliance", label: "共筑峰峦" },
  { href: "/vision", label: "峰壑视野" },
  { href: "/contact", label: "共筑峰峦入口" }
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

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
      className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-10 bg-[#050505]/60 backdrop-blur-md border-b min-w-[max-content] border-white/5"
    >
      <Link href="/" className="text-xl font-bold tracking-widest text-[#EDEDED]">FENGHE</Link>
      <div className="flex gap-8">
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
