"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // 峰壑之问 简易轮播状态
  const questions = [
    "我们绘制的是空中楼阁，还是登峰地图？",
    "我们提供的是奇迹预言，还是经过压力测试的上升系统？",
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
          {/* 云海翻腾的视频占位 - 采用深邃的 CSS 渐变与模糊模拟 */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-50 mix-blend-screen"
            poster="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2560" // 壮丽冰川暗调图作为后备
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        </motion.div>
        
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-[#ECECEC] drop-shadow-2xl"
          >
            资本遇见雄心<br />我们共筑峰峦
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <Link href="/contact" className="px-10 py-5 bg-transparent border border-white/20 hover:bg-white hover:text-black transition-all font-medium tracking-widest text-sm uppercase">
              成为生态伙伴
            </Link>
            <Link href="/os" className="px-10 py-5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all font-medium tracking-widest text-sm uppercase">
              探索资本路径
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 模块二：峰壑宣言 */}
      <Section className="bg-[#030303] items-center text-center overflow-hidden relative min-h-screen">
        {/* 背景山脉剪影，极端暗色淡入 */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-10 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560')] bg-cover bg-center mix-blend-overlay pointer-events-none"></div>
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-20%" }}
           variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
           }}
           className="relative z-10 max-w-5xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#D4AF37]/80 mb-6 tracking-widest">
            真正的资本，
          </h2>
          <h3 className="text-3xl md:text-5xl font-light leading-relaxed text-gray-400">
            是产业文明的<span className="text-white relative font-medium">加速器<span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#D4AF37]" /></span>，<br/>
            而非收割器。
          </h3>
        </motion.div>
      </Section>

      {/* 模块三：三大价值入口 */}
      <Section className="gap-16 bg-[#050505] !py-24">
        <div className="text-center mb-10">
          <h2 className="text-sm tracking-[0.3em] font-bold text-gray-600 uppercase">核心价值枢纽</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
            {[
              { title: "立足高远", subtitle: "洞察产业趋势与国家战略。", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800" },
              { title: "路径坚实", subtitle: "敬畏风险，构建闭环。", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800" },
              { title: "价值共生", subtitle: "与伙伴共筑长期价值。", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="h-[600px] bg-[#0c0c0c] border border-white/5 relative group p-10 flex flex-col justify-end overflow-hidden transition-all hover:border-[#D4AF37]/30"
              >
                  {/* 背景深色图像/等高线隐喻 */}
                  <div className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-40 transition-opacity duration-1000 saturate-0 hover:saturate-100 mix-blend-luminosity" style={{ backgroundImage: `url(${item.img})` }}></div>
                   {/* 悬停时的金色等高线层模拟 */}
                  <div className="absolute inset-0 border-[1px] border-[#D4AF37] opacity-0 group-hover:opacity-10 scale-95 group-hover:scale-100 transition-all duration-1000 ease-out" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 transition-opacity group-hover:opacity-60"></div>
                  
                  <div className="relative z-20 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-4xl font-medium text-gray-300 group-hover:text-white transition-colors mb-4">{item.title}</h3>
                    <p className="text-gray-500 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{item.subtitle}</p>
                    <div className="mt-8 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all delay-200">
                      <Link href="/philosophy" className="text-[#D4AF37] text-sm tracking-widest uppercase hover:text-white">探索详情 &rarr;</Link>
                    </div>
                  </div>
              </motion.div>
            ))}
        </div>
      </Section>

      {/* 模块四 & 模块五：星系概览与最新动态 (Split Layout) */}
      <Section className="bg-[#020202] !px-0 !py-0 flex flex-col lg:flex-row min-h-screen">
        {/* 左侧：动态地图区域 */}
        <div className="w-full lg:w-3/5 p-10 lg:p-24 relative flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 group">
          <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent"></div>
          
          <div className="relative z-20">
            <h2 className="text-4xl lg:text-5xl font-light mb-4">峰壑星系网络</h2>
            <p className="text-gray-500 mb-16 text-lg max-w-md">总部中央战略指挥与全国区域俱乐部节点交汇的广袤版图。</p>
            
            {/* 抽象节点地图模拟 */}
            <div className="relative h-64 lg:h-96 w-full max-w-xl">
              <div className="absolute inset-0 bg-[#080808] border border-white/10 rounded-3xl overflow-hidden relative">
                 <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#D4AF37] shadow-[0_0_20px_#D4AF37] animate-pulse">
                    <div className="absolute -top-10 -left-10 w-24 h-24 border border-[#D4AF37]/30 rounded-full animate-ping opacity-50"></div>
                 </div>
                 {/* Satellite nodes */}
                 <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title="华东分部"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title="华南分部"></div>
                 <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-white/40 hover:bg-white transition-colors cursor-pointer" title="西南节点"></div>
              </div>
            </div>
            <Link href="/galaxy" className="inline-block mt-8 text-sm uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/30 pb-1">
              进入星系漫游
            </Link>
          </div>
        </div>

        {/* 右侧：最新动态时间轴 */}
        <div className="w-full lg:w-2/5 p-10 lg:p-24 bg-[#050505] flex flex-col justify-center">
          <h3 className="text-sm tracking-[0.3em] font-bold text-gray-600 uppercase mb-12">最新动态</h3>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {[
              { date: "2026.04", title: "生态基金规模破百亿", desc: "峰壑体系基石基金圆满完成新一期超募。" },
              { date: "2026.03", title: "华东大区俱乐部启幕", desc: "总部极核模式进一步辐射长三角高价值实业链。" },
              { date: "2026.02", title: "陪跑企业敲钟上市", desc: "赋能三年，合作标的成功登顶，兑现100%承诺。" }
            ].map((feed, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-black group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all text-white/50 z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-[#D4AF37] transition-colors"></div>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 border border-transparent group-hover:border-white/5 group-hover:bg-[#111] transition-all rounded-sm">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest block mb-2">{feed.date}</span>
                  <h4 className="text-lg text-gray-200 mb-1">{feed.title}</h4>
                  <p className="text-sm text-gray-500">{feed.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* 模块六：峰壑之问 */}
      <Section className="relative bg-[#020202] min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景静谧视频层 - 设计工作台草图 */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 brightness-50 mix-blend-screen grayscale"
            poster="https://images.unsplash.com/photo-1497250681558-e155bc812920?auto=format&fit=crop&q=80&w=2560" // 工作台草图后备图
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl cursor-default">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <h2 className="text-3xl md:text-5xl max-w-3xl leading-relaxed text-[#ECECEC] font-serif italic mb-6">
              “{questions[currentQuestion]}”
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
              <span className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">开启攀登之路</span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
                &rarr;
              </div>
            </Link>
          </motion.div>
        </div>
      </Section>
    </PageTransition>
  );
}
