"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/PageHero";
import { Counter } from "@/components/ui/Counter";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function OmegaPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-black">
        <PageHero 
          title={t("峰壑数据看板", "OMEGA PROGRAM")}
          subtitle={t("实时呈现生态总规模、成功案例、行业覆盖与网络活跃度。用动态可视化数据，让资本价值可量化、可信任。。", "The OMEGA Program, initiated by Fenghe Capital, aims to provide all-round support for early-stage entrepreneurs, growing alongside China's innovators.")}
          bgImage="/videos/背景图_3.jpg"
          language={language}
          fullScreen={false}
        />
        
        {/* Omega Stats */}
        <section id="dashboard" className="px-6 md:px-20 py-20 bg-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-[#b7893b]">
            <div>
              <div className="text-5xl font-light mb-2">
                <Counter value={300} suffix="+" />
              </div>
              <div className="text-white/50">{t("生态总规模", "Invested Projects")}</div>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">
                <Counter value={50} suffix="+" />
              </div>
              <div className="text-white/50">{t("覆盖行业", "Public Companies")}</div>
            </div>
            <div>
              <div className="text-5xl font-light mb-2">
                <Counter value={15} suffix="+" />
              </div>
              <div className="text-white/50">{t("区域网络活跃度", "Years of Experience")}</div>
            </div>
          </div>
        </section>

        {/* 数字通行证 (NFT Card Layout) */}
        <section id="pass" className="px-6 md:px-20 py-32 max-w-7xl mx-auto w-full">
          <motion.div 
            whileHover={{ rotateY: 5, rotateX: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-white/10 group shadow-[0_50px_100px_rgba(0,0,0,0.5)] perspective-1000"
          >
            <img
              src="/videos/背景图_4.jpg"
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 opacity-60"
              alt="Digital ID Background"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/80 p-12 flex flex-col justify-between">
              {/* Card Top */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="text-white/40 text-xs font-black tracking-[0.5em] uppercase">Digital Identity</span>
                  <div className="text-[#b7893b] font-serif text-3xl font-bold italic">NFT</div>
                </div>
                {/* 头像框 - Avatar Frame */}
                <div className="relative group/avatar">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center overflow-hidden relative z-10">
                    <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    {/* Placeholder for avatar */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-serif">峰</div>
                  </div>
                  <div className="absolute -inset-2 bg-[#b7893b]/20 rounded-full blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                  <div className="mt-6 text-right">
                    <div className="text-white font-bold tracking-widest text-xl">{t("峰壑共建者", "Fenghe Co-builder")}</div>
                    <div className="text-[#b7893b] text-xs font-mono mt-1 opacity-60">ID: FHXB-2026-8888</div>
                  </div>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                  <h3 className="text-5xl text-white font-serif font-light mb-4 drop-shadow-2xl">
                    {t("数字通行证", "Digital Pass")}
                  </h3>
                  <p className="text-white/60 font-light max-w-lg text-lg leading-relaxed">
                    {t("为会员、合伙人发行的基于区块链的数字身份/勋章，享受多重生态特权。", "Blockchain-based digital identities for members and partners with exclusive ecological privileges.")}
                  </p>
                </div>

                {/* 功能图标区 */}
                <div className="flex gap-8">
                  <div className="flex flex-col items-center gap-3 group/icon">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:bg-[#b7893b]/20 group-hover/icon:border-[#b7893b]/50 transition-all">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b7893b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                    </div>
                    <span className="text-white/60 text-xs font-bold tracking-widest uppercase">{t("链上验真", "Verification")}</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 group/icon">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/icon:bg-[#b7893b]/20 group-hover/icon:border-[#b7893b]/50 transition-all">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b7893b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                        <path d="M4 22h16"></path>
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                      </svg>
                    </div>
                    <span className="text-white/60 text-xs font-bold tracking-widest uppercase">{t("享受专属权益", "Exclusive Benefits")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        {/* 项目数字档案 (Project Digital Archives) */}
        <section id="archive" className="px-6 md:px-20 py-32 bg-white/[0.02] border-t border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[2px] bg-[#b7893b]"></span>
                  <span className="text-[#b7893b] text-xs font-bold tracking-[0.4em] uppercase">Phase 04</span>
                </div>
                <h2 className="text-4xl md:text-6xl text-white font-serif font-light mb-8 italic">
                  {t("项目数字档案", "Project Digital Archives")}
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                  {t("展示项目从0到1的“登峰路径”，对部分孵化项目的关键节点、里程碑进行加密存证展示。", "Display the 'Mounting Path' from 0 to 1, showcasing encrypted certificates of key nodes and milestones of incubation projects.")}
                </p>
              </div>
              <div className="text-right hidden md:block">
                <span className="text-[#b7893b] text-7xl font-serif italic opacity-10">0 TO 1</span>
              </div>
            </div>

            {/* 登峰路径展示 (Milestone Path) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "01", zh: "项目发起", en: "Initiation", desc_zh: "原始想法验证与种子轮融资存证", desc_en: "Idea validation & Seed funding" },
                { step: "02", zh: "关键里程碑", en: "Milestone", desc_zh: "核心产品发布与首批用户突破", desc_en: "MVP launch & Initial user growth" },
                { step: "03", zh: "资本加速", en: "Acceleration", desc_zh: "A轮融资完成与生态资源对齐", desc_en: "Series A & Eco alignment" },
                { step: "04", zh: "登峰上市", en: "IPO / Exit", desc_zh: "敲钟仪式记录与长期价值证明", desc_en: "Listing & Long-term value" },
              ].map((item, idx) => (
                <div key={idx} className="group relative p-8 bg-white/5 border border-white/10 hover:border-[#b7893b]/30 transition-all rounded-3xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-[#b7893b]/20 text-4xl font-serif group-hover:text-[#b7893b]/40 transition-colors">{item.step}</div>
                  <div className="relative z-10">
                    <h4 className="text-white font-bold text-xl mb-4">{t(item.zh, item.en)}</h4>
                    <p className="text-white/40 text-sm leading-relaxed mb-10">{t(item.desc_zh, item.desc_en)}</p>
                    <div className="flex items-center gap-2 text-[#b7893b] text-[10px] font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-[#b7893b] animate-pulse"></div>
                      SECURED HASH: 0x82...f92
                    </div>
                  </div>
                  {/* Decorative Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#b7893b]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

