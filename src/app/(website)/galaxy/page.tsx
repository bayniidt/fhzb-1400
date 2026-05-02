"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { fetchContent } from "@/lib/api";
import {
  websiteHeroSubtitleClassName,
  websiteHeroTitleClassName,
} from "@/lib/website-typography";

export default function Galaxy() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [siteContent, setSiteContent] = useState<any>(null);

  useEffect(() => {
    fetchContent().then(setSiteContent);
  }, []);

  const getContent = (key: string, fallbackZh: string, fallbackEn: string) => {
    if (!siteContent || !siteContent[key]) return language === 'zh' ? fallbackZh : fallbackEn;
    return language === 'zh' ? siteContent[key].zh : siteContent[key].en;
  };

  const [activeRegion, setActiveRegion] = useState<number | null>(null);

  const hqRoles = [
    { zh: "标准制定者", en: "Standards Architect", desc_zh: "构建资本准入与模型审计的终极标尺，确保整张星系图谱的无缝融合与代码统一。", desc_en: "Constructing ultimate benchmarks for capital entry and model audits, ensuring seamless integration." },
    { zh: "资源赋能者", en: "Resource Enabler", desc_zh: "自顶向下倾泻极核级产业资源、并购模型与大体量基石基金阵列。", desc_en: "Pouring down industry resources, M&A models, and massive cornerstone fund arrays." },
    { zh: "生态连接者", en: "Ecosystem Connector", desc_zh: "打破信息孤岛，撮合跨界共生，成为创新经济网络中的超级路由器。", desc_en: "Breaking information silos, matching cross-border synergies as a super router." },
    { zh: "品牌塑造者", en: "Brand Shaper", desc_zh: "为矩阵内的标的公司打上代表了绝对信任与顶级专业度的白名单烙印。", desc_en: "Branding portfolio companies with absolute trust and top-tier professionalism." },
    { zh: "风险守护者", en: "Risk Guardian", desc_zh: "悬崖边的最后一道保险带，以极端悲观主义视角预判周期危机并对冲闭环。", desc_en: "The final safety belt, predicting and hedging systemic crises with extreme realism." },
  ];

  const regions = [
    { id: 1, zh: "华南极核 / 深圳", en: "South China / Shenzhen", label_zh: "大湾区资本枢纽", label_en: "GBA Capital Hub", coord: "bottom-[20%] right-[30%]" },
    { id: 2, zh: "华东极核 / 上海", en: "East China / Shanghai", label_zh: "长三角生态动脉", label_en: "YRD Ecosystem Artery", coord: "top-[40%] right-[25%]" },
    { id: 3, zh: "西南极核 / 成都", en: "Southwest / Chengdu", label_zh: "新质生产力跳板", label_en: "Productivity Lever", coord: "bottom-[35%] left-[45%]" },
    { id: 4, zh: "华北前哨 / 北京", en: "North China / Beijing", label_zh: "政商顶层架构矩阵", label_en: "Policy Matrix", coord: "top-[25%] right-[35%]" },
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-[#050505]">
        
        {/* 模块一：总部 · 中央引擎 */}
        <section id="engine" className="relative min-h-[120vh] flex flex-col justify-center border-b border-white/5 pt-32 overflow-hidden">
           <img 
             src={getContent('gal_hero_bg', "/fhzb/videos/背景图_4.jpg", "/fhzb/videos/背景图_4.jpg")} 
             className="absolute inset-0 w-full h-full object-cover"
             alt="Galaxy Header Background"
           />
           
           <div className="absolute inset-0 z-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#b7893b]/10 via-transparent to-transparent animate-pulse delay-1000 duration-[4000ms] rounded-full mix-blend-screen pointer-events-none"></div>
           </div>
 
           <div className="relative z-20 max-w-7xl mx-auto px-10 w-full mb-32 text-center md:text-left">
              <span className="text-[#e8960a] uppercase tracking-[0.3em] font-bold text-sm block mb-6 px-1 border-l-2 border-[#b7893b]">{t('总部', 'HEADQUARTERS')}</span>
              <h1 className={websiteHeroTitleClassName(language, "mb-10 max-w-4xl font-black")}>
                 {getContent('gal_hero_title', '总部 · 中央引擎', 'HQ · Central Engine')}
              </h1>
              <p className={websiteHeroSubtitleClassName(language, "max-w-2xl text-white/80")}>
                 {getContent('gal_hero_subtitle', '并非简单的发号施令，而是向整张生态星系高频倾泻算力、共识与资源。', 'Not just giving orders, but continuously pouring computing power, consensus, and resources into the entire ecosystem galaxy.')}
              </p>
           </div>

           <div className="relative z-20 max-w-7xl mx-auto px-10 w-full ">
              <div className="grid grid-cols-1 md:grid-cols-5 border-t border-b border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 group/parent bg-black/10 backdrop-blur-sm">
                 {hqRoles.map((role, idx) => (
                    <div 
                      key={idx} 
                      className="px-8 py-16 flex flex-col justify-start relative group hover:bg-black/60 transition-all duration-500 overflow-hidden border border-transparent hover:border-[#b7893b]/30"
                    >
                       <span className="text-[#e8960a] text-6xl font-serif block mb-8 group-hover:text-[#b7893b] transition-colors opacity-100 group-hover:scale-110 origin-left duration-500">0{idx+1}</span>
                       <h3 className={`font-bold text-white mb-6 group-hover:text-[#b7893b] transition-colors ${language === 'zh' ? 'text-2xl' : 'text-lg md:text-xl'}`}>
                         {language === 'zh' ? role.zh : role.en}
                       </h3>
                       <p className="text-white/80 text-sm leading-loose group-hover:text-white transition-all duration-500">
                         {language === 'zh' ? role.desc_zh : role.desc_en}
                       </p>
                       <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b7893b] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 模块二：区域俱乐部 · 星罗棋布 */}
        <Section id="clubs" className="bg-[#000000] !py-0 border-b border-white/5 flex flex-col lg:flex-row min-h-screen">
            <div className="w-full lg:w-2/3 relative min-h-[60vh] lg:min-h-screen border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                <img 
                  src="/fhzb/videos/背景图_3.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Galaxy Map Background"
                />
                <div className="absolute inset-0 bg-[#000000]/20 z-0"></div>
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] z-10"></div>
               
               <div className="absolute inset-0 z-20">
                  {regions.map((region) => (
                    <div 
                      key={region.id}
                      onMouseEnter={() => setActiveRegion(region.id)}
                      onMouseLeave={() => setActiveRegion(null)}
                      className={`absolute flex items-center gap-4 cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 ${region.coord} group z-30`}
                    >
                       <div className="relative flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${activeRegion === region.id ? 'bg-[#b7893b]' : 'bg-white/40'}`}></div>
                          <div className={`absolute w-12 h-12 rounded-full border border-white/20 scale-0 group-hover:scale-100 group-hover:animate-ping transition-transform duration-700`}></div>
                       </div>
                       <div className={`transition-all duration-500 ${activeRegion === region.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                          <p className="text-white font-medium text-lg whitespace-nowrap drop-shadow-md">{language === 'zh' ? region.zh : region.en}</p>
                          <p className="text-[#b7893b] text-xs font-bold tracking-widest uppercase">{language === 'zh' ? region.label_zh : region.label_en}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col h-screen overflow-y-auto bg-[#070707]">
               <div className="p-10 lg:p-16 border-b border-white/10 sticky top-0 bg-[#050505]/90 backdrop-blur z-20">
                  <h2 className="text-3xl lg:text-4xl font-light text-[#FFFFFF] mb-4">{t('区域俱乐部阵列', 'Regional Club Matrix')}</h2>
                  <p className="text-white">{t('深入当地实业土壤的地推引擎。', 'Engines deeply rooted in local industrial soils.')}</p>
               </div>
               <div className="flex flex-col flex-1 divide-y divide-white/5 relative z-10">
                 {regions.map((region) => (
                    <div 
                      key={region.id}
                      onMouseEnter={() => setActiveRegion(region.id)}
                      onMouseLeave={() => setActiveRegion(null)}
                      className={`p-10 lg:p-16 transition-colors duration-500 ${activeRegion === region.id ? 'bg-[#111]' : 'hover:bg-[#0a0a0a]'}`}
                    >
                       <div className="flex justify-between items-start mb-8">
                         <h3 className={`text-2xl font-medium transition-colors ${activeRegion === region.id ? 'text-[#b7893b]' : 'text-white'}`}>
                           {language === 'zh' ? region.zh : region.en}
                         </h3>
                         <span className="text-white/20 font-serif italic pb-1 border-b border-white/10">0{region.id}</span>
                       </div>
                       <p className="text-white mb-8 max-w-sm line-clamp-3">
                         {t('独占区域生态高地，共享极核算力。负责执行从优质资产圈选到当地政商协同的基础底座运营。', 'Occupying regional ecosystem heights, sharing core computing power. Managing operations from asset selection to local coordination.')}
                       </p>
                       <Link href={`#club-${region.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#FFFFFF] hover:text-[#b7893b] transition-colors">
                          {t('进入俱乐部专站', 'Enter Club Portal')} 
                          <span className="bg-[#b7893b] text-black w-4 h-4 flex items-center justify-center rounded-full font-bold">&rarr;</span>
                       </Link>
                    </div>
                 ))}
               </div>
            </div>
        </Section>

        {/* 模块三：协同网络矩阵 (机构 Logo 墙阵列) */}
        <Section id="network" className="bg-[#050505] !py-32 px-6">
           <div className="max-w-7xl mx-auto w-full text-center">
              <h2 className="text-sm tracking-[0.3em] font-bold text-white uppercase mb-4">Synergy Matrix</h2>
              <div className="text-4xl md:text-5xl font-light text-[#FFFFFF] mb-6">{t('超级协同网络', 'Super Synergy Network')}</div>
              <p className="text-xl text-white font-light max-w-3xl mx-auto mb-20 leading-relaxed">
                {t('建立在垂直授权体系之上的平权共识网络。我们与拥有同样审美准则的全球顶尖律所、审计与保荐机构背靠背作战。', 'A consensus network built on vertical authority. Working back-to-back with global law, audit, and sponsor firms.')}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
                 {Array.from({ length: 15 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#050505] h-32 flex items-center justify-center group hover:bg-[#0a0a0a] transition-all"
                    >
                       <span className="text-white/20 font-bold uppercase tracking-widest text-sm group-hover:text-white/60 transition-colors">
                          {t('合作伙伴', 'Partner')} {String.fromCharCode(65 + idx)}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </Section>

        {/* 模块四：加入星系 CTA */}
        <Section id="join" className="bg-[#020202] !min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden px-6">
           <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#b7893b]/50 to-transparent top-1/2 -translate-y-1/2"></div>
             <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-[#b7893b]/50 to-transparent left-1/2 -translate-x-1/2"></div>
           </div>

           <div className="relative z-10 text-center max-w-4xl px-6">
              <h2 className={`font-black text-[#FFFFFF] tracking-tighter mb-12 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] ${language === 'zh' ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl leading-tight'}`}>
                 {getContent('gal_cta_title', '占领极点，', 'Capture the core,')}<br/>
                 <span className="text-[#b7893b] italic font-serif font-light">{getContent('gal_cta_subtitle', '点亮下一个星区。', 'ignite the next sector.')}</span>
              </h2>
              <p className="text-2xl text-white font-light leading-relaxed mb-20 whitespace-pre-line">
                 {getContent('gal_cta_desc', '区域独家席位稀缺。\n只寻找具有深厚产业底盘与极客风范的同路人。', 'Exclusive regional seats are scarce.\nSeeking partners with deep industrial roots and geek spirit.')}
              </p>
              
              <Link href="/contact" className="group inline-flex items-center gap-6 px-12 py-6 bg-[#FFFFFF] text-[#050505] hover:bg-white hover:scale-105 transition-all text-xl font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                 {t('成为城市合伙人', 'Become City Partner')}
                 <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full group-hover:bg-[#b7893b] group-hover:text-black transition-colors">&rarr;</span>
              </Link>
           </div>
        </Section>

      </div>
    </PageTransition>
  );
}
