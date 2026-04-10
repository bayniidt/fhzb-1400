"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function OS() {
  const { t, language } = useLanguage();
  const [activeStage, setActiveStage] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stages = [
    { 
      id: "fund", 
      zh: "建基", 
      en: "FOUNDATION", 
      title_zh: "基石基金与盲池逻辑", 
      title_en: "Cornerstone Fund & Blind Pool Logic",
      desc_zh: "摒弃项目制散养，通过超10亿级基石基金锁定产业筹码，确保资本在不确定周期中的绝对掌控力。",
      desc_en: "Rejecting project-based decentralization, we secure industrial chips through 1B+ cornerstone funds, ensuring absolute control in uncertain cycles.",
      tools: ["LP 同盟网络", "资产安全隔离", "穿透式风控"]
    },
    { 
      id: "invest", 
      zh: "极研", 
      en: "GEEK RESEARCH", 
      title_zh: "第一性原理尽调系统", 
      title_en: "First Principles DD System",
      desc_zh: "穿透PPT与财务修饰，直抵技术底层与产业终局。我们不听故事，只推演生产力爆发的数学基准。",
      desc_en: "Penetrating PPT and financial window-dressing to reach technical foundations and industrial endgames. We don't listen to stories; we calculate mathematical productivity.",
      tools: ["技术溯源分析", "创始团队建模", "周期波动模拟"]
    },
    { 
      id: "manage", 
      zh: "陪跑", 
      en: "ASCENT SUPPORT", 
      title_zh: "深度赋能与模型重构", 
      title_en: "Deep Empowerment & Re-modeling",
      desc_zh: "派驻“影子CEO”级合伙人，在组织治理、极核裂变与资本路径上进行手术刀式干预，纠偏航向。",
      desc_en: "Deploying 'Shadow CEO' level partners to perform surgical interventions in governance, core fission, and capital paths.",
      tools: ["OKR 极核对齐", "全球牌照接驳", "生态资源灌溉"]
    },
    { 
      id: "exit", 
      zh: "登阶", 
      en: "UPGRADE", 
      title_zh: "上市合规与跨区域裂变", 
      title_en: "IPO Compliance & Cross-border Fission",
      desc_zh: "不仅是拿钱离场。通过合伙人系统，将被投企业转化为新的生态节点，实现从‘孤岛’到‘版图’的升维。",
      desc_en: "More than just an exit. Through our partner system, portfolio companies transform into new ecosystem nodes, evolving from 'islands' into 'territories'.",
      tools: ["并购重组套利", "全球交易所通兑", "节点再投资"]
    }
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-background w-full relative">
        {/* Header区 */}
        <section className="relative pt-60 pb-40 border-b border-white/5 overflow-hidden">
           <img 
             src="/fhzb-1400/videos/股市_2.jpg" 
             className="absolute inset-0 w-full h-full object-cover"
             alt="OS Header Background"
           />
           
           <div className="max-w-7xl mx-auto px-10 relative z-20">
             <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8 relative z-10">Ascent Operating System</span>
             <h1 className={`font-serif font-black text-white tracking-tighter mb-8 relative z-10 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}>
               {t('攀登系统', 'Operating System')}
             </h1>
             <p className={`font-serif text-white/90 font-light max-w-3xl leading-relaxed relative z-10 drop-shadow-lg ${language === 'zh' ? 'text-2xl' : 'text-xl md:text-2xl'}`}>
               {t('我们不依赖运气或直觉。', 'We don’t rely on luck or intuition.')}<br/>
               {t('峰壑资本通过一套闭环的', 'FH Capital is driven by a closed-loop')}<br />
               <span className="text-white font-medium">{t('资本操作系统，', 'Capital Operating System,')}</span> {t('驱动实业与资本的确定性增长。', 'driving deterministic growth.')}
             </p>
           </div>
        </section>

        {/* 交互阶段区 */}
        <section className="py-32 px-10 max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* 左侧：步骤导航 */}
              <div className="lg:col-span-4 space-y-4">
                 {stages.map((stage, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveStage(idx)}
                      className={`w-full text-left p-8 border transition-all duration-500 group relative overflow-hidden ${activeStage === idx ? 'bg-[#D4AF37]/5 border-[#D4AF37]' : 'border-white/5 hover:border-white/20'}`}
                    >
                       {activeStage === idx && <div className="absolute left-0 top-0 h-full w-[2px] bg-[#D4AF37]" />}
                       <div className="flex justify-between items-center mb-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStage === idx ? 'text-[#D4AF37]' : 'text-gray-600'}`}>{stage.en}</span>
                          <span className={`text-xl font-serif ${activeStage === idx ? 'text-white' : 'text-gray-700'}`}>0{idx + 1}</span>
                       </div>
                       <h3 className={`text-2xl font-serif transition-colors ${activeStage === idx ? 'text-[#ECECEC]' : 'text-gray-500'}`}>{language === 'zh' ? stage.zh : stage.en}</h3>
                    </button>
                 ))}
              </div>

              {/* 右侧：详细内容 */}
              <div className="lg:col-span-8 bg-surface border border-white/5 p-12 lg:p-20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-10 opacity-5">
                    <span className="text-[12rem] font-serif font-black">{activeStage + 1}</span>
                 </div>
                 
                 <div className="relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-serif text-white mb-10 leading-tight">
                      {language === 'zh' ? stages[activeStage].title_zh : stages[activeStage].title_en}
                    </h2>
                    <p className="text-xl text-gray-400 font-light leading-relaxed mb-16 max-w-2xl">
                      {language === 'zh' ? stages[activeStage].desc_zh : stages[activeStage].desc_en}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {stages[activeStage].tools.map((tool, i) => (
                          <div key={i} className="bg-black/40 border border-white/10 p-6 flex flex-col gap-4">
                             <div className="w-8 h-[1px] bg-[#D4AF37]" />
                             <span className="text-sm text-gray-300 font-medium">{tool}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 底部全景区 */}
        <section className="py-40 bg-white/5 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-10 text-center">
              <span className="text-[#D4AF37] uppercase tracking-[0.6em] font-bold text-xs mb-10 block">Full Access Library</span>
              <h2 className={`font-serif text-white mb-16 ${language === 'zh' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'}`}>
                {t('进入后台：', 'Backend:')} <br/>
                <span className="text-[#D4AF37] italic font-serif font-light">{t('第一性原理数据室', 'First Principles Data Room')}</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                 {/* 模拟文档文件 */}
                 {[
                   { format: "PDF", zh: "合规整改手册_2026战略版 (节选)", en: "Compliance Manual 2026 (Excerpts)" },
                   { format: "EXCEL", zh: "三张表自动化测算穿透模型_V4.2", en: "Automated Trilateral Projections V4.2" },
                   { format: "PPT", zh: "全球化路演核心逻辑结构模板", en: "Global Roadshow Logic Template" },
                   { format: "DOC", zh: "反摊薄与优先清算协议标准范式", en: "Anti-dilution and Liquidation Standards" },
                   { format: "VIDEO", zh: "敲钟前夜：保荐机构内部推演实录", en: "Eve of IPO: Internal Simulation Records" },
                   { format: "PDF", zh: "产业赋能前置的尽调白皮书", en: "Due Diligence Whitepaper: Industry First" },
                 ].map((doc, idx) => (
                    <div key={idx} className="bg-surface/50 border border-white/5 p-8 flex flex-col justify-between h-48 hover:bg-white/5 transition-all">
                       <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-gray-500 font-bold text-xs tracking-wider">
                         {doc.format}
                       </div>
                       <p className="text-white font-medium line-clamp-2">{language === 'zh' ? doc.zh : doc.en}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </PageTransition>
  );
}
