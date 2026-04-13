"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // 峰壑之问 简易轮播状态
  const questions = [
    { zh: "我们绘制的是空中楼阁，还是登峰地图？", en: "Are we painting castles in the air, or a map to the summit?" },
    { zh: "我们提供的是奇迹预言，还是经过压力测试的上升系统？", en: "Do we offer miracle prophecies, or pressure-tested ascent systems?" },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [questions.length]);

  return (
    <PageTransition>
      {/* 模块一：主视觉区 */}
      <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/fhzb-1400/videos/背景_6.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-[#000000]/30 z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none z-10" />
        </motion.div>
        
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 pt-32 mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`font-serif font-bold tracking-tight mb-8 text-[#FFFFFF] drop-shadow-2xl ${language === 'zh' ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-6xl lg:text-7xl leading-tight'}`}
          >
            {t('资本遇见雄心', 'Capital meets Ambition')}<br />
            {t('我们共筑峰峦', 'Building Summits Together')}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <Link href="/contact" className="px-10 py-5 bg-transparent border border-white/20 hover:bg-white hover:text-black transition-all font-medium tracking-widest text-sm uppercase">
              {t('成为生态伙伴', 'Join the Ecosystem')}
            </Link>
            <Link href="/os" className="px-10 py-5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all font-medium tracking-widest text-sm uppercase">
              {t('探索资本路径', 'Explore Capital Paths')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 模块二：峰壑宣言 */}
      <Section className="bg-surface items-center text-center overflow-hidden relative min-h-screen px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="/fhzb-1400/videos/背景图_2.jpg" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Declaration Background" 
          />
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-glow/20 via-transparent to-transparent pointer-events-none z-10"></div>

        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-20%" }}
           variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
           }}
           className="relative z-20 max-w-5xl  p-12 rounded-sm"
        >
          <h2 className={`font-serif text-[#D4AF37] mb-6 tracking-widest drop-shadow-lg ${language === 'zh' ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-5xl'}`}>
            {t('真正的资本，', 'True capital')}
          </h2>
          <h3 className={`font-serif font-light leading-relaxed text-[#FFFFFF] drop-shadow-md ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
            {t('是产业文明的', 'is the accelerator of')} <span className="text-white relative font-medium underline decoration-[#D4AF37] decoration-2 underline-offset-8">{t('加速器', 'industrial civilization')}</span>
            <br/>{t('而非收割器。', 'rather than its reaper.')}
          </h3>
        </motion.div>
      </Section>

      {/* 模块三：三大价值入口 */}
      <Section className="gap-16 bg-background !py-24 relative overflow-hidden px-6">
        <div className="absolute -left-20 top-20 w-96 h-96 bg-glow/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-sm tracking-[0.3em] font-bold text-white uppercase">
            {t('核心价值枢纽', 'Core Value Pillars')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
            {[
              { zh: "立足高远", en: "Visionary", sub_zh: "洞察产业趋势与国家战略。", sub_en: "Insights into industry trends and national strategies.", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800" },
              { zh: "路径坚实", en: "Solid Paths", sub_zh: "敬畏风险，构建闭环。", sub_en: "Risk awareness, building closed-loop systems.", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800" },
              { zh: "价值共生", en: "Synergy", sub_zh: "与伙伴共筑长期价值。", sub_en: "Building long-term value with our partners.", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="h-[600px] bg-surface border border-white/5 relative group p-10 flex flex-col justify-end overflow-hidden transition-all hover:border-[#D4AF37]/30"
              >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="absolute inset-0 border-[1px] border-[#D4AF37] opacity-0 group-hover:opacity-20 scale-95 group-hover:scale-100 transition-all duration-1000 ease-out" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                  
                  <div className="relative z-20 transition-all duration-500">
                    <h3 className="text-3xl font-serif font-medium text-[#FFFFFF] mb-4">
                      {language === 'zh' ? item.zh : item.en}
                    </h3>
                    <p className="text-white text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                      {language === 'zh' ? item.sub_zh : item.sub_en}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/10 opacity-60 group-hover:opacity-100 transition-all duration-500">
                      <Link href="/philosophy" className="text-[#D4AF37] text-sm tracking-widest uppercase hover:text-white flex items-center gap-2">
                        {t('探索详情', 'Explore More')} 
                        <span className="text-xl">&rarr;</span>
                      </Link>
                    </div>
                  </div>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* 模块四 & 模块五：星系概览与最新动态 (Split Layout) */}
      <Section className="bg-surface !px-0 !py-0 flex flex-col lg:flex-row min-h-screen">
        {/* 左侧：动态地图区域 */}
        <div className="w-full lg:w-2/5 p-10 lg:p-24 relative flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 group">
          <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-60 transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-glow/20 via-transparent to-transparent"></div>
          
          <div className="relative z-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-light mb-4">
              {t('峰壑星系网络', 'FH Galaxy Network')}
            </h2>
            <p className="text-white mb-16 text-lg max-w-md">
              {t('总部中央战略指挥与全国区域俱乐部节点交汇的广袤版图。', 'The intersection of central strategy and regional nodes across the global landscape.')}
            </p>
            
            <div className="relative h-64 lg:h-96 w-full max-w-xl">
              <div className="absolute inset-0 bg-surface border border-white/10 rounded-3xl overflow-hidden relative">
                 <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] animate-pulse">
                    <div className="absolute -top-10 -left-10 w-24 h-24 border border-glow/30 rounded-full animate-ping opacity-50"></div>
                 </div>
                 <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title={t('华东分部', 'East China Branch')}></div>
                 <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title={t('华南分部', 'South China Branch')}></div>
                 <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title={t('西南节点', 'Southwest Node')}></div>
              </div>
            </div>
            <Link href="/galaxy" className="inline-block mt-8 text-sm uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/30 pb-1">
              {t('进入星系漫游', 'Enter Galaxy Map')}
            </Link>
          </div>
        </div>

        {/* 右侧：最新动态时间轴 */}
        <div className="w-full lg:w-3/5 p-10 lg:p-24 bg-background flex flex-col justify-center">
          <h3 className="text-sm tracking-[0.3em] font-bold text-white uppercase mb-12">
            {t('最新动态', 'Latest Updates')}
          </h3>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              { date: "2026.04", zh: "生态基金规模破百亿", en: "Fund AUM Exceeds 10B", desc_zh: "峰壑体系基石基金圆满完成新一期超募。", desc_en: "Flagship fund completes oversubscription phase." },
              { date: "2026.03", zh: "华东大区俱乐部启幕", en: "East China Club Launch", desc_zh: "总部极核模式进一步辐射长三角高价值实业链。", desc_en: "Expanded presence in Yangtze River Delta region." },
              { date: "2026.02", zh: "陪跑企业敲钟上市", desc_zh: "赋能三年，合作标的成功登顶，兑现100%承诺。", en: "Portfolio IPO Success", desc_en: "Partner enterprise successfully lists after 3-year growth phase." }
            ].map((feed, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-black group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all text-white/50 z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-[#D4AF37] transition-colors"></div>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 border border-transparent group-hover:border-white/5 group-hover:bg-surface/50 transition-all rounded-sm">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest block mb-2">{feed.date}</span>
                  <h4 className="text-lg text-white mb-1">{language === 'zh' ? feed.zh : feed.en}</h4>
                  <p className="text-sm text-white">{language === 'zh' ? feed.desc_zh : feed.desc_en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* 模块六：峰壑之问 */}
      <Section className="relative bg-surface min-h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/fhzb-1400/videos/背景_1.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-glow/10 via-transparent to-transparent z-15 pointer-events-none" />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl cursor-default">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h2 className={`font-serif max-w-3xl leading-relaxed text-[#FFFFFF] italic mb-10 ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
              “{language === 'zh' ? questions[currentQuestion].zh : questions[currentQuestion].en}”
            </h2>
          </motion.div>
          <div className="flex gap-2 justify-center mb-16">
            {questions.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 rounded-full transition-all duration-500 ${idx === currentQuestion ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Link href="/contact" className="group inline-flex flex-col items-center">
              <span className="text-sm uppercase tracking-widest text-[#D4AF37] mb-6 font-bold">
                {t('开启攀登之路', 'Start Your Ascent')}
              </span>
              <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                &rarr;
              </div>
            </Link>
          </motion.div>
        </div>
      </Section>
    </PageTransition>
  );
}
