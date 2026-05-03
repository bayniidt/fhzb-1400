"use client"
import { useLanguage } from "@/context/LanguageContext"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image"; // 1. 引入组件
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { fetchNavigation } from "@/lib/api"

export const NAV_LINKS = [
  {
    href: "/",
    zh: "首页",
    en: "HOME",
    subItems: [
      { zh: "峰壑宣言", en: "Manifesto", href: "/#hero", descZh: "（欢迎来到峰壑）", descEn: "Hero Banner" },
      { zh: "三大价值入口", en: "Gateways", href: "/#gateways", descZh: "（核心价值枢纽）", descEn: "Core Value Hub" },
      { zh: "峰壑星系概览", en: "Overview", href: "/#galaxy-overview", descZh: "（峰壑星系网络）", descEn: "Galaxy Network" },
      { zh: "最新动态", en: "News", href: "/#news", descZh: "实时掌握项目进展", descEn: "Real-time project progress" },
      { zh: "峰壑之问", en: "Question", href: "/#question", descZh: "（我们绘制的是空中楼阁，还是登峰地图？）", descEn: "Castles in the air or map to the summit?" },
    ]
  },
  {
    href: "/philosophy",
    zh: "峰壑哲学",
    en: "PHILOSOPHY",
    subItems: [
      { zh: "峰峦思维", en: "Peak Thinking", href: "/philosophy#peak-thinking", descZh: "（欢迎来到峰壑）", descEn: "Hero Banner" },
      { zh: "使命·愿景·价值观", en: "MVV", href: "/philosophy#mvv", descZh: "（Mission / 使命）", descEn: "Mission / Values" },
      { zh: "三大文化支柱", en: "Pillars", href: "/philosophy#pillars", descZh: "（核心理念）", descEn: "Core Concept" },
      { zh: "文化象征与仪式", en: "Rituals", href: "/philosophy#symbols", descZh: "（文化象征与仪式）", descEn: "Cultural Symbols & Rituals" },
      { zh: "创始人的信", en: "Letter", href: "/philosophy#letter", descZh: "（创始人的信）", descEn: "Letter from Founder" },
    ]
  },
  {
    href: "/os",
    zh: "资本系统",
    en: "CAPITAL O.S.",
    subItems: [
      { zh: "操作系统全景图", en: "OS Panorama", href: "/os#panorama", descZh: "资本运作的全局视野", descEn: "Global view of capital operations" },
      { zh: "登峰地图", en: "Ascent Map", href: "/os#map", descZh: "价值增长的实施路径", descEn: "Implementation path of value growth" },
      { zh: "核心承诺", en: "Commitments", href: "/os#commitments", descZh: "建立信任的基础契约", descEn: "Fundamental contract for trust" },
      { zh: "工具流预览", en: "Tools", href: "/os#tools", descZh: "赋能增长的专业工具", descEn: "Professional tools for growth" },
    ]
  },
  {
    href: "/galaxy",
    zh: "峰壑星系",
    en: "GALAXY",
    subItems: [
      { zh: "总部·中央引擎", en: "Engine", href: "/galaxy#engine", descZh: "战略大脑与资源枢纽", descEn: "Strategic brain & resource hub" },
      { zh: "区域俱乐部·星罗棋布", en: "Clubs", href: "/galaxy#clubs", descZh: "（区域俱乐部阵列）", descEn: "Regional Club Matrix" },
      { zh: "协同网络", en: "Network", href: "/galaxy#network", descZh: "（超级协同网络）", descEn: "Super Synergy Network" },
      { zh: "加入星系", en: "Join", href: "/galaxy#join", descZh: "（占领极点，点亮下一个星区。）", descEn: "Capture the core, ignite the next sector." },
    ]
  },
  {
    href: "/alliance",
    zh: "共筑峰峦",
    en: "ALLIANCE",
    subItems: [
      { zh: "上市公司/项目方", en: "Companies", href: "/alliance#companies", descZh: "产业文明的优秀代表", descEn: "Representatives of industrial civilization" },
      { zh: "生态合伙人", en: "Partners", href: "/alliance#partners", descZh: "价值共创的深度伙伴", descEn: "Deep partners in value co-creation" },
      { zh: "机构伙伴", en: "Institutions", href: "/alliance#institutions", descZh: "赋能产业的金融力量", descEn: "Financial power empowering industry" },
      { zh: "会员俱乐部", en: "Membership", href: "/alliance#club", descZh: "高净值人群的私享空间", descEn: "Private space for HNWIs" },
    ]
  },
  {
    href: "/vision",
    zh: "峰壑视野",
    en: "VISION",
    subItems: [
      { zh: "《登峰》纪录片", en: "Documentary", href: "/vision#documentary", descZh: "记录产业攀登者的足迹", descEn: "Footprints of industry climbers" },
      { zh: "《第一性原理》", en: "Principles", href: "/vision#first-principles", descZh: "回归本质的深度洞察", descEn: "Deep insights back to essence" },
      { zh: "峰会实录", en: "Summits", href: "/vision#summit", descZh: "思想碰撞的高光时刻", descEn: "High-light moments of collision" },
      { zh: "峰壑洞察", en: "Insights", href: "/vision#insights", descZh: "洞悉未来的行业研究", descEn: "Industry research into the future" },
      { zh: "媒体中心", en: "Media", href: "/vision#media", descZh: "官方资讯与品牌动态", descEn: "Official news and brand updates" },
    ]
  },
  {
    href: "/omega",
    zh: "数字峰壑",
    en: "DIGITAL",
    subItems: [
      { zh: "峰壑数据看板", en: "Dashboard", href: "/omega#dashboard", descZh: "数字化视角的实时反馈", descEn: "Real-time digital feedback" },
      { zh: "数字通行证", en: "Pass", href: "/omega#pass", descZh: "进入数字生态的身份凭证", descEn: "Identity for digital ecosystem" },
      { zh: "项目数字档案", en: "Archive", href: "/omega#archive", descZh: "全生命周期的价值记录", descEn: "Value records of full lifecycle" },
    ]
  },
]

