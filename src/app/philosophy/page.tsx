"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 平原与峰峦对比视差
  const plainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const peakOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const peakScale = useTransform(scrollYProgress, [0.05, 0.25], [0.95, 1.05]);

  const [activeValue, setActiveValue] = useState<number | null>(null);

  const values = [
    { title: "专业极客", desc: "以极致的专业精神对待尽调与风控，绝不用情绪做决策。" },
    { title: "生态共建", desc: "打破资本孤岛，与实业者、区域合伙人结成生死同盟。" },
    { title: "伙伴优先", desc: "在任何利益冲突面前，保障生态网络中伙伴的优先权益。" },
    { title: "行诺致远", desc: "不作无法兑现的收益担保，一旦承诺必用全部身家背书。" },
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="relative bg-[#050505]">
        
        {/* 1. 峰峦思维：思维维度的对比剧场 */}
        <section className="relative w-full h-[150vh]">
          {/* Header */}
          <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 bg-[#030303] z-0">
               {/* 纯黑后备，加上极其微弱的噪点或网格纹理 */}
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* 平原思维层 */}
            <motion.div 
              style={{ opacity: plainOpacity }} 
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <h2 className="text-4xl md:text-6xl font-light text-gray-500 tracking-widest uppercase line-through decoration-1 decoration-gray-600">
                平原思维
              </h2>
              <p className="mt-6 text-gray-600 tracking-wider">线性增长 / 零和博弈 / 短期收割</p>
            </motion.div>

            {/* 峰峦思维层 */}
            <motion.div 
              style={{ opacity: peakOpacity, scale: peakScale }} 
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"
            >
               {/* 峰峦背影 */}
               <div className="absolute bottom-0 w-full h-1/2 opacity-20 bg-[url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=2560')] bg-cover bg-bottom mix-blend-screen"></div>
               <h2 className="text-6xl md:text-8xl font-bold text-[#ECECEC] tracking-tight mb-8 drop-shadow-2xl">
                 峰峦思维
               </h2>
               <div className="flex gap-8 text-lg font-light text-[#D4AF37] tracking-widest mt-4">
                 <span>立足高远</span>
                 <span className="opacity-50">/</span>
                 <span>路径坚实</span>
                 <span className="opacity-50">/</span>
                 <span>创造生态</span>
                 <span className="opacity-50">/</span>
                 <span>价值共生</span>
               </div>
            </motion.div>
          </div>
        </section>

        {/* 2. 使命·愿景·价值观 */}
        <Section className="bg-[#050505] !py-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              {/* 左侧：使命与愿景 */}
              <div className="space-y-24">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-6">Mission / 使命</h3>
                  <p className="text-3xl md:text-5xl font-light leading-snug text-gray-200">
                    赋能实体产业攀登资本峰峦，<br />
                    守护 <span className="font-serif italic text-[#D4AF37]">长期价值</span> 穿越时代周期。
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-6">Vision / 愿景</h3>
                  <p className="text-2xl md:text-4xl font-light leading-relaxed text-gray-400">
                    成为全球创新经济体中，<br />最具信任感的产业资本共生平台。
                  </p>
                </motion.div>
              </div>

              {/* 右侧：价值观互动列表 */}
              <div className="relative">
                 <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-10">Values / 价值观</h3>
                 <div className="flex flex-col border-t border-white/10">
                   {values.map((v, idx) => (
                     <div 
                       key={idx} 
                       className="group border-b border-white/10 overflow-hidden cursor-pointer"
                       onClick={() => setActiveValue(activeValue === idx ? null : idx)}
                     >
                       <div className="py-8 flex justify-between items-center transition-colors group-hover:text-[#ECECEC] text-gray-400">
                         <span className="text-3xl md:text-4xl font-light tracking-wide">{v.title}</span>
                         <span className={`transform transition-transform duration-500 ${activeValue === idx ? 'rotate-45 text-[#D4AF37]' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                               <path d="M12 5v14M5 12h14"/>
                            </svg>
                         </span>
                       </div>
                       <motion.div 
                         initial={false}
                         animate={{ height: activeValue === idx ? 'auto' : 0, opacity: activeValue === idx ? 1 : 0 }}
                         className="overflow-hidden"
                       >
                         <p className="pb-8 text-gray-500 text-lg leading-relaxed max-w-lg">{v.desc}</p>
                       </motion.div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. 三大文化支柱 */}
        <Section className="bg-[#020202] text-center !min-h-[70vh]">
           <h2 className="text-sm tracking-[0.3em] font-bold text-gray-600 uppercase mb-20">文化支柱</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
             {[
               { no: "01", title: "闭环交付文化", desc: "规划·执行·反馈·闭环。没有终点的许诺皆为虚妄。" },
               { no: "02", title: "第一性原理思维", desc: "剥离行业经验与跟风情绪，回归事物最硬核的本质属性。" },
               { no: "03", title: "全球化智慧文化", desc: "拥有俯视周期的国际格局，更能俯身执行本土的泥泞深耕。" }
             ].map((pillar, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.15 }}
                 className="p-16 flex flex-col text-left group hover:bg-[#070707] transition-colors duration-500"
               >
                  <span className="text-5xl font-light text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors block mb-12 font-serif">{pillar.no}</span>
                  <h3 className="text-3xl text-gray-200 mb-6 font-medium tracking-wide">{pillar.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{pillar.desc}</p>
               </motion.div>
             ))}
           </div>
        </Section>

        {/* 4. 文化象征与仪式 */}
        <section className="w-full py-32 bg-[#050505] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <h2 className="text-4xl font-light mb-6">仪式即烙印</h2>
            <p className="text-xl text-gray-500 max-w-2xl">从“登峰路演会”到“生态共建日”，共同的回忆与承诺兑现大厅，编织出俱乐部无可替代的内部向心力。</p>
          </div>
          {/* 画廊长卷 */}
          <div className="flex gap-6 px-6 pb-12 overflow-x-auto snap-x hide-scrollbar">
             {[
               { label: "登峰路演会", img: "https://images.unsplash.com/photo-1540317580384-e5d43867eaa8?auto=format&fit=crop&w=800&q=80" },
               { label: "生态共建日", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" },
               { label: "承诺兑现典礼", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80" },
               { label: "闭门极客局", img: "https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&w=800&q=80" },
             ].map((pic, idx) => (
                <div key={idx} className="min-w-[70vw] md:min-w-[400px] h-[500px] relative snap-center group overflow-hidden border border-white/5 bg-[#111]">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                   <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" style={{ backgroundImage: `url(${pic.img})`}}></div>
                   <h3 className="absolute bottom-8 left-8 z-20 text-white font-medium text-2xl tracking-widest">{pic.label}</h3>
                </div>
             ))}
          </div>
        </section>

        {/* 5. 创始人的信：全屏长卷阅读 */}
        <section className="relative w-full min-h-[120vh] bg-[#020202] border-t border-white/10 flex items-center justify-center py-40">
           <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-screen grayscale"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#020202]/80 to-[#050505]"></div>
           
           <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left">
              <span className="block text-[#D4AF37] uppercase tracking-widest text-sm mb-12 font-bold">— 创始人的信</span>
              <h1 className="text-4xl md:text-6xl font-serif text-[#ECECEC] mb-16 leading-relaxed">
                《共筑峰峦<span className="block text-2xl text-gray-400 mt-4 font-sans font-light">一封关于价值与未来的信</span>》
              </h1>
              
              <div className="space-y-10 text-xl text-gray-400 font-light leading-loose">
                <p>致全球生态伙伴与前行者：</p>
                <p>资本的本质不应该是冰冷的数字堆砌，更不是一场击鼓传花的零和游戏。当我们创立峰壑的那一天起，就立下一条铁律——回到实业的泥泞中去，替具有鸿鹄之志的创业者扫平险障，测绘等高线。</p>
                <p>我们拒绝平原上的拥挤。我们要做的，是结伴攀登陡峭的冰川。</p>
                <p>这注定是一条少有人走的路，但也正因为如此，在峰顶相见的时刻才尤为震撼。我们的生态系统、区域战友、每一位LP，都是这条绳索上的同袍。我们信奉极客般的严密风控，更信奉行诺致远的古老契约。</p>
                <p>前方不一定每天都有阳光，但我们的路标绝对坚固。</p>
              </div>

              <div className="mt-20 flex justify-end">
                 <div className="text-right">
                    <p className="text-white text-2xl font-serif italic opacity-80 mb-2">创始人签名</p>
                    <p className="text-sm tracking-widest text-[#D4AF37]">FENGHE CAPITAL</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </PageTransition>
  );
}
