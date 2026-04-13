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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b7893b]/5 to-[#000000]/30 z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#b7893b]/10 rounded-full blur-[120px] pointer-events-none z-10" />
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
            <Link href="/os" className="px-10 py-5 bg-[#b7893b]/10 text-[#b7893b] border border-[#b7893b]/50 hover:bg-[#b7893b] hover:text-black transition-all font-medium tracking-widest text-sm uppercase">
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
          <h2 className={`font-serif text-[#b7893b] mb-6 tracking-widest drop-shadow-lg ${language === 'zh' ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-5xl'}`}>
            {t('真正的资本，', 'True capital')}
          </h2>
          <h3 className={`font-serif font-light leading-relaxed text-[#FFFFFF] drop-shadow-md ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
            {t('是产业文明的', 'is the accelerator of')} <span className="text-white relative font-medium underline decoration-[#b7893b] decoration-2 underline-offset-8">{t('加速器', 'industrial civilization')}</span>
            <br/>{t('而非收割器。', 'rather than its reaper.')}
          </h3>
        </motion.div>
      </Section>

      {/* 模块三：三大价值入口 */}
      <Section className="bg-black !py-32 relative overflow-hidden px-6">
        <div className="absolute -left-20 top-20 w-96 h-96 bg-[#b7893b]/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white tracking-widest"
          >
            {t('核心价值枢纽', 'Core Value Hub')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full max-w-7xl mx-auto border border-white/10">
            {[
              { zh: "立足高远", en: "Visionary", sub_zh: "洞察产业趋势与国家战略。", sub_en: "Insights into industry trends and national strategies.", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800" },
              { zh: "路径坚实", en: "Solid Paths", sub_zh: "敬畏风险，构建闭环。", sub_en: "Risk awareness, building closed-loop systems.", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800" },
              { zh: "价值共生", en: "Synergy", sub_zh: "与伙伴共筑长期价值。", sub_en: "Building long-term value with our partners.", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="h-[500px] relative group overflow-hidden flex flex-col items-center justify-center p-12 text-center"
              >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-all duration-500"></div>

                  {/* Golden Slide-up Background */}
                  <div className="absolute inset-0 bg-[#b7893b]/80 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-20"></div>
                  
                  {/* Content */}
                  <div className="relative z-30 transition-all duration-500">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide drop-shadow-lg">
                      {language === 'zh' ? item.zh : item.en}
                    </h3>
                    <p className="text-white/90 text-lg font-normal mb-10 max-w-[280px] leading-relaxed">
                      {language === 'zh' ? item.sub_zh : item.sub_en}
                    </p>
                    
                    <div className="w-full h-[1px] bg-white/30 mb-8" />

                    <Link href="/philosophy" className="inline-flex items-center gap-2 text-white text-sm tracking-widest uppercase hover:underline">
                      {t('探索详情', 'Explore More')} 
                      <span className="text-lg">→</span>
                    </Link>
                  </div>

                  {/* Border lines for grid effect */}
                  <div className="absolute right-0 top-10 bottom-10 w-[1px] bg-white/10 hidden md:block" />
              </motion.div>
            ))}
        </div>
      </Section>


      {/* 模块四 & 模块五：星系概览与最新动态 (Split Layout) */}
      <Section className="bg-[#050505] !px-0 !py-0 flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
        {/* Universal Map Background Layer */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000')] bg-cover bg-center mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>

        {/* 左侧：峰壑星系网络 */}
        <div className="w-full lg:w-1/2 p-12 lg:p-32 relative flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#b7893b] text-sm tracking-[0.4em] font-bold uppercase mb-4 block">
              GALAXY NETWORK
            </span>
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tighter">
              {t('峰壑星系网络', 'Galaxy Network')}
            </h2>
            <p className="text-white/70 mb-12 text-xl max-w-lg leading-relaxed font-normal">
              {t('总部中央战略指挥与全国区域俱乐部节点交汇的广袤版图。', 'The intersection of central strategy and regional nodes across the global landscape.')}
            </p>
            
            <Link href="/galaxy" className="inline-flex items-center gap-4 text-[#b7893b] text-sm uppercase tracking-[0.2em] font-bold group">
              <span className="border-b border-[#b7893b]/30 pb-1 group-hover:border-[#b7893b] transition-all">
                {t('进入星系漫游', 'Enter Galaxy Map')}
              </span>
              <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* 右侧：最新动态 */}
        <div className="w-full lg:w-1/2 p-12 lg:p-32 bg-black/40 backdrop-blur-sm z-10 flex flex-col justify-start pt-32 lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-[#b7893b] text-sm tracking-[0.4em] font-bold uppercase mb-2">
              LATEST UPDATES
            </h3>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              {t('最新动态', 'News')}
            </h2>
          </motion.div>

          <div className="space-y-8 max-w-xl">
            {[
              { date: "2026.04", zh: "深创投集团多名女性投资人荣登清科投资界、单", en: "Investment Leaders Recognized", desc_zh: "近日，多家投股权投资服务机构相继发布女性投资人榜单。深创投多名女性投资人进入榜单。", desc_en: "Several female partners recognized for their contribution to the industry." },
              { date: "2026.03", zh: "生态基金规模破百亿，跨越重要里程碑", en: "Fund AUM Milestone", desc_zh: "近日，多家股权投资机构相继发布年度报告，峰壑体系基金规模正式突破百亿大关。", desc_en: "AUM surpasses major milestone after successful fundraising rounds." },
              { date: "2026.02", zh: "华东大区俱乐部正式启幕，极核模式加速", en: "East China Hub Opening", desc_zh: "战略指挥部与区域节点深度互动，赋能长三角高价值产业链发展。", desc_en: "New regional hub establishes stronger presence in key economic zones." }
            ].map((feed, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative pl-8 border-l border-white/10 hover:border-[#b7893b] transition-colors pb-8"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-white/20 group-hover:bg-[#b7893b] transition-colors border-2 border-black"></div>
                
                <span className="text-[#b7893b] text-xs font-bold tracking-widest block mb-3">{feed.date}</span>
                <h4 className="text-xl text-white font-bold mb-3 group-hover:text-[#b7893b] transition-colors">
                  {language === 'zh' ? feed.zh : feed.en}
                </h4>
                <p className="text-base text-white/50 line-clamp-2 leading-relaxed font-normal">
                  {language === 'zh' ? feed.desc_zh : feed.desc_en}
                </p>
              </motion.div>
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
                className={`h-1 rounded-full transition-all duration-500 ${idx === currentQuestion ? 'w-8 bg-[#b7893b]' : 'w-2 bg-white/20'}`}
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
              <span className="text-sm uppercase tracking-widest text-[#b7893b] mb-6 font-bold">
                {t('开启攀登之路', 'Start Your Ascent')}
              </span>
              <div className="w-14 h-14 rounded-full border border-[#b7893b]/30 flex items-center justify-center group-hover:bg-[#b7893b] group-hover:text-black transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                &rarr;
              </div>
            </Link>
          </motion.div>
        </div>
      </Section>
    </PageTransition>
  );
}
