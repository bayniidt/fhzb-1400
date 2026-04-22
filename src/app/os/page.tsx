"use client";

import { PageTransition } from "@/components/ui/PageTransition"
import { useLanguage } from "@/context/LanguageContext"
import { motion, useScroll } from "framer-motion"
import { useRef, useState } from "react"

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
      zh: "融", 
      en: "FUNDRAISING", 
      role_zh: "地图测绘者",
      role_en: "Mapmaker",
      title_zh: "第一性原理：如何测绘产业根基", 
      title_en: "First Principles: Mapping Industrial Foundations",
      desc_zh: "摒弃项目制散养，通过超10亿级基石基金锁定产业筹码，确保资本在不确定周期中的绝对掌控力。",
      desc_en: "Rejecting project-based decentralization, we secure industrial chips through 1B+ cornerstone funds.",
      tools: ["项目筛选模型", "财务模型Excel", "法律文件范本"],
      video: "/fhzb-1400/videos/batch-compressed.mp4"
    },
    { 
      id: "invest", 
      zh: "投", 
      en: "INVESTMENT", 
      role_zh: "安全绳守护者",
      role_en: "Safety Guardian",
      title_zh: "第一性原理：标注资本等高线", 
      title_en: "First Principles: Marking Capital Contours",
      desc_zh: "穿透PPT与财务修饰，直抵技术底层与产业终局。我们不听故事，只推演生产力爆发的数学基准。",
      desc_en: "Penetrating PPT and financial window-dressing to reach technical foundations.",
      tools: ["技术溯源分析", "创始团队建模", "周期波动模拟"],
      video: "/fhzb-1400/videos/block-compressed.mp4"
    },
    { 
      id: "manage", 
      zh: "管", 
      en: "MANAGEMENT", 
      role_zh: "营地搭建者",
      role_en: "Camp Builder",
      title_zh: "沉浸式赋能：模型重构", 
      title_en: "Immersive Empowerment: Re-modeling",
      desc_zh: "派驻“影子CEO”级合伙人，在组织治理、极核裂变与资本路径上进行手术刀式干预，纠偏航向。",
      desc_en: "Deploying 'Shadow CEO' level partners to perform surgical interventions in governance and capital paths.",
      tools: ["OKR 极核对齐", "全球牌照接驳", "生态资源灌溉"],
      video: "/fhzb-1400/videos/global-compressed.mp4"
    },
    { 
      id: "exit", 
      zh: "退", 
      en: "EXIT", 
      role_zh: "登阶引导者",
      role_en: "Ascent Guide",
      title_zh: "登阶升维：跨区域裂变", 
      title_en: "Upgrade: Cross-border Fission",
      desc_zh: "不仅是拿钱离场。通过合伙人系统，将被投企业转化为新的生态节点，实现从‘孤岛’到‘版图’的升维。",
      desc_en: "Portfolio companies transform into new ecosystem nodes, evolving from 'islands' into 'territories'.",
      tools: ["并购重组套利", "全球交易所通兑", "节点再投资"],
      video: "/fhzb-1400/videos/footer-compressed.mp4"
    }
  ];

  const commitments = [
    { label_zh: "对赌陪跑", label_en: "Co-running Commitment", value: "100%", detail_zh: "真实案例：某硬科技企业通过 OKR 极核对齐实现 200% 增长", detail_en: "Case Study: Tech firm achieved 200% growth via OKR alignment" },
    { label_zh: "亏损兑付", label_en: "Loss Compensation", value: "24%", detail_zh: "劣后级资金保障，已为 12 位 LP 成功对冲周期风险", detail_en: "Junior tranche protection: Hedged risks for 12+ LPs" },
    { label_zh: "回购保障", label_en: "Buyback Guarantee", value: "24%", detail_zh: "脱敏数据：过去 5 年所有回购协议均 100% 履行", detail_en: "Data: 100% fulfillment of buyback agreements over 5 years" },
    { label_zh: "上市百分百", label_en: "IPO Target", value: "100%", detail_zh: "确定性路径：目前在管项目 IPO 申报通过率领先行业", detail_en: "Deterministic Path: Leading industry in IPO approval rates" }
  ];

  const [hoveredSvgStage, setHoveredSvgStage] = useState<number | null>(null);

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
             <span className="text-[#b7893b] uppercase tracking-[0.4em] font-bold text-xs block mb-8 relative z-10">Ascent Operating System</span>
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

        {/* 1. 操作系统全景图：交互式 SVG 区块 */}
        <section id="panorama" className="py-32 px-10 bg-black relative overflow-hidden">
           <div className="max-w-7xl mx-auto text-center mb-20">
              <span className="text-[#b7893b] uppercase tracking-[0.5em] font-bold text-xs">{t('操作系统全景', 'OS PANORAMA')}</span>
              <h2 className="text-5xl md:text-6xl font-bold text-white mt-4 tracking-tighter">
                 {t('闭环生态系统', 'CLOSED-LOOP ECOSYSTEM')}
              </h2>
           </div>

           <div className="max-w-4xl mx-auto relative">
              <svg viewBox="0 0 800 400" className="w-full h-auto">
                 {/* 连接线装饰 */}
                 <path d="M150,200 L650,200" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="opacity-20" />
                 
                 {/* 四个阶段的圆形节点 */}
                 {stages.map((stage, idx) => {
                    const x = 150 + idx * 165;
                    const y = 200;
                    const isActive = hoveredSvgStage === idx;
                    
                    return (
                       <g 
                         key={idx} 
                         onMouseEnter={() => setHoveredSvgStage(idx)}
                         onMouseLeave={() => setHoveredSvgStage(null)}
                         className="cursor-pointer group"
                       >
                          {/* 外圈动画 */}
                          <motion.circle
                            cx={x} cy={y} r={isActive ? 50 : 40}
                            fill="transparent"
                            stroke="#b7893b"
                            strokeWidth="2"
                            animate={{ scale: isActive ? 1.2 : 1, opacity: isActive ? 0.8 : 0.3 }}
                          />
                          {/* 核心圆 */}
                          <circle 
                            cx={x} cy={y} r="35" 
                            fill={isActive ? "#b7893b" : "#111"} 
                            className="transition-colors duration-500"
                            stroke="white"
                            strokeWidth="1"
                            strokeOpacity="0.2"
                          />
                          {/* 阶段文字 */}
                          <text 
                            x={x} y={y + 5} 
                            textAnchor="middle" 
                            fill={isActive ? "black" : "white"}
                            className="text-2xl font-bold transition-colors duration-500 pointer-events-none"
                          >
                             {language === 'zh' ? stage.zh : stage.en.charAt(0)}
                          </text>
                          
                          {/* 提示工具框 */}
                          {isActive && (
                             <foreignObject x={x - 100} y={y + 60} width="200" height="150">
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-[#1a1a1a] border border-[#b7893b]/50 p-4 rounded-lg shadow-2xl backdrop-blur-md"
                                >
                                   <p className="text-[#b7893b] text-xs font-black mb-2 uppercase tracking-tighter">{stage.en}</p>
                                   <div className="space-y-1">
                                      {stage.tools.map((tool, i) => (
                                         <p key={i} className="text-white/80 text-[10px] font-bold border-l border-[#b7893b] pl-2">{tool}</p>
                                      ))}
                                   </div>
                                </motion.div>
                             </foreignObject>
                          )}
                       </g>
                    );
                 })}
              </svg>
           </div>
        </section>

        {/* 2. 交互阶段区：左文右视剧场结构 (登峰地图) */}
        <section id="map" className="py-40 px-10 max-w-7xl mx-auto relative overflow-hidden">
           <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 border border-[#b7893b]/20 rotate-45 translate-x-1/2 -translate-y-1/2" />
           </div>

           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              {/* 左侧：步骤导航与深度解读 */}
              <div className="lg:col-span-5 space-y-12">
                 <div className="space-y-4">
                    <span className="text-[#b7893b] uppercase tracking-[0.5em] font-bold text-xs">{t('转化路径', 'CONVERSION PATH')}</span>
                    <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter">
                       {t('登峰地图', 'ASCENT MAP')}
                    </h2>
                 </div>

                 <div className="flex flex-col gap-4">
                    {stages.map((stage, idx) => (
                       <button 
                         key={idx}
                         onClick={() => setActiveStage(idx)}
                         className={`w-full text-left group transition-all duration-500 relative py-6 border-b border-white/5 ${activeStage === idx ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}
                       >
                          <div className="flex items-baseline gap-6">
                             <span className="text-sm font-mono text-[#b7893b]">0{idx + 1}</span>
                             <span className={`text-4xl font-bold transition-transform duration-500 ${activeStage === idx ? 'translate-x-2 text-white' : 'text-white'}`}>
                                {language === 'zh' ? stage.zh : stage.en}
                             </span>
                             {activeStage === idx && (
                                <span className="text-xs text-[#b7893b] font-black uppercase tracking-widest bg-[#b7893b]/10 px-2 py-1">
                                   {language === 'zh' ? stage.role_zh : stage.role_en}
                                </span>
                             )}
                          </div>
                          
                          <motion.div 
                            initial={false}
                            animate={{ height: activeStage === idx ? "auto" : 0, opacity: activeStage === idx ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                             <div className="pt-8 space-y-6">
                                <p className="text-2xl text-white font-black leading-tight">
                                   {language === 'zh' ? stage.title_zh : stage.title_en}
                                </p>
                                <p className="text-lg text-white/70 font-medium leading-relaxed">
                                   {language === 'zh' ? stage.desc_zh : stage.desc_en}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                   {stage.tools.map((tool, i) => (
                                      <span key={i} className="px-4 py-2 bg-white/5 border border-[#b7893b]/30 text-xs text-white font-black uppercase tracking-widest">
                                         {tool}
                                      </span>
                                   ))}
                                </div>
                             </div>
                          </motion.div>
                       </button>
                    ))}
                 </div>
              </div>

              {/* 右侧：沉浸式视频演示 */}
              <div className="lg:col-span-7">
                 <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_100px_rgba(183,137,59,0.1)]">
                    <motion.video
                      key={activeStage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      src={stages[activeStage].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* 视频浮层信息 */}
                    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                       <div className="space-y-2">
                          <p className="text-xs text-[#b7893b] font-black uppercase tracking-[0.3em]">{t('实时推演', 'REAL-TIME SIMULATION')}</p>
                          <p className="text-2xl text-white font-serif italic">{stages[activeStage].en}</p>
                       </div>
                       <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md">
                          <div className="w-2 h-2 rounded-full bg-[#b7893b] animate-pulse" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 核心承诺区：动态数据卡片 */}
        <section id="commitments" className="py-40 bg-white/5 relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-10 relative z-10">
              <div className="text-center mb-24 space-y-4">
                 <span className="text-[#b7893b] uppercase tracking-[0.5em] font-bold text-xs">{t('硬性承诺', 'HARD COMMITMENTS')}</span>
                 <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter">
                    {t('行诺致远', 'COMMITMENT')}
                 </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {commitments.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -10 }}
                      className="bg-surface border border-white/5 p-10 space-y-8 relative group overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-32 h-32 bg-[#b7893b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#b7893b]/10 transition-colors" />
                       
                       <div className="space-y-2 relative z-10">
                          <p className="text-xs text-white/40 uppercase tracking-widest font-bold">
                             {language === 'zh' ? item.label_zh : item.label_en}
                          </p>
                          <h3 className="text-6xl font-black text-[#b7893b] tracking-tighter">
                             {item.value}
                          </h3>
                       </div>
                       
                       <div className="space-y-4 relative z-10">
                          <p className="text-xl text-white font-black leading-tight">
                             {language === 'zh' ? item.detail_zh : item.detail_en}
                          </p>
                          <div className="w-8 h-[2px] bg-[#b7893b] group-hover:w-full transition-all duration-500" />
                          <p className="text-xs text-[#b7893b] uppercase tracking-[0.2em] font-black">Verified Case Study</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* 底部全景区 */}
        <section id="tools" className="py-40 bg-white/5 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-10 text-center">
              <h2 className={`font-serif text-white mb-16 ${language === 'zh' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'}`}>
                {t('工作流预览：', 'Backend:')} <br/>
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
                       <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white font-bold text-xs tracking-wider">
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
