"use client"

import { PageTransition } from "@/components/ui/PageTransition"
import { Section } from "@/components/ui/Section"
import { useLanguage } from "@/context/LanguageContext"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { fetchContent } from "@/lib/api"
import {
   websiteHeroSubtitleClassName,
   websiteHeroTitleClassName,
} from "@/lib/website-typography"

export default function Vision() {
   const { t, language } = useLanguage()
   const [activeTab, setActiveTab] = useState<string>("all")

   const [siteContent, setSiteContent] = useState<any>(null);

   useEffect(() => {
     fetchContent().then(setSiteContent);
   }, []);

   const getContent = (key: string, fallbackZh: string, fallbackEn: string) => {
     if (!siteContent || !siteContent[key]) return language === 'zh' ? fallbackZh : fallbackEn;
     return language === 'zh' ? siteContent[key].zh : siteContent[key].en;
   };

   const tabs = [
      { id: 'all', zh: '全部内容', en: 'All' },
      { id: 'column', zh: '第一性原理·专栏', en: 'First Principles' },
      { id: 'insights', zh: '峰壑洞察·研报', en: 'Insights & Reports' },
      { id: 'summit', zh: '峰会实录·金句', en: 'Summit Quotes' },
      { id: 'media', zh: '媒体中心·公关', en: 'Media Center' },
   ]

   return (
      <PageTransition>
         <div className="bg-background w-full relative">
            {/* Header区 */}
            <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/5">
               <img
                  src={getContent('vis_hero_bg', "/videos/背景图_5.jpg", "/videos/背景图_5.jpg")}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Vision Header Background"
               />

               <div className="max-w-7xl mx-auto w-full px-6 pt-24 md:px-10 relative z-20">

                  <span className="text-[#b7893b] uppercase tracking-[0.4em] font-bold text-xs block mb-8 relative z-10">Vision & Insights</span>
                  <h1 className={websiteHeroTitleClassName(language, "relative z-10 mb-8 font-black")}>
                     {getContent('vis_hero_title', '峰壑视野', 'Summit Insights')}
                  </h1>
                  <p className={websiteHeroSubtitleClassName(language, "relative z-10 max-w-3xl")}>
                     {t('在这里，我们只输出剔除了情绪共识的', 'Here, we only output first principles')}<br />
                     <span className="text-white font-medium">{t('第一性原理。', 'stripped of emotional consensus.')}</span>
                  </p>
               </div>
            </section>

            {/* 模块一：《登峰》纪录片 (改为上下结构，非全屏视频) */}
            <Section id="documentary" className="relative py-32 bg-background overflow-hidden border-b border-white/5 !min-h-0">
               {/* 背景极简装饰 */}
               <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#b7893b]/5 rounded-full blur-[120px] pointer-events-none" />

               <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center">
                  {/* 顶部标语与标题 */}
                  <div className="text-center mb-6">
                     <div className="inline-flex items-center gap-4 mb-10">
                        <span className="w-8 h-[1px] bg-[#b7893b]/50"></span>
                        <span className="bg-[#b7893b] text-black text-[10px] font-black tracking-[0.4em] px-4 py-1 uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]">Series Premiere</span>
                        <span className="w-8 h-[1px] bg-[#b7893b]/50"></span>
                     </div>
                     <h2 className={`font-serif text-white mb-6 drop-shadow-2xl ${language === 'zh' ? 'text-5xl md:text-7xl font-light tracking-tight' : 'text-4xl md:text-6xl font-black'}`}>
                        {t('《登峰》', 'THE SUMMIT')} <span className="font-serif italic text-[#b7893b]">{t('纪录片', 'Documentary')}</span>
                     </h2>
                     <p className="text-white/40 text-sm md:text-base font-bold tracking-[0.5em] uppercase">
                        {t('企业蜕变系列纪录片', 'Enterprise Transformation Series')}
                     </p>
                  </div>

                  {/* 底部深度解析文案 */}
                  <div className="max-w-4xl text-center md:text-left flex flex-col md:flex-row  md:gap-12 items-center md:items-start bg-white/[0.02] p-4 md:p-6 rounded-3xl border border-white/5">
                     <div className="shrink-0">
                        <span className="text-3xl font-serif text-[#b7893b] opacity-20 block -mt-4">“</span>
                     </div>
                     <p className="text-white/70 text-lg md:text-2xl font-light leading-relaxed">
                        <span className="text-white font-bold mr-3">{t('镜头不撒谎。', 'The camera does not lie.')}</span>
                        {t('独家记录被投企业从估值低谷、模式重构到最终敲钟上市的三年生死局。只还原最残酷的商业真相与我们在悬崖边缘的陪跑全历程。', 'Exclusive records of portfolio companies from valuation troughs to final IPOs. Revealing the harshest business truths of our journey on the cliff edge.')}
                     </p>
                  </div>

                  {/* 视频呈现区 (非全屏居中容器) */}
                  <div className="w-full max-w-5xl group relative mb-20 px-4 md:px-0">
                     {/* 极简外围装饰 */}
                     <div className="absolute -inset-2 md:-inset-4 border border-white/5 rounded-[2.5rem] pointer-events-none"></div>

                     <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-surface">
                        <img
                           src={getContent('vis_doc_cover', "/videos/背景图_2.jpg", "/videos/背景图_2.jpg")}
                           className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000"
                           alt="Documentary Preview"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                        {/* 互动播放按钮 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:bg-[#b7893b] group-hover:text-black group-hover:border-[#b7893b] group-hover:scale-110 transition-all duration-500 cursor-pointer shadow-2xl relative">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                              {/* 细微光晕 */}
                              <div className="absolute inset-0 rounded-full bg-[#b7893b]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           </div>
                        </div>

                        {/* 浮动信息标签 */}
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 p-6 border-l-2 border-[#b7893b] bg-black/40 backdrop-blur-md hidden sm:block">
                           <div className="text-[10px] text-[#b7893b] uppercase tracking-widest mb-1 font-bold">Now Streaming</div>
                           <div className="text-white font-bold text-xs tracking-wider">EPISODE 01: THE PERSISTENCE</div>
                        </div>
                     </div>
                  </div>


               </div>
            </Section>

            {/* 导航 Filter 栏 */}
            <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 px-6 md:px-10">
               <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto hide-scrollbar">
                  {tabs.map((tab, idx) => (
                     <button
                        key={idx}
                        onClick={() => setActiveTab(tab.id)}
                        className={`whitespace-nowrap py-6 text-sm tracking-widest uppercase transition-colors relative ${activeTab === tab.id ? 'text-[#b7893b] font-bold' : 'text-white hover:text-white'}`}
                     >
                        {language === 'zh' ? tab.zh : tab.en}
                        {activeTab === tab.id && <motion.div layoutId="vision-tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b7893b]" />}
                     </button>
                  ))}
               </div>
            </div>

            {/* 矩阵内容区 */}
            <div className="py-20 max-w-7xl mx-auto px-6 md:px-10 space-y-32">

               {/* 模块二：《第一性原理》 深度洞见 */}
               {(activeTab === 'all' || activeTab === 'column') && (
                  <div id="first-principles" className="space-y-12">
                     <div className="flex justify-between items-end border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-serif font-light text-white">{t('内部专栏', 'Internal Columns')} <span className="font-serif italic text-white">/ {t('第一性原理', 'First Principles')}</span></h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                           { zh: "别再沉迷PPT估值：产业周期下行的三大破局点", en: "Stop PPT Valuations: Three Breakout Points in Downturn Cycles", author_zh: "首席尽调官", author_en: "Chief Due Diligence Officer", type_zh: "深度阅读 & 播客", type_en: "Long Read & Podcast" },
                           { zh: "从流量生意到生态门槛：如何构建真正的资本护城河？", en: "From Traffic to Ecosystem: Building True Capital Moats", author_zh: "极核合伙人", author_en: "Core Partner", type_zh: "播客解读", type_en: "Podcast Analysis" },
                        ].map((article, idx) => (
                           <div key={idx} className="group relative bg-surface border border-white/5 p-10 hover:bg-black/40 transition-colors cursor-pointer overflow-hidden">
                              <div className="absolute top-0 right-0 w-1/4 h-full bg-glow/5 skew-x-12 translate-x-1/2 group-hover:translate-x-0 transition-transform duration-1000"></div>
                              <span className="text-[#b7893b] text-xs font-bold tracking-widest uppercase mb-6 block flex items-center gap-2">
                                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                                 {language === 'zh' ? article.type_zh : article.type_en}
                              </span>
                              <h4 className={`font-serif text-white group-hover:text-white transition-colors mb-20 leading-relaxed relative z-10 ${language === 'zh' ? 'text-2xl' : 'text-xl'}`}>
                                 {language === 'zh' ? article.zh : article.en}
                              </h4>
                              <div className="flex justify-between w-full items-center border-t border-white/10 pt-6 relative z-10">
                                 <span className="text-sm text-white font-medium uppercase tracking-widest">{language === 'zh' ? article.author_zh : article.author_en}</span>
                                 <span className="text-[#b7893b] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">&rarr;</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* 模块三：峰会实录·金句版图 */}
               {(activeTab === 'all' || activeTab === 'summit') && (
                  <div id="summit" className="space-y-12">
                     <div className="flex justify-between items-end border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-serif font-light text-white">{t('峰会实录', 'Summit Records')} <span className="font-serif italic text-white">/ {t('巨擘共识', 'Giant Consensus')}</span></h3>
                     </div>
                     <div className="relative p-10 md:p-24 overflow-hidden group">
                        <div
                           className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s] brightness-[.8]"
                           style={{ backgroundImage: `url(${getContent('vis_summit_bg', "/videos/股市_5.jpg", "/videos/股市_5.jpg")})` }}
                        ></div>
                        <div className="absolute inset-0 bg-background/20 z-5"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-glow/20 via-transparent to-transparent pointer-events-none z-10"></div>
                        <div className="relative z-20 flex flex-col items-center text-center">
                           <span className="text-5xl font-serif text-[#b7893b] mb-6 opacity-60">“</span>
                           <h4 className={`font-serif text-[#FFFFFF] max-w-4xl leading-relaxed italic mb-10 drop-shadow-xl ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                              {t('我们要的不是短期的账面浮盈，而是要在这片不确定的土壤里，钉下一片能抵御10级风暴的防风林。', 'What we seek is not short-term paper profit, but to plant a windbreak in this uncertain soil that can withstand a stage-10 storm.')}
                           </h4>
                           <p className="text-[#b7893b] tracking-widest text-sm uppercase font-bold">{t('2026 生态共建日 · 会长致辞', '2026 Ecosystem Day · Chairman Address')}</p>

                           <div className="mt-16 flex gap-4 overflow-x-auto hide-scrollbar w-full pb-4 justify-center">
                              {[1, 2, 3].map(i => (
                                 <div key={i} className="min-w-[280px] h-[160px] bg-background/60 backdrop-blur-sm border border-white/10 hover:border-[#b7893b]/50 cursor-pointer flex items-center justify-center group/item transition-all">
                                    <span className="text-sm tracking-widest font-bold opacity-60 group-hover/item:opacity-100 transition-opacity text-white flex items-center gap-2">
                                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/item:fill-[#b7893b] group-hover/item:stroke-none transition-all"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                       {t('回顾片段', 'Flashback')} {i}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* 模块四：洞察白皮书研报 */}
               {(activeTab === 'all' || activeTab === 'insights') && (
                  <div id="insights" className="space-y-12">
                     <div className="flex justify-between items-end border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-serif font-light text-white">{t('白皮书矩阵', 'Whitepaper Matrix')} <span className="font-serif italic text-white">/ {t('峰壑洞察', 'Summit Insights')}</span></h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                           { year: "2026", zh: "资本路径重构：新质生产力上市合规全周期", en: "Capital Path Reconstruction: IPO Compliance Cycle for New Productivity", cover: "/videos/股市_2.jpg" },
                           { year: "2025", zh: "穿越死亡谷：被投企业失败模型及风控止损研究", en: "Through Death Valley: Failure Models and Risk Control Research", cover: "/videos/股市_3.jpg" },
                           { year: "2025", zh: "区域深耕：合伙人生态网络极核裂变模型分析", en: "Regional Depth: Fission Model Analysis of Partner Ecosystems", cover: "/videos/股市_4.jpg" },
                        ].map((report, idx) => (
                           <div key={idx} className="flex flex-col bg-surface border border-white/5 hover:border-[#b7893b]/40 transition-all group cursor-pointer overflow-hidden">
                              <div className="h-64 overflow-hidden relative">
                                 <div
                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-all duration-1000"
                                    style={{ backgroundImage: `url(${report.cover})` }}
                                 ></div>
                                 <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                                 <div className="absolute top-6 left-6 bg-[#b7893b] text-black text-[10px] font-black px-2 py-1 tracking-tighter shadow-lg">YEAR {report.year}</div>
                              </div>
                              <div className="p-8">
                                 <h4 className={`text-white group-hover:text-white transition-colors leading-relaxed mb-6 h-14 line-clamp-2 ${language === 'zh' ? 'text-lg' : 'text-base'}`}>{language === 'zh' ? report.zh : report.en}</h4>
                                 <div className="flex justify-between items-center pt-6 border-t border-white/10">
                                    <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase">Document / .PDF</span>
                                    <span className="text-[#b7893b] font-serif italic text-xl group-hover:translate-x-2 transition-transform">&rarr;</span>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* 模块五：媒体中心 */}
               {(activeTab === 'all' || activeTab === 'media') && (
                  <div id="media" className="space-y-12">
                     <div className="flex justify-between items-end border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-serif font-light text-white">{t('资讯阵列', 'Information Array')} <span className="font-serif italic text-white">/ {t('媒体中心', 'Media Center')}</span></h3>
                        <Link href="/contact" className="text-xs tracking-widest uppercase text-white hover:text-[#b7893b] transition-colors">{t('媒体专区', 'Press Area')} &rarr;</Link>
                     </div>
                     <div className="divide-y divide-white/10">
                        {[
                           { date: "MAR 12, 2026", zh: "峰壑资本宣告旗下首支超10亿级基石盲池基金封闭完毕。", en: "Fenghe Capital announces the closing of its first Billion-level blind pool fund.", src_zh: "彭博商业评论", src_en: "Bloomberg Business" },
                           { date: "FEB 08, 2026", zh: "专访峰壑创始人：在平原上狂奔的时代结束，登峰才刚刚开始。", en: "Interview with Founder: The era of running on plains is over; the climb has just begun.", src_zh: "顶流财经周刊", src_en: "Leading Finance Weekly" },
                           { date: "JAN 21, 2026", zh: "重构区域生态圈层：华东与跨广深两大极核俱乐部同日挂牌。", en: "Restructuring Regional Ecosystems: East China and GBA Clubs launched on the same day.", src_zh: "官方新闻公告", src_en: "Official Announcement" }
                        ].map((news, idx) => (
                           <div key={idx} className="py-10 flex flex-col md:flex-row justify-between md:items-center gap-6 group cursor-pointer">
                              <div className="flex items-center gap-4 min-w-[180px]">
                                 <span className="w-2 h-2 rounded-full bg-[#b7893b] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                 <span className="text-xs font-black tracking-widest text-white group-hover:text-[#b7893b] transition-colors">{news.date}</span>
                              </div>
                              <h4 className="text-xl text-white group-hover:text-[#FFFFFF] transition-all flex-1 leading-relaxed">{language === 'zh' ? news.zh : news.en}</h4>
                              <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase">Source: {language === 'zh' ? news.src_zh : news.src_en}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

            </div>
         </div>
      </PageTransition>
   )
}
