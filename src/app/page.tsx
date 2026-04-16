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
      <Section className="relative overflow-hidden bg-black !min-h-0 !px-6 !py-16 md:!px-10 md:!py-[4.5rem] lg:!px-20 lg:!py-20">
        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[720px] text-left"
          >
            <p className="mb-8 text-sm tracking-[0.16em] text-white/88 md:mb-10">
              {t("峰壑宣言", "Peak & Valley Manifesto")}
            </p>

            {language === "zh" ? (
              <h3 className="font-serif text-[clamp(2.9rem,5.8vw,5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
                <span className="block">真正的资本</span>
                <span className="block">是产业文明的加速器</span>
                <span className="block">而非收割器</span>
              </h3>
            ) : (
              <h2 className="font-serif text-[clamp(2.5rem,4.5vw,5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
                <span className="block">True capital</span>
                <span className="block">accelerates industrial civilization</span>
                <span className="block">instead of harvesting it</span>
              </h2>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] overflow-hidden bg-transparent">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/35" />
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                src="/fhzb-1400/videos/block-compressed.mp4"
                className="h-full w-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 模块三：三大价值入口 */}
      <Section className="relative overflow-hidden bg-[#121212] !min-h-0 !px-0 !py-12 md:!py-14 lg:!py-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="mb-8 text-center md:mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[2rem] font-bold tracking-[0.08em] text-white md:text-[2.5rem]"
            >
              {t("核心价值枢纽", "Core Value Hub")}
            </motion.h2>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 overflow-hidden border-y border-white/10 md:grid-cols-3">
            {[
              {
                type: "image" as const,
                zh: "立足高远",
                en: "Visionary Reach",
                subZh: "洞察产业趋势与国家战略。",
                subEn: "Insights into industry trends and national strategy.",
                img: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=1200",
                href: "/philosophy",
              },
              {
                type: "image" as const,
                zh: "根系中国，培育创新“沃土”",
                en: "Rooted in China, cultivating innovation",
                img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
                href: "/galaxy",
              },
              {
                type: "image" as const,
                zh: "播种硬核，耕耘未来",
                en: "Plant hard power, cultivate the future",
                img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200",
                href: "/alliance",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: "easeOut" }}
                className="relative overflow-hidden"
              >
                <Link href={item.href} className="group relative flex h-[330px] w-full overflow-hidden md:h-[360px] lg:h-[375px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-[1.14] transition-transform duration-700 group-hover:scale-[1.2]"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />

                  <div className="absolute inset-0 z-10 flex w-full items-end justify-center px-6 pb-8 text-center text-white transition-opacity duration-300 group-hover:opacity-0">
                    <div className="mx-auto w-full max-w-[360px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
                      <h3 className="text-[1.9rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.2rem]">
                        {language === "zh" ? item.zh : item.en}
                      </h3>
                      {"subZh" in item ? (
                        <p className="mx-auto mt-3 max-w-[280px] text-sm leading-relaxed text-white/92 md:text-[0.95rem]">
                          {language === "zh" ? item.subZh : item.subEn}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="absolute inset-0 z-20 bg-[#b89459] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-0 z-30 flex w-full flex-col items-center justify-center px-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="mx-auto w-full max-w-[360px]">
                      <h3 className="text-[1.9rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.2rem]">
                        {language === "zh" ? item.zh : item.en}
                      </h3>
                      {"subZh" in item ? (
                        <p className="mx-auto mt-3 max-w-[280px] text-sm leading-relaxed text-white/92 md:text-[0.95rem]">
                          {language === "zh" ? item.subZh : item.subEn}
                        </p>
                      ) : null}
                      <div className="mt-8 h-px w-full bg-white/55" />
                      <span className="mt-4 inline-flex items-center gap-2 text-sm tracking-[0.08em] text-white/94">
                        {t("探索详情", "Explore More")}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>

                {idx < 2 ? <div className="absolute right-0 top-0 hidden h-full w-px bg-white/10 md:block" /> : null}
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
            <h2 className={`font-serif max-w-3xl leading-relaxed text-[#FFFFFF]  mb-10 ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
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