export const CONTACT_SUB_ITEMS = [
  { zh: "项目合作", en: "Project Cooperation", href: "/contact#cooperation", descZh: "寻求产业与资本的共鸣", descEn: "Seek resonance of industry & capital" },
  { zh: "合伙人加盟", en: "Partner", href: "/contact#partner-join", descZh: "加入合伙人价值体系", descEn: "Join the partner value system" },
  { zh: "会员申请", en: "Membership", href: "/contact#member-apply", descZh: "开启私享会籍特权", descEn: "Open private membership privileges" },
  { zh: "机构合作", en: "Institution", href: "/contact#institution-coop", descZh: "构建金融赋能共同体", descEn: "Build a financial empowerment community" },
  { zh: "媒体/活动合作", en: "Media/Event", href: "/contact#media-coop", descZh: "品牌共创与传播合作", descEn: "Brand co-creation & communication" },
  { zh: "智能申请表", en: "Smart Form", href: "/contact#form", descZh: "快速提交合作意向", descEn: "Submit cooperation intent fast" },
]

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [dynamicNav, setDynamicNav] = useState<any[]>([])

  useEffect(() => {
    fetchNavigation().then(data => {
      // Map database navigation to NAV_LINKS structure if needed
      // For now, we'll merge them or replace main items
      setDynamicNav(data)
    })
  }, [])

  const currentNav = dynamicNav.length > 0 ? dynamicNav.map(item => ({
    href: item.href,
    zh: item.name_zh,
    en: item.name_en,
    // Keep sub-items from hardcoded if they match the href
    subItems: NAV_LINKS.find(link => link.href === item.href)?.subItems || []
  })) : NAV_LINKS

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150 && !isMenuOpen) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="fixed top-0 inset-x-0 h-20 z-[60] flex items-center justify-between px-6 md:px-12 bg-black/80 backdrop-blur-2xl border-b border-[#b7893b]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <Link href="/" className="group flex items-center shrink-0" onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={180}   
            height={50}  
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 md:gap-4 ml-auto">
          <div className="flex gap-0 md:gap-1 items-center">
            {currentNav.map(link => {
              const isActive = pathname === link.href
              const isHovered = hoveredLink === link.zh
              return (
                <div
                  key={link.href}
                  className="relative group/item"
                  onMouseEnter={() => setHoveredLink(link.zh)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 md:px-4 py-2 text-[13px] md:text-[15px] font-bold tracking-[0.05em] transition-all duration-500 relative flex items-center gap-1 whitespace-nowrap ${isActive ? 'text-[#b7893b]' : 'text-white hover:text-[#b7893b]'}`}
                  >
                    <span className="relative z-10">{language === 'zh' ? link.zh : link.en}</span>
                    <motion.span
                      animate={{ rotate: isHovered ? 180 : 0 }}
                      className="text-[10px] opacity-50"
                    >
                      ▾
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#b7893b] shadow-[0_0_8px_rgba(183,137,59,0.6)]"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {isHovered && link.subItems && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50"
                      >
                        <div className="bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-3 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                          <div className="flex flex-col gap-1">
                            {link.subItems.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                className="group/sub flex flex-col p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                              >
                                <span className="text-sm font-bold text-white group-hover/sub:text-[#b7893b] transition-colors flex items-center justify-between">
                                  {language === 'zh' ? sub.zh : sub.en}
                                  <span className="text-[10px] opacity-0 group-hover/sub:opacity-100 transition-opacity translate-x-2 group-hover/sub:translate-x-0">→</span>
                                </span>
                                {(language === 'zh' ? sub.descZh : sub.descEn) && (
                                  <span className="text-[11px] text-white/40 mt-1 font-normal tracking-wide">
                                    {language === 'zh' ? sub.descZh : sub.descEn}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <div className="h-4 w-[1px] bg-white/20 mx-2" />

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="text-[12px] md:text-[14px] font-bold tracking-widest text-white hover:text-[#b7893b] transition-colors"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>
            <div className="h-4 w-[1px] bg-white/20" />
            
            <div 
              className="relative group/contact"
              onMouseEnter={() => setHoveredLink('contact')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link href="/contact" className={`text-[12px] md:text-[14px] font-bold tracking-widest flex items-center gap-1 transition-colors ${hoveredLink === 'contact' ? 'text-[#b7893b]' : 'text-white hover:text-[#b7893b]'}`}>
                {t('联系我们', 'JOIN US')}
                <motion.span
                  animate={{ rotate: hoveredLink === 'contact' ? 180 : 0 }}
                  className="text-[10px] opacity-50"
                >
                  ▾
                </motion.span>
              </Link>

              <AnimatePresence>
                {hoveredLink === 'contact' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 pt-2 w-72 z-50"
                  >
                    <div className="bg-zinc-950/95 backdrop-blur-2xl rounded-2xl p-3 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                      <div className="flex flex-col gap-1">
                        {CONTACT_SUB_ITEMS.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="group/sub flex flex-col p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                          >
                            <span className="text-sm font-bold text-white group-hover/sub:text-[#b7893b] transition-colors flex items-center justify-between">
                              {language === 'zh' ? sub.zh : sub.en}
                              <span className="text-[10px] opacity-0 group-hover/sub:opacity-100 transition-opacity translate-x-2 group-hover/sub:translate-x-0">→</span>
                            </span>
                            {(language === 'zh' ? sub.descZh : sub.descEn) && (
                              <span className="text-[11px] text-white/40 mt-1 font-normal tracking-wide">
                                {language === 'zh' ? sub.descZh : sub.descEn}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="text-[14px] font-bold text-white"
          >
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
            <motion.span 
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block transition-colors"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black pt-24 px-8 lg:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-8 pb-20">
              {currentNav.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex flex-col gap-4"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-bold tracking-widest transition-colors ${pathname === link.href ? 'text-[#b7893b]' : 'text-white'}`}
                  >
                    {language === 'zh' ? link.zh : link.en}
                  </Link>
                  {link.subItems && (
                    <div className="grid grid-cols-1 gap-4 pl-4 border-l border-white/10">
                      {link.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex flex-col text-sm text-white/60 hover:text-[#b7893b] transition-colors"
                        >
                          <span className="font-bold">{language === 'zh' ? sub.zh : sub.en}</span>
                          {(language === 'zh' ? sub.descZh : sub.descEn) && (
                            <span className="text-[10px] text-white/30 mt-0.5 font-normal">
                              {language === 'zh' ? sub.descZh : sub.descEn}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: currentNav.length * 0.05 }}
                className="mt-4 pt-10 border-t border-white/10 flex flex-col gap-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold text-[#b7893b] tracking-widest"
                >
                  {t('联系我们', 'JOIN US')}
                </Link>
                <div className="grid grid-cols-1 gap-4 pl-4 border-l border-white/10">
                  {CONTACT_SUB_ITEMS.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col text-sm text-white/60 hover:text-[#b7893b] transition-colors"
                    >
                      <span className="font-bold">{language === 'zh' ? sub.zh : sub.en}</span>
                      {(language === 'zh' ? sub.descZh : sub.descEn) && (
                        <span className="text-[10px] text-white/30 mt-0.5 font-normal">
                          {language === 'zh' ? sub.descZh : sub.descEn}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


