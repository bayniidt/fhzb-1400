"use client";

import { CloseIcon, HamburgerIcon, LogoIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { name: "关于我们", href: "/#about", label: "About" },
  { name: "投资案例", href: "/family", label: "Portfolios" },
  { name: "投资哲学", href: "/#philosophy", label: "Philosophy" },
  { name: "峰壑数据看板", href: "/omega", label: "OMEGA" },
  { name: "行业洞察", href: "/#insights", label: "Insights" },
  // { name: "联系我们", href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ease-out px-6 md:px-10 flex items-center justify-between",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <LogoIcon className="h-10 w-auto text-white" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-lg font-medium text-white hover:opacity-70 transition-all"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-10 md:hidden">
          <button
            className="absolute top-4 right-6 text-white p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <CloseIcon />
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-3xl font-light text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
