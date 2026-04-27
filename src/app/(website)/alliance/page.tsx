"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Alliance() {
  const { t, language } = useLanguage();

  const ecosystemClusters = [
    {
      id: "companies",
      zh: "上市公司 / 项目方",
      en: "Industrial Targets",
      target_zh: "目标群体：寻求资本赋能的企业",
      target_en: "Target: Enterprises seeking capital empowerment",
      desc_zh: "项目加速器：成功案例；BP 投递入口；上市路径规划咨询。",
      desc_en: "Project Accelerator: Success Cases, BP Submission, IPO Planning Consulting.",
      features: [
        { zh: "成功案例", en: "Success Cases", icon: "🏆" },
        { zh: "BP 投递", en: "BP Submission", icon: "✉️" },
        { zh: "路径规划", en: "IPO Planning", icon: "📈" }
      ],
      cta: t("开启项目加速", "Project Accelerator"),
      video: "/fhzb/videos/batch-compressed.mp4"
    },
    {
      id: "partners",
      zh: "生态合伙人",
      en: "Eco Partners",
      target_zh: "目标群体：城市合伙人、区域伙伴",
      target_en: "Target: City Partners & Regional Associates",
      desc_zh: "合伙人价值主张：品牌授权、区域独家权、利润分成、培训支持、中央基金跟投权。申请流程。",
      desc_en: "Value Proposition: Brand Auth, Regional Exclusivity, Profit Sharing, Training, Co-investment. Apply Flow.",
      features: [
        { zh: "区域独家", en: "Exclusivity", icon: "" },
        { zh: "利润分成", en: "Profit Sharing", icon: "" },
        { zh: "申请流程", en: "Apply Flow", icon: "📋" }
      ],
      cta: t("申请极核授权", "Apply for Auth"),
      video: "/fhzb/videos/block-compressed.mp4"
    },
    {
      id: "institutions",
      zh: "机构伙伴",
      en: "Financial Institutions",
      target_zh: "目标群体：VC/PE、家族办公室、金融机构",
      target_en: "Target: VC/PE, Family Offices, Financial Institutions",
      desc_zh: "共投基金/生态基金：基金策略、过往业绩、跟投机会、LP 申请通道。",
      desc_en: "Co-investment/Eco Funds: Fund Strategy, Track Record, Opportunities, LP Access.",
      features: [
        { zh: "基金策略", en: "Fund Strategy", icon: "🎯" },
        { zh: "跟投机会", en: "Co-invest", icon: "🤝" },
        { zh: "LP 申请", en: "LP Access", icon: "🔓" }
      ],
      cta: t("建立协同链路", "Build Synergy"),
      video: "/fhzb/videos/global-compressed.mp4"
    },
    {
      id: "club",
      zh: "会员俱乐部",
      en: "Member Club",
      target_zh: "目标群体：高净值个人、企业家",
      target_en: "Target: HNWIs, Entrepreneurs",
      desc_zh: "会员权益：顶级圈层、稀缺项目跟投、专属顾问、尊贵身份标识。入会申请。",
      desc_en: "Benefits: Top Circle, Project Access, Dedicated Advisor, Elite Identity. Membership Apply.",
      features: [
        { zh: "顶级圈层", en: "Top Circle", icon: "" },
        { zh: "专属顾问", en: "Advisor", icon: "👤" },
        { zh: "入会申请", en: "Apply", icon: "✨" }
      ],
      cta: t("申请加入俱乐部", "Join Club"),
      video: "/fhzb/videos/banner-m.mp4"
    }
  ];

  return (
    <PageTransition>
      <div className="bg-background w-full">
        {/* Header区 */}
        <section id="hero" className="relative pt-60 pb-40 border-b border-white/5 overflow-hidden">
           <img 
             src="/fhzb/videos/股市_1.jpg" 
             className="absolute inset-0 w-full h-full object-cover grayscale-[0.1]"
             alt="Alliance Hero Background"
           />
           {/* 背景融合遮罩：从左侧黑色渐变到透明，增强文字可读性并消除“突兀”感 */}
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
           
           {/* 背景装饰 */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#b7893b]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2 z-10" />
           
           <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20">
             <span className="text-[#f12f08] uppercase tracking-[0.4em] font-bold text-xs block mb-8">Collective Prosperity</span>
             <h1 className={`font-serif font-black text-white tracking-tighter mb-8 drop-shadow-2xl ${language === 'zh' ? 'text-6xl md:text-8xl lg:text-9xl' : 'text-5xl md:text-7xl lg:text-8xl'}`}>
               {t('共筑峰峦', 'Alliance')}
             </h1>
             
             {/* 优化的文字容器：采用极简玻璃拟态设计，配合金色装饰线 */}
             <div className="relative max-w-4xl">
               <div className={`text-white/90 border-l-4 border-[#b7893b] bg-black/20 backdrop-blur-xl p-8 md:p-10 rounded-r-2xl relative z-10 leading-relaxed ${language === 'zh' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                 <span className="font-bold block mb-2">{t('在峰壑，没有孤岛。', 'In FH, there are no islands.')}</span>
                 <p className="font-medium">
                   {t('我们通过精密的利益对齐与资源互锁，', 'Through precise alignment and resource interlocking,')}<br />
                   {t('让每一份资本与技术都能在', 'every piece of capital and technology')}<br />
                   <span className="text-[#b7893b] font-black italic tracking-wide">{t('生态网络中实现指数级裂变。', 'achieves exponential growth within the network.')}</span>
                 </p>
               </div>
             </div>
           </div>
        </section>

        {/* 四大集群展示 */}
        <div id="clusters" className="divide-y divide-white/5 border-b border-white/5">
          {ecosystemClusters.map((cluster, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div id={cluster.id} key={cluster.id} className="relative group overflow-hidden hover:bg-[#b7893b]/5 transition-colors duration-1000">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-32 flex flex-col md:flex-row gap-20 items-center">
                   {/* 内容 */}
                   <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="flex items-center gap-4 mb-8">
                         <span className="w-12 h-[1px] bg-[#b7893b]"></span>
                         <span className="text-[#b7893b] font-bold tracking-[0.3em] text-xs uppercase">{cluster.en}</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-[#b7893b]/60 text-sm font-bold uppercase tracking-widest">{language === 'zh' ? cluster.target_zh : cluster.target_en}</span>
                      </div>
                      <h2 className={`font-serif text-white mb-8 ${language === 'zh' ? 'text-5xl md:text-6xl font-light' : 'text-4xl md:text-5xl font-black'}`}>
                        {language === 'zh' ? cluster.zh : cluster.en}
                      </h2>
                      <p className="text-xl text-white font-light leading-relaxed mb-12">
                        {language === 'zh' ? cluster.desc_zh : cluster.desc_en}
                      </p>

                      {/* 交互功能点 */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                        {cluster.features?.map((feature, fIdx) => (
                          <div 
                            key={fIdx} 
                            className="p-6 bg-white/5 border border-white/10 hover:border-[#b7893b]/50 hover:bg-[#b7893b]/10 transition-all cursor-pointer group/item text-center"
                          >
                            <div className="text-2xl mb-2 group-hover/item:scale-110 transition-transform">{feature.icon}</div>
                            <div className="text-white font-bold text-xs uppercase tracking-tighter whitespace-nowrap">
                              {language === 'zh' ? feature.zh : feature.en}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Link href="/contact" className="group/btn inline-flex items-center gap-6">
                         <span className="text-white font-bold tracking-widest text-sm uppercase group-hover/btn:text-[#b7893b] transition-colors">{cluster.cta}</span>
                         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-[#b7893b] group-hover/btn:bg-[#b7893b] group-hover/btn:text-black transition-all">
                            &rarr;
                         </div>
                      </Link>
                   </div>

                   {/* 视觉卡片 (视频展示) */}
                   <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2' : 'md:order-1'} h-[500px] relative overflow-hidden bg-surface border border-white/5 group-hover:border-[#b7893b]/30 transition-colors rounded-2xl shadow-2xl`}>
                      <video 
                        src={cluster.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {/* 抽象细节 */}
                      <div className="absolute bottom-10 left-10 p-6 border-l border-[#b7893b]/50 bg-black/40 backdrop-blur-md">
                         <div className="text-[10px] text-[#b7893b] uppercase tracking-widest mb-2">Network Status</div>
                         <div className="text-white font-bold text-xs flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#b7893b] animate-pulse"></span>
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
        <Section id="cta" className="bg-black text-center border-t border-white/10 !min-h-[50vh] flex flex-col justify-center px-6">
          <h2 className="text-3xl font-serif font-light text-white mb-8">
            {t('仍有游移？或是准备登阶？', 'Still undecided? Or ready to ascend?')}
          </h2>
          <Link href="/contact" className="text-sm border-b border-[#b7893b] pb-1 text-[#b7893b] uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all inline-block w-fit mx-auto">
             {t('直接前往联结中枢进行身份筛选', 'Proceed to identification at the Hub')}
          </Link>
        </Section>

      </div>
    </PageTransition>
  );
}
