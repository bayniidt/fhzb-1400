"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Vision() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const tabs = [
    { id: 'all', zh: '全部内容', en: 'All' },
    { id: 'column', zh: '第一性原理·专栏', en: 'First Principles' },
    { id: 'insights', zh: '峰壑洞察·研报', en: 'Insights & Reports' },
    { id: 'summit', zh: '峰会实录·金句', en: 'Summit Quotes' },
    { id: 'media', zh: '媒体中心·公关', en: 'Media Center' },
  ];

  return (
    <PageTransition>
      <div className="bg-background w-full relative">
        {/* Header区 */}
        <section className="relative pt-60 pb-40 border-b border-white/5 overflow-hidden">
           <img 
             src="/videos/背景图_5.jpg" 
             className="absolute inset-0 w-full h-full object-cover"
             alt="Vision Header Background"
           />
           
           <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20">

             <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8 relative z-10">Vision & Insights</span>
             <h1 className={`font-serif font-black text-white tracking-tighter mb-8 relative z-10 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}>
               {t('峰壑视野', 'Summit Insights')}
             </h1>
             <p className={`font-serif text-white/90 font-light max-w-3xl leading-relaxed relative z-10 drop-shadow-lg ${language === 'zh' ? 'text-2xl' : 'text-xl md:text-2xl'}`}>
               {t('在这里，我们只输出剔除了情绪共识的', 'Here, we only output first principles')}<br/>
               <span className="text-white font-medium">{t('第一性原理。', 'stripped of emotional consensus.')}</span>
             </p>
           </div>
        </section>

        {/* 模块一：《登峰》纪录片 (主视觉高斯模糊重质感) */}
        <Section className="!py-0 relative min-h-[90vh] flex flex-col justify-end group cursor-pointer overflow-hidden border-b border-white/5 bg-background">
           <div className="absolute inset-0 z-0">
              <img
                 src="/videos/背景图_2.jpg"
                 className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                 alt="Vision Documentary"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              {/* 金色光束动画层模拟 */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,_var(--tw-gradient-stops))] from-glow/20 via-transparent to-transparent z-15 pointer-events-none" />
           </div>

           <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 pb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-3 py-1 uppercase shadow-[0_0_15px_rgba(212,175,55,0.4)]">Series Premiere</span>
                 </div>
                 <h2 className={`font-serif text-white mb-6 leading-tight drop-shadow-2xl ${language === 'zh' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'}`}>
                   {t('《登峰》', 'THE SUMMIT')}<br />{t('企业蜕变系列纪录片', 'Documentary Series')}
                 </h2>
                 <p className="text-white text-lg md:text-xl font-light leading-relaxed drop-shadow-lg">
                   {t('镜头不撒谎。独家记录被投企业从估值低谷、模式重构到最终敲钟上市的三年生死局。只还原最残酷的商业真相与我们在悬崖边缘的陪跑全历程。', 'The camera does not lie. Exclusive records of portfolio companies from valuation troughs to final IPOs. Revealing the harshest business truths of our journey on the cliff edge.')}
                 </p>
              </div>

              <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all shrink-0 hover:scale-110 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
                   className={`whitespace-nowrap py-6 text-sm tracking-widest uppercase transition-colors relative ${activeTab === tab.id ? 'text-[#D4AF37] font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                 >
                   {language === 'zh' ? tab.zh : tab.en}
                   {activeTab === tab.id && <motion.div layoutId="vision-tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />}
                 </button>
              ))}
           </div>
        </div>

        {/* 矩阵内容区 */}
        <div className="py-20 max-w-7xl mx-auto px-6 md:px-10 space-y-32">

           {/* 模块二：《第一性原理》 深度洞见 */}
           {(activeTab === 'all' || activeTab === 'column') && (
             <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                   <h3 className="text-3xl font-serif font-light text-white">{t('内部专栏', 'Internal Columns')} <span className="font-serif italic text-gray-500">/ {t('第一性原理', 'First Principles')}</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   {[
                     { zh: "别再沉迷PPT估值：产业周期下行的三大破局点", en: "Stop PPT Valuations: Three Breakout Points in Downturn Cycles", author_zh: "首席尽调官", author_en: "Chief Due Diligence Officer", type_zh: "深度阅读 & 播客", type_en: "Long Read & Podcast" },
                     { zh: "从流量生意到生态门槛：如何构建真正的资本护城河？", en: "From Traffic to Ecosystem: Building True Capital Moats", author_zh: "极核合伙人", author_en: "Core Partner", type_zh: "播客解读", type_en: "Podcast Analysis" },
                   ].map((article, idx) => (
                      <div key={idx} className="group relative bg-surface border border-white/5 p-10 hover:bg-black/40 transition-colors cursor-pointer overflow-hidden">
                         <div className="absolute top-0 right-0 w-1/4 h-full bg-glow/5 skew-x-12 translate-x-1/2 group-hover:translate-x-0 transition-transform duration-1000"></div>
                         <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6 block flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                            {language === 'zh' ? article.type_zh : article.type_en}
                         </span>
                         <h4 className={`font-serif text-gray-200 group-hover:text-white transition-colors mb-20 leading-relaxed relative z-10 ${language === 'zh' ? 'text-2xl' : 'text-xl'}`}>
                           {language === 'zh' ? article.zh : article.en}
                         </h4>
                         <div className="flex justify-between w-full items-center border-t border-white/10 pt-6 relative z-10">
                            <span className="text-sm text-gray-600 font-medium uppercase tracking-widest">{language === 'zh' ? article.author_zh : article.author_en}</span>
                            <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">&rarr;</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* 模块三：峰会实录·金句版图 */}
           {(activeTab === 'all' || activeTab === 'summit') && (
             <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                   <h3 className="text-3xl font-serif font-light text-white">{t('峰会实录', 'Summit Records')} <span className="font-serif italic text-gray-500">/ {t('巨擘共识', 'Giant Consensus')}</span></h3>
                </div>
                <div className="relative p-10 md:p-24 overflow-hidden group">
                   <div 
                     className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-[3s] brightness-[.8]" 
                     style={{ backgroundImage: 'url("/videos/股市_5.jpg")' }}
                   ></div>
                   <div className="absolute inset-0 bg-background/20 z-5"></div>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-glow/20 via-transparent to-transparent pointer-events-none z-10"></div>
                   <div className="relative z-20 flex flex-col items-center text-center">
                     <span className="text-5xl font-serif text-[#D4AF37] mb-6 opacity-60">“</span>
                     <h4 className={`font-serif text-[#ECECEC] max-w-4xl leading-relaxed italic mb-10 drop-shadow-xl ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                       {t('我们要的不是短期的账面浮盈，而是要在这片不确定的土壤里，钉下一片能抵御10级风暴的防风林。', 'What we seek is not short-term paper profit, but to plant a windbreak in this uncertain soil that can withstand a stage-10 storm.')}
                     </h4>
                     <p className="text-[#D4AF37] tracking-widest text-sm uppercase font-bold">{t('2026 生态共建日 · 会长致辞', '2026 Ecosystem Day · Chairman Address')}</p>
                     
                     <div className="mt-16 flex gap-4 overflow-x-auto hide-scrollbar w-full pb-4 justify-center">
                        {[1,2,3].map(i => (
                           <div key={i} className="min-w-[280px] h-[160px] bg-background/60 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer flex items-center justify-center group/item transition-all">
                              <span className="text-sm tracking-widest font-bold opacity-60 group-hover/item:opacity-100 transition-opacity text-white flex items-center gap-2">
                                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/item:fill-[#D4AF37] group-hover/item:stroke-none transition-all"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
             <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                   <h3 className="text-3xl font-serif font-light text-white">{t('白皮书矩阵', 'Whitepaper Matrix')} <span className="font-serif italic text-gray-500">/ {t('峰壑洞察', 'Summit Insights')}</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[
                     { year: "2026", zh: "资本路径重构：新质生产力上市合规全周期", en: "Capital Path Reconstruction: IPO Compliance Cycle for New Productivity", cover: "/videos/股市_2.jpg" },
                     { year: "2025", zh: "穿越死亡谷：被投企业失败模型及风控止损研究", en: "Through Death Valley: Failure Models and Risk Control Research", cover: "/videos/股市_3.jpg" },
                     { year: "2025", zh: "区域深耕：合伙人生态网络极核裂变模型分析", en: "Regional Depth: Fission Model Analysis of Partner Ecosystems", cover: "/videos/股市_4.jpg" },
                   ].map((report, idx) => (
                      <div key={idx} className="flex flex-col bg-surface border border-white/5 hover:border-[#D4AF37]/40 transition-all group cursor-pointer overflow-hidden">
                         <div className="h-64 overflow-hidden relative">
                            <div 
                              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-all duration-1000" 
                              style={{ backgroundImage: `url(${report.cover})` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                            <div className="absolute top-6 left-6 bg-[#D4AF37] text-black text-[10px] font-black px-2 py-1 tracking-tighter shadow-lg">YEAR {report.year}</div>
                         </div>
                         <div className="p-8">
                            <h4 className={`text-gray-300 group-hover:text-white transition-colors leading-relaxed mb-6 h-14 line-clamp-2 ${language === 'zh' ? 'text-lg' : 'text-base'}`}>{language === 'zh' ? report.zh : report.en}</h4>
                            <div className="flex justify-between items-center pt-6 border-t border-white/10">
                              <span className="text-[10px] text-gray-600 font-bold tracking-[0.2em] uppercase">Document / .PDF</span>
                              <span className="text-[#D4AF37] font-serif italic text-xl group-hover:translate-x-2 transition-transform">&rarr;</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* 模块五：媒体中心 */}
           {(activeTab === 'all' || activeTab === 'media') && (
             <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                   <h3 className="text-3xl font-serif font-light text-white">{t('资讯阵列', 'Information Array')} <span className="font-serif italic text-gray-500">/ {t('媒体中心', 'Media Center')}</span></h3>
                   <Link href="/contact" className="text-xs tracking-widest uppercase text-gray-500 hover:text-[#D4AF37] transition-colors">{t('媒体专区', 'Press Area')} &rarr;</Link>
                </div>
                <div className="divide-y divide-white/10">
                   {[
                     { date: "MAR 12, 2026", zh: "峰壑资本宣告旗下首支超10亿级基石盲池基金封闭完毕。", en: "Fenghe Capital announces the closing of its first Billion-level blind pool fund.", src_zh: "彭博商业评论", src_en: "Bloomberg Business" },
                     { date: "FEB 08, 2026", zh: "专访峰壑创始人：在平原上狂奔的时代结束，登峰才刚刚开始。", en: "Interview with Founder: The era of running on plains is over; the climb has just begun.", src_zh: "顶流财经周刊", src_en: "Leading Finance Weekly" },
                     { date: "JAN 21, 2026", zh: "重构区域生态圈层：华东与跨广深两大极核俱乐部同日挂牌。", en: "Restructuring Regional Ecosystems: East China and GBA Clubs launched on the same day.", src_zh: "官方新闻公告", src_en: "Official Announcement" }
                   ].map((news, idx) => (
                      <div key={idx} className="py-10 flex flex-col md:flex-row justify-between md:items-center gap-6 group cursor-pointer">
                         <div className="flex items-center gap-4 min-w-[180px]">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="text-xs font-black tracking-widest text-gray-600 group-hover:text-[#D4AF37] transition-colors">{news.date}</span>
                         </div>
                         <h4 className="text-xl text-gray-400 group-hover:text-[#ECECEC] transition-all flex-1 leading-relaxed">{news.title}</h4>
                         <span className="text-[10px] text-gray-700 font-bold tracking-[0.2em] uppercase">Source: {news.src}</span>
                      </div>
                   ))}
                </div>
             </div>
           )}

        </div>
      </div>
    </PageTransition>
  );
}
