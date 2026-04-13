"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Alliance() {
  const { t, language } = useLanguage();

  const ecosystemClusters = [
    {
      id: "targets",
      zh: "实业极核 (Targets)",
      en: "Industrial Targets",
      desc_zh: "拥有硬核技术底座与全球扩张野心的实业企业。我们不仅注资，更代入创始人视角重构资本模型。",
      desc_en: "Industrial enterprises with core technical foundations and global ambitions. We reconstruct capital models from a founder's perspective.",
      cta: t("开启尽调接入", "Start Due Diligence"),
      bg: "/fhzb-1400/image/alliance_1.jpg"
    },
    {
      id: "partners",
      zh: "区域主理人 (Partners)",
      en: "Regional Partners",
      desc_zh: "深耕地方产业土壤的极核合伙人。负责调动当地政商资源，承接总部的资本算力下沉。",
      desc_en: "Core partners deeply rooted in local industrial soils, mobilizing resources and executing headquarters' capital strategies.",
      cta: t("申请极核授权", "Apply for Auth"),
      bg: "/fhzb-1400/image/alliance_2.jpg"
    },
    {
      id: "syndicate",
      zh: "资本供血盟友 (Syndicate)",
      en: "Capital Syndicate",
      desc_zh: "认同第一性原理的高净值个人与家族信托。参与基石项目跟投，共建长周期价值护城河。",
      desc_en: "High net worth individuals and family trusts sharing first-principles logic. Participating in cornerstone projects to build long-term moats.",
      cta: t("入驻资本池", "Join Capital Pool"),
      bg: "/fhzb-1400/image/alliance_3.jpg"
    },
    {
      id: "echelon",
      zh: "合规与技术顶层 (Top Echelon)",
      en: "Top Echelon",
      desc_zh: "全球顶级律师、审计与保荐机构。为星系内的所有节点提供国际化的上市合规与架构防御。",
      desc_en: "Top-tier legal, audit, and sponsor institutions providing international IPO compliance and structural defense.",
      cta: t("建立协同链路", "Build Synergy"),
      bg: "/fhzb-1400/image/alliance_4.jpg"
    }
  ];

  return (
    <PageTransition>
      <div className="bg-background w-full">
        {/* Header区 */}
        <section className="relative pt-60 pb-40 border-b border-white/5 overflow-hidden">
           <img 
             src="/fhzb-1400/videos/股市_1.jpg" 
             className="absolute inset-0 w-full h-full object-cover"
             alt="Alliance Hero Background"
           />
           {/* 背景装饰 */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
           
           <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20">
             <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8 relative z-10">Collective Prosperity</span>
             <h1 className={`font-serif font-black text-white tracking-tighter mb-8 relative z-10 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}>
               {t('共筑峰峦', 'Alliance')}
             </h1>
             <p className={`font-serif text-white/90 font-light max-w-3xl leading-relaxed relative z-10 drop-shadow-lg ${language === 'zh' ? 'text-2xl' : 'text-xl md:text-2xl'}`}>
               {t('在峰壑，没有孤岛。', 'In FH, there are no islands.')}<br/>
               {t('我们通过精密的利益对齐与资源互锁，', 'Through precise alignment and resource interlocking,')}<br />
               {t('让每一份资本与技术都能在', 'every piece of capital and technology')}<br />
               <span className="text-white font-medium">{t('生态网络中实现指数级裂变。', 'achieves exponential growth within the network.')}</span>
             </p>
           </div>
        </section>

        {/* 四大集群展示 */}
        <div className="divide-y divide-white/5 border-b border-white/5">
          {ecosystemClusters.map((cluster, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={cluster.id} className="relative group overflow-hidden hover:bg-[#D4AF37]/5 transition-colors duration-1000">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-32 flex flex-col md:flex-row gap-20 items-center">
                   {/* 内容 */}
                   <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="flex items-center gap-4 mb-8">
                         <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                         <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">{cluster.en}</span>
                      </div>
                      <h2 className={`font-serif text-white mb-8 ${language === 'zh' ? 'text-5xl md:text-6xl font-light' : 'text-4xl md:text-5xl font-black'}`}>
                        {language === 'zh' ? cluster.zh : cluster.en}
                      </h2>
                      <p className="text-xl text-white font-light leading-relaxed mb-12">
                        {language === 'zh' ? cluster.desc_zh : cluster.desc_en}
                      </p>
                      
                      <Link href="/contact" className="group/btn inline-flex items-center gap-6">
                         <span className="text-white font-bold tracking-widest text-sm uppercase group-hover/btn:text-[#D4AF37] transition-colors">{cluster.cta}</span>
                         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[#D4AF37] group-hover/btn:bg-[#D4AF37] group-hover/btn:text-black transition-all">
                            &rarr;
                         </div>
                      </Link>
                   </div>

                   {/* 视觉卡片 (模拟) */}
                   <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'} h-[500px] relative overflow-hidden bg-surface border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-glow/20 via-transparent to-transparent opacity-40"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#D4AF37]/20 rounded-full animate-[ping_5s_infinite] opacity-30"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-white/5 text-[10rem] font-serif font-black select-none">{cluster.id[0].toUpperCase()}</span>
                      </div>
                      
                      {/* 抽象细节 */}
                      <div className="absolute bottom-10 left-10 p-6 border-l border-[#D4AF37]/50 bg-black/40 backdrop-blur-sm">
                         <div className="text-[10px] text-white uppercase tracking-widest mb-2">Network Status</div>
                         <div className="text-white font-bold text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                            ACTIVE NODE 0{idx + 1}
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* 底座入口 */}
        <Section className="bg-black text-center border-t border-white/10 !min-h-[50vh] flex flex-col justify-center px-6">
          <h2 className="text-3xl font-serif font-light text-white mb-8">
            {t('仍有游移？或是准备登阶？', 'Still undecided? Or ready to ascend?')}
          </h2>
          <Link href="/contact" className="text-sm border-b border-[#D4AF37] pb-1 text-[#D4AF37] uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all inline-block w-fit mx-auto">
             {t('直接前往联结中枢进行身份筛选', 'Proceed to identification at the Hub')}
          </Link>
        </Section>

      </div>
    </PageTransition>
  );
}
