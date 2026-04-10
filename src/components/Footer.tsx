import React from "react";
import Link from "next/link";
import { LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6 md:px-20 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-20">
        {/* Logo and About */}
        <div className="md:col-span-2">
          <div className="text-2xl font-bold mb-6 tracking-tighter">JIYUAN CAPITAL</div>
          <p className="text-white/50 max-w-sm leading-relaxed">
            纪源资本成立于 2005 年，是一家专注于早期和成长期投资的领先风险投资公司。
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-medium mb-6 uppercase tracking-widest text-xs text-white/40">栏目</h4>
          <ul className="space-y-4">
            <li><Link href="/family" className="text-white/70 hover:text-white transition-colors">投资案例</Link></li>
            <li><Link href="/omega" className="text-white/70 hover:text-white transition-colors">OMEGA 计划</Link></li>
            <li><Link href="/#insights" className="text-white/70 hover:text-white transition-colors">行业洞察</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-medium mb-6 uppercase tracking-widest text-xs text-white/40">关注我们</h4>
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
        <div>© 2024 JIYUAN CAPITAL. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
          <Link href="/legal" className="hover:text-white transition-colors">法律声明</Link>
        </div>
      </div>
    </footer>
  );
}
