"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Philosophy() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const plainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const peakOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const peakScale = useTransform(scrollYProgress, [0.05, 0.25], [0.95, 1.05]);

  const [activeValue, setActiveValue] = useState<number | null>(null);

  const values = [
    { zh: "专业极客", en: "Professional Geek", desc_zh: "以极致的专业精神对待尽调与风控，绝不用情绪做决策。", desc_en: "Uncompromising professionalism in due diligence and risk control, decision-making strictly free of emotion." },
    { zh: "生态共建", en: "Ecosystem Builder", desc_zh: "打破资本孤岛，与实业者、区域合伙人结成生死同盟。", desc_en: "Breaking capital silos, forming alliances with entrepreneurs and regional partners." },
    { zh: "伙伴优先", en: "Partners First", desc_zh: "在任何利益冲突面前，保障生态网络中伙伴的优先权益。", desc_en: "Prioritizing the rights and benefits of our partners within the ecosystem network." },
    { zh: "行诺致远", en: "Integrity for Longevity", desc_zh: "不作无法兑现的收益担保，一旦承诺必用全部身家背书。", desc_en: "Never make unrealistic promises; once committed, we stand by it with our reputations." },
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="relative bg-[#121212]">
        
        {/* 1. 峰峦思维：思维维度的对比剧场 */}
        <section className="relative w-full h-[150vh]">
          {/* Header */}
          <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-24">
            <div className="absolute inset-0 z-0">
               <img 
                 src="/videos/股市_3.jpg" 
                 className="absolute inset-0 w-full h-full object-cover"
                 alt="Philosophy Background"
               />
            </div>

            {/* 平原思维层 */}
            <motion.div 
              style={{ opacity: plainOpacity }} 
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <h2 className={`font-serif font-light text-white tracking-widest uppercase line-through decoration-1 decoration-gray-400 drop-shadow-2xl ${language === 'zh' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
                {t('平原思维', 'Linear Mindset')}
              </h2>
              <p className="mt-6 text-white tracking-wider drop-shadow-lg">
                {t('线性增长 / 零和博弈 / 短期收割', 'Linear Growth / Zero-sum / Short-term Harvest')}
              </p>
            </motion.div>

            {/* 峰峦思维层 */}
            <motion.div 
              style={{ opacity: peakOpacity, scale: peakScale }} 
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-b from-transparent via-[#121212]/20 to-[#121212]"
            >
               <img 
                 src="/videos/背景图_1.jpg"
                 className="absolute bottom-0 w-full h-1/2 object-cover"
                 alt="Background"
               />
               <h2 className={`font-serif font-bold text-[#ECECEC] tracking-tight mb-8 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl'}`}>
                 {t('峰峦思维', 'Summits Mindset')}
               </h2>
               <div className={`flex flex-wrap justify-center gap-4 md:gap-8 font-light text-[#D4AF37] tracking-widest mt-4 ${language === 'zh' ? 'text-lg' : 'text-sm md:text-base'}`}>
                 <span>{t('立足高远', 'VISION')}</span>
                 <span className="opacity-50">/</span>
                 <span>{t('路径坚实', 'EXECUTION')}</span>
                 <span className="opacity-50">/</span>
                 <span>{t('创造生态', 'ECOSYSTEM')}</span>
                 <span className="opacity-50">/</span>
                 <span>{t('价值共生', 'SYNERGY')}</span>
               </div>
            </motion.div>
          </div>
        </section>

        {/* 2. 使命·愿景·价值观 */}
        <Section className="bg-[#121212] !py-32 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-24">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-6">Mission / {t('使命', 'MISSION')}</h3>
                  <p className={`font-serif font-light leading-snug text-gray-200 ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                    {t('赋能实体产业攀登资本峰峦，', 'Empowering industries to climb capital summits,')}<br />
                    {t('守护', 'safeguarding')} <span className="font-serif italic text-[#D4AF37]">{t('长期价值', 'long-term value')}</span> {t('穿越时代周期。', 'through through historical cycles.')}
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-6">Vision / {t('愿景', 'VISION')}</h3>
                  <p className={`font-serif font-light leading-relaxed text-gray-400 ${language === 'zh' ? 'text-2xl md:text-4xl' : 'text-xl md:text-3xl'}`}>
                    {t('成为全球创新经济体中，', 'To become the most trusted industrial capital')}<br />
                    {t('最具信任感的产业资本共生平台。', 'synergy platform in the global innovation economy.')}
                  </p>
                </motion.div>
              </div>

              <div className="relative">
                 <h3 className="text-xs tracking-[0.4em] text-gray-500 uppercase font-bold mb-10">Values / {t('价值观', 'VALUES')}</h3>
                 <div className="flex flex-col border-t border-white/10">
                   {values.map((v, idx) => (
                     <div 
                       key={idx} 
                       className="group border-b border-white/10 overflow-hidden cursor-pointer"
                       onClick={() => setActiveValue(activeValue === idx ? null : idx)}
                     >
                       <div className="py-8 flex justify-between items-center transition-colors group-hover:text-[#ECECEC] text-gray-400">
                         <span className={`font-serif font-light tracking-wide ${language === 'zh' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                           {language === 'zh' ? v.zh : v.en}
                         </span>
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
                         <p className="pb-8 text-gray-500 text-lg leading-relaxed max-w-lg">
                           {language === 'zh' ? v.desc_zh : v.desc_en}
                         </p>
                       </motion.div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. 三大文化支柱 */}
        <Section className="bg-[#161616] text-center !min-h-[70vh] px-6">
           <h2 className="text-sm tracking-[0.3em] font-bold text-gray-600 uppercase mb-20">{t('文化支柱', 'CULTURAL PILLARS')}</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-white/5 divide-y md:divide-y-0 md:divide-x divide-white/5">
             {[
               { no: "01", zh: "闭环交付文化", en: "Closed-loop Culture", desc_zh: "规划·执行·反馈·闭环。没有终点的许诺皆为虚妄。", desc_en: "Plan, Execute, Feedback, Close. Promises without results are illusions." },
               { no: "02", zh: "第一性原理思维", en: "First Principles", desc_zh: "剥离行业经验与跟风情绪，回归事物最硬核的本质属性。", desc_en: "Strip away experience and emotion, return to the core essence of things." },
               { no: "03", zh: "全球化智慧文化", en: "Global Intelligence", desc_zh: "拥有俯视周期的国际格局，更能俯身执行本土的泥泞深耕。", desc_en: "International perspective on cycles, with deep-rooted local execution." }
             ].map((pillar, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.15 }}
                 className="p-16 flex flex-col text-left group hover:bg-[#070707] transition-colors duration-500"
               >
                  <span className="text-5xl font-serif font-light text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors block mb-12 font-serif">{pillar.no}</span>
                  <h3 className={`font-serif text-gray-200 mb-6 font-medium tracking-wide ${language === 'zh' ? 'text-3xl' : 'text-xl'}`}>
                    {language === 'zh' ? pillar.zh : pillar.en}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {language === 'zh' ? pillar.desc_zh : pillar.desc_en}
                  </p>
               </motion.div>
             ))}
           </div>
        </Section>

        {/* 4. 文化象征与仪式 */}
        <section className="w-full py-32 bg-[#121212] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
            <h2 className={`font-serif font-light mb-6 ${language === 'zh' ? 'text-4xl' : 'text-3xl'}`}>{t('仪式即烙印', 'Rituals as Imprints')}</h2>
            <p className="text-xl text-gray-500 max-w-2xl">{t('从“登峰路演会”到“生态共建日”，共同的回忆与承诺兑现大厅，编织出俱乐部无可替代的内部向心力。', 'From roadshows to ecosystem days, these shared memories and fulfilled promises weave an irreplaceable internal cohesion.')}</p>
          </div>
          <div className="flex gap-6 px-6 pb-12 overflow-x-auto snap-x hide-scrollbar">
             {[
               { zh: "登峰路演会", en: "Summits Roadshow", img: "https://images.unsplash.com/photo-1540317580384-e5d43867eaa8?auto=format&fit=crop&w=800&q=80" },
               { zh: "生态共建日", en: "Ecosystem Day", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80" },
               { zh: "承诺兑现典礼", en: "Commitment Fulfilling", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80" },
               { zh: "闭门极客局", en: "Closed-door Geek Session", img: "https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&w=800&q=80" },
             ].map((pic, idx) => (
                <div key={idx} className="min-w-[70vw] md:min-w-[400px] h-[500px] relative snap-center group overflow-hidden border border-white/5 bg-[#111]">
                   <div className="absolute inset-0 group-hover:bg-white/5 transition-colors duration-700 z-10"></div>
                   <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 group-hover:scale-110" style={{ backgroundImage: `url(${pic.img})`}}></div>
                   <h3 className="absolute bottom-8 left-8 z-20 text-white font-medium text-2xl font-serif tracking-widest">
                     {language === 'zh' ? pic.zh : pic.en}
                   </h3>
                </div>
             ))}
          </div>
        </section>

        {/* 5. 创始人的信：全屏长卷阅读 */}
        <section className="relative w-full min-h-[120vh] bg-[#161616] border-t border-white/10 flex items-center justify-center py-40">
           <div className="absolute inset-0 pointer-events-none opacity-60 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-screen grayscale"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#161616]/80 to-[#121212]"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none z-0"></div>
           
           <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left">
              <span className="block text-[#D4AF37] uppercase tracking-widest text-sm mb-12 font-bold">— {t('创始人的信', 'LETTER FROM FOUNDER')}</span>
              <h1 className={`font-serif text-[#ECECEC] mb-16 leading-relaxed ${language === 'zh' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
                {t('《共筑峰峦', 'Building Summits')} <span className={`block text-gray-400 mt-4 font-sans font-light ${language === 'zh' ? 'text-2xl' : 'text-xl'}`}>{t('一封关于价值与未来的信', 'A letter about value and the future')}</span>{t('》', '')}
              </h1>
              
              <div className="space-y-10 text-lg md:text-xl text-gray-400 font-light leading-loose">
                <p>{t('致全球生态伙伴与前行者：', 'To our global ecosystem partners and pioneers:')}</p>
                <p>
                  {t('资本的本质不应该是冰冷的数字堆砌，更不是一场击鼓传花的零和游戏。当我们创立峰壑的那一天起，就立下一条铁律——回到实业的泥泞中去，替具有鸿鹄之志的创业者扫平险障，测绘等高线。', 'Capital should not be cold numbers or a zero-sum game. Since day one, our iron rule has been to return to the reality of industry, removing obstacles for ambitious entrepreneurs.')}
                </p>
                <p>
                  {t('我们拒绝平原上的拥挤。我们要做的，是结伴攀登陡峭的冰川。', 'We refuse the congestion of the plains. We climb the steep glaciers together.')}
                </p>
                <p>
                  {t('这注定是一条少有人走的路，但也正因为如此，在峰顶相见的时刻才尤为震撼。我们的生态系统、区域战友、每一位LP，都是这条绳索上的同袍。我们信奉极客般的严密风控，更信奉行诺致远的古老契约。', 'This path is less traveled, but the summit view is more breathtaking. Our ecosystem, regional partners, and LPs are all on the same rope. We believe in strict risk control and ancient contracts.')}
                </p>
                <p>{t('前方不一定每天都有阳光，但我们的路标绝对坚固。', 'There may not be sun every day, but our signposts are solid.')}</p>
              </div>

              <div className="mt-20 flex justify-end">
                 <div className="text-right">
                    <p className="text-white text-2xl font-serif italic opacity-80 mb-2">{t('创始人签名', 'Founder Signature')}</p>
                    <p className="text-sm tracking-widest text-[#D4AF37]">FENGHE CAPITAL</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </PageTransition>
  );
}
