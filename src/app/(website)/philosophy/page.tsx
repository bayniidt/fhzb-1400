"use client"

import { PageTransition } from "@/components/ui/PageTransition"
import { Section } from "@/components/ui/Section"
import { useLanguage } from "@/context/LanguageContext"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { fetchContent } from "@/lib/api"
import {
  websiteHeroSubtitleClassName,
  websiteHeroTitleClassName,
  websiteSectionBodyClassName,
  websiteSectionEyebrowClassName,
  websiteSectionTitleClassName,
} from "@/lib/website-typography"

export default function Philosophy() {
  const { t, language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const plainOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const peakOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1])
  const peakScale = useTransform(scrollYProgress, [0.05, 0.25], [0.95, 1.05])

  const [activeValue, setActiveValue] = useState<number | null>(null)
  const [activePillar, setActivePillar] = useState(0)
  const [siteContent, setSiteContent] = useState<any>(null);

  useEffect(() => {
    fetchContent().then(setSiteContent);
  }, []);

  const getContent = (key: string, fallbackZh: string, fallbackEn: string) => {
    if (!siteContent || !siteContent[key]) return language === 'zh' ? fallbackZh : fallbackEn;
    return language === 'zh' ? siteContent[key].zh : siteContent[key].en;
  };

  const values = [
    {
      zh: getContent('phi_val1_title', "专业极客", "Professional Geek"),
      en: getContent('phi_val1_title', "专业极客", "Professional Geek"),
      desc_zh: getContent('phi_val1_desc', "以极致的专业精神对待尽调与风控，绝不用情绪做决策。", "Uncompromising professionalism in due diligence and risk control..."),
      desc_en: getContent('phi_val1_desc', "以极致的专业精神对待尽调与风控，绝不用情绪做决策。", "Uncompromising professionalism in due diligence and risk control...")
    },
    {
      zh: getContent('phi_val2_title', "生态共建", "Ecosystem Builder"),
      en: getContent('phi_val2_title', "生态共建", "Ecosystem Builder"),
      desc_zh: getContent('phi_val2_desc', "打破资本孤岛，与实业者、区域合伙人结成生死同盟。", "Breaking capital silos..."),
      desc_en: getContent('phi_val2_desc', "打破资本孤岛，与实业者、区域合伙人结成生死同盟。", "Breaking capital silos...")
    },
    {
      zh: getContent('phi_val3_title', "伙伴优先", "Partners First"),
      en: getContent('phi_val3_title', "伙伴优先", "Partners First"),
      desc_zh: getContent('phi_val3_desc', "在任何利益冲突面前，保障生态网络中伙伴的优先权益。", "Prioritizing the rights..."),
      desc_en: getContent('phi_val3_desc', "在任何利益冲突面前，保障生态网络中伙伴的优先权益。", "Prioritizing the rights...")
    },
    {
      zh: getContent('phi_val4_title', "行诺致远", "Integrity for Longevity"),
      en: getContent('phi_val4_title', "行诺致远", "Integrity for Longevity"),
      desc_zh: getContent('phi_val4_desc', "不作无法兑现的收益担保，一旦承诺必用全部身家背书。", "Never make unrealistic promises..."),
      desc_en: getContent('phi_val4_desc', "不作无法兑现的收益担保，一旦承诺必用全部身家背书。", "Never make unrealistic promises...")
    },
  ]

  return (
    <PageTransition>
      <div ref={containerRef} className="relative bg-[#000000]">

        {/* 1. 峰峦思维：思维维度的对比剧场 */}
        <section id="peak-thinking" className="relative w-full h-[150vh]">
          {/* Header */}
          <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden pt-24">
            <div className="absolute inset-0 z-0">
              <img
                src={getContent('phi_hero_bg', '/fhzb/videos/股市_3.jpg', '/fhzb/videos/股市_3.jpg')}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Philosophy Background"
              />
            </div>

            {/* 平原思维层 */}
            <motion.div
              style={{ opacity: plainOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10"
            >
              <h2 className={websiteHeroTitleClassName(language, "uppercase decoration-1 decoration-gray-400")}>
                {getContent('phi_hero_title', '平原思维与峰峦思维', 'Linear Mindset')}
              </h2>
              <p className={websiteHeroSubtitleClassName(language, "mt-6 max-w-4xl text-center tracking-wider")}>
                {t('立足高远、路径坚实、创造生态、价值共生', 'Linear Growth / Zero-sum / Short-term Harvest')}
              </p>
            </motion.div>

            {/* 峰峦思维层 */}
            <motion.div
              style={{ opacity: peakOpacity, scale: peakScale }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-gradient-to-b from-transparent via-[#000000]/20 to-[#000000]"
            >
              {/* <img
                src="/fhzb/videos/背景图_1.jpg"
                className="absolute bottom-0 w-full h-1/2 object-cover"
                alt="Background"
              /> */}
              <h2 className={`font-serif font-bold text-[#FFFFFF] tracking-tight mb-8 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl' : 'text-5xl md:text-7xl'}`}>
                {t('', '')}
              </h2>
              <div className={`flex flex-wrap justify-center gap-4 md:gap-8 font-bold  tracking-widest mt-4 ${language === 'zh' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
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
        <Section id="mvv" className="bg-[#000000] !py-32 px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl tracking-[0.4em] text-[#b7893b] uppercase font-bold mb-6">Mission / {t('使命', 'MISSION')}</h3>
                  <p className={`font-serif font-light leading-snug text-white ${language === 'zh' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
                    {getContent('phi_mission_content', '赋能实体产业攀登资本峰峦，', 'Empowering industries to climb capital summits,')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl tracking-[0.4em] text-[#b7893b] uppercase font-bold mb-6">Vision / {t('愿景', 'VISION')}</h3>
                  <p className={`font-serif font-light leading-relaxed text-white ${language === 'zh' ? 'text-5xl' : 'text-5xl'}`}>
                    {getContent('phi_vision_content', '成为全球创新经济体中，最具信任感的产业资本共生平台。', 'To become the most trusted industrial capital platform.')}
                  </p>
                </motion.div>
              </div>

              <div className="relative">
                <h3 className="text-2xl tracking-[0.4em] text-[#b7893b] uppercase font-bold mb-10">Values / {t('价值观', 'VALUES')}</h3>
                <div className="flex flex-col border-t border-white/10">
                  {values.map((v, idx) => (
                    <div
                      key={idx}
                      className="text-5xl group border-b border-white/10 overflow-hidden cursor-pointer"
                      onClick={() => setActiveValue(activeValue === idx ? null : idx)}
                    >
                      <div className="py-8 flex justify-between items-center transition-colors group-hover:text-[#FFFFFF] text-white">
                        <span className={`font-serif font-light tracking-wide ${language === 'zh' ? 'text-5xl' : 'text-5xl'}`}>
                          {language === 'zh' ? v.zh : v.en}
                        </span>
                        <span className={`transform transition-transform duration-500 ${activeValue === idx ? 'rotate-45 text-[#b7893b]' : ''}`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{ height: activeValue === idx ? 'auto' : 0, opacity: activeValue === idx ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <p className={`pb-8 text-white leading-relaxed max-w-lg ${idx === 0 ? 'text-4xl' : 'text-5xl'}`}>
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

        {/* 3. 三大文化支柱：左文右视剧场结构 */}
        <Section id="pillars" className="bg-[#000000] !py-40 px-6 relative overflow-hidden">
          {/* 背景装饰漂浮元素 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-80 border border-white/5 rotate-12 opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/3 w-40 h-56 border border-white/5 -rotate-12 opacity-10"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 border border-white/5 rotate-45 opacity-15"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className={websiteSectionEyebrowClassName("mb-8")}>
              {t('核心理念', 'CORE CONCEPT')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* 左侧文案区 */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <motion.h2
                    key={`title-${activePillar}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={websiteSectionTitleClassName(language, "leading-tight")}
                  >
                    {getContent(`phi_core${activePillar + 1}_title`,
                      ["闭环交付文化", "第一性原理思维", "全球化智慧文化"][activePillar],
                      ["Closed-loop Culture", "First Principles", "Global Intelligence"][activePillar]
                    )}
                  </motion.h2>
                  <motion.p
                    key={`desc-${activePillar}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={websiteSectionBodyClassName(language, "max-w-md text-white/60")}
                  >
                    {getContent(`phi_core${activePillar + 1}_desc`,
                      [
                        "规划·执行·反馈·闭环。没有终点的许诺皆为虚妄。",
                        "回归事物本质。剥离行业经验与跟风情绪，回归事物最硬核的本质属性。",
                        "国际格局+本土深耕。拥有俯视周期的国际格局，更能俯身执行本土的泥泞深耕。"
                      ][activePillar],
                      [
                        "Plan, Execute, Feedback, Close. Promises without results are illusions.",
                        "Return to the essence of things. Strip away experience and emotion.",
                        "Global perspective + local deep-rooting. International perspective on cycles."
                      ][activePillar]
                    )}
                  </motion.p>
                </div>

                <div className="flex flex-col gap-6 border-t border-white/10 pt-12">
                  {[1, 2, 3].map((pillar, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePillar(idx)}
                      className={`flex items-center gap-6 group transition-all duration-500 ${activePillar === idx ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                    >
                      <span className="text-sm font-mono tracking-tighter">0{idx + 1}</span>
                      <span className={`text-xl font-medium tracking-wider ${activePillar === idx ? 'translate-x-2' : ''} transition-transform`}>
                        {getContent(`phi_core${idx + 1}_title`,
                          ["闭环交付文化", "第一性原理思维", "全球化智慧文化"][idx],
                          ["Closed-loop Culture", "First Principles", "Global Intelligence"][idx]
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 右侧视频区 */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
                  <motion.video
                    key={activePillar}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    src={getContent(`phi_core${activePillar + 1}_video`,
                      ["/fhzb/videos/batch-compressed.mp4", "/fhzb/videos/block-compressed.mp4", "/fhzb/videos/背景_3.mp4"][activePillar],
                      ["/fhzb/videos/batch-compressed.mp4", "/fhzb/videos/block-compressed.mp4", "/fhzb/videos/背景_3.mp4"][activePillar]
                    )}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* 播放按钮装饰 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-white ml-1">
                        <path d="M1 1L19 12L1 23V1Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. 文化象征与仪式：左文右视结构 */}
        <Section id="symbols" className="relative w-full py-40 bg-[#000000] overflow-hidden border-t border-white/5">
          {/* 背景装饰漂浮元素 */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/3 right-1/4 w-72 h-96 border border-[#b7893b]/10 rotate-12"></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-64 border border-[#b7893b]/10 -rotate-12"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* 左侧文案区 */}
              <div className="lg:col-span-5 space-y-16">
                <div>
                  <h2 className={websiteSectionEyebrowClassName("mb-8")}>
                    {t('文化象征与仪式', 'CULTURAL SYMBOLS')}
                  </h2>
                  <h3 className={websiteSectionTitleClassName(language, "mb-8")}>
                    {t('Logo “峰峦” 图腾解', 'Logo "Summits" Totem Interpretation')}
                  </h3>
                  <p className={websiteSectionBodyClassName(language, "text-white/60")}>
                    {t('峰峦图腾代表着攀登的志向与稳健的路径。每一道线条都刻画着对产业深耕的承诺，象征着资本与实业在高峰处的会师。', 'The Summits totem represents the ambition to climb and a steady path. Every line depicts a commitment to industrial deep-rooting.')}
                  </p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-2xl font-serif text-white/80 italic">{t('仪式即烙印', 'Rituals as Imprints')}</h3>
                  <div className="space-y-6">
                    {[
                      { zh: "登峰路演会", en: "Summits Roadshow" },
                      { zh: "生态共建日", en: "Ecosystem Day" },
                      { zh: "承诺兑现典礼", en: "Commitment Ceremony" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-white/40 group hover:text-white transition-colors">
                        <span className="text-xs font-mono">0{idx + 1}</span>
                        <span className="text-lg tracking-widest uppercase">{language === 'zh' ? item.zh : item.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 右侧视频区 */}
              <div className="lg:col-span-7 sticky top-40">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(183,137,59,0.05)]">
                  <video
                    src="/fhzb/videos/footer-compressed.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/20"></div>

                  {/* 装饰性浮层 */}
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl">
                      <p className="text-sm text-white/40 uppercase tracking-[0.3em] mb-2">{t('文化影像', 'CULTURAL FOOTAGE')}</p>
                      <p className="text-lg text-white font-light">{t('捕捉每一个行诺致远的瞬间', 'Capturing every moment of integrity and longevity')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. 创始人的信：全屏长卷阅读 */}
        <section id="letter" className="relative w-full min-h-[120vh] bg-[#000000] border-t border-white/10 flex items-center justify-center py-40">
          <div className="absolute inset-0 pointer-events-none opacity-60 bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-screen grayscale"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000]/80 to-[#000000]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#b7893b]/5 via-transparent to-transparent pointer-events-none z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left">
            <span className="block text-[#b7893b] uppercase tracking-widest text-2xl mb-12 font-bold">— {t('创始人的信', 'LETTER FROM FOUNDER')}</span>
            <h1 className={`font-serif text-[#FFFFFF] mb-16 leading-relaxed flex items-baseline gap-2 flex-wrap ${language === 'zh' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'}`}>
              {/* 将前括号和主标题放在一起 */}
              <span>{t('《共筑峰峦：', 'Building Summits: ')}</span>

              {/* 副标题去掉 block，改为 inline-block 或直接去掉 */}
              <span className={`font-sans font-light ${language === 'zh' ? 'text-2xl' : 'text-xl'}`}>
                {t('一封关于价值与未来的信', 'A letter about value and the future')}
              </span>

              {/* 后括号 */}
              <span>{t('》', ' »')}</span>
            </h1>

            <div className="space-y-10 text-lg md:text-xl text-white font-light leading-loose">
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
                <div className="inline-flex rounded-xl  p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:p-4">
                  <img
                    src="/fhzb/images/founder-signature.png"
                    alt="Founder Signature"
                    className="h-auto w-[240px] max-w-full object-contain md:w-[320px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
