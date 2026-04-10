"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function Alliance() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const alliances = [
    {
      id: "01",
      title: "产业标的",
      subtitle: "Project / 上市公司与潜力项目方",
      desc: "只做产业核爆的加速器。不局限于财务投资，而是从顶级商业模式重构到全面合规化改造，输出直通上市敲钟的闭环路径规划。",
      features: ["成功案例解密库", "IPO路径一键沙盘推演", "商业BP极速响应通道"],
      cta: "提交商业标书",
      theme: "from-transparent to-[#111]",
      image: "/videos/背景图_1.jpg"
    },
    {
      id: "02",
      title: "生态合伙人",
      subtitle: "Partner / 区域与城市掌控者",
      desc: "交托的不仅仅是品牌，而是整个区域生态的垄断权。享有深度的品牌赋能、巨额利润专项分成及总部基石盲池基金跟投保障体系。",
      features: ["独级城市管理权", "矩阵收益全额分成", "保底跟投网络权限"],
      cta: "启动主理人考核",
      theme: "from-transparent to-[#0a0a0a]",
      image: "/videos/背景图_2.jpg"
    },
    {
      id: "03",
      title: "资本同盟",
      subtitle: "Institution / VC/PE与家族办公室",
      desc: "抛开冗长的投资层级，建立最底层的平权沟通机制。我们开放生态基金策略底牌与过往过会硬核业绩，仅限绝对专业的资方下场共投。",
      features: ["生态基金盲池业绩揭露", "优先联投/过桥池入场", "LP 机构专属通道"],
      cta: "认证机构白名单",
      theme: "from-transparent to-[#121212]",
      image: "/videos/背景图_4.jpg"
    },
    {
      id: "04",
      title: "顶级圈层",
      subtitle: "Club / 高净值个人与顶尖老钱",
      desc: "一张在资本严冬中仍能无忧出入核心资源区的通行证。享受不公开募集的稀缺项目锁定权与专属私财智库专家服务体系。",
      features: ["绝对稀缺跟投池席位", "专职资产风控隔离顾问", "闭门私塾与至高身份标识"],
      cta: "申请内推席位",
      theme: "from-transparent to-black",
      image: "/videos/背景图_5.jpg"
    }
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="bg-[#121212] w-full relative">
        
        {/* 顶部宣言 */}
        <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
           <img 
             src="/videos/股市_5.jpg" 
             className="absolute inset-0 w-full h-full object-cover"
             alt="Alliance Header Background"
           />
           
           <div className="absolute inset-0 z-10">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-black to-black z-0 pointer-events-none"></div>
           </div>
           
           <div className="relative z-20 mt-20">
             <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8">Ecosystem Alliance</span>
             <motion.h1 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white tracking-tighter mb-8 drop-shadow-2xl"
             >
               共筑峰峦
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="text-2xl font-serif text-white/90 font-light max-w-3xl mx-auto drop-shadow-lg"
             >
               我们不寻找附庸者。<br/>
               只招募能在同一等高线共负盈亏的战友。
             </motion.p>
           </div>
        </section>

        {/* 4组生态集群门禁 (超大屏幕视差列阵) */}
        <div className="flex flex-col w-full relative">
          {alliances.map((alliance, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={idx} className="relative w-full min-h-screen flex items-center overflow-hidden sticky top-0 group">
                 {/* 每个层级的独立视觉背景 */}
                 <div className="absolute inset-0 z-0 bg-[#121212] transition-transform duration-[10s] ease-linear group-hover:scale-105">
                   <img 
                     src={alliance.image}
                     className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-1000"
                     alt={alliance.title}
                   />
                   <div className={`absolute inset-0 bg-gradient-to-t ${alliance.theme} z-10 opacity-60`}></div>
                   <div className="absolute inset-0 bg-black/30 z-20 backdrop-blur-[1px]"></div>
                 </div>

                 {/* 内容层 */}
                 <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row justify-between items-center md:items-end mix-blend-lighten">
                    
                    {/* 数字序列水印与标题 */}
                    <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:order-1 items-start text-left' : 'md:order-2 items-start md:items-end text-left md:text-right'}`}>
                       <motion.span 
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true, margin: "-10%" }}
                         className="text-[#D4AF37]/30 text-8xl font-serif md:text-[180px] leading-none font-serif font-black block mb-4"
                       >
                         {alliance.id}
                       </motion.span>
                       <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-lg">{alliance.title}</h2>
                       <p className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase">{alliance.subtitle}</p>
                    </div>

                    {/* 文案与专属 CTA 枢纽 */}
                    <div className={`w-full md:w-1/2 pt-12 md:pt-0 flex flex-col ${isEven ? 'md:order-2 px-0 md:pl-20' : 'md:order-1 px-0 md:pr-20'}`}>
                       <p className="text-xl md:text-2xl font-serif text-gray-300 font-light leading-relaxed mb-12">
                         {alliance.desc}
                       </p>
                       
                       <div className="space-y-4 mb-16 border-l border-[#D4AF37] pl-6 transition-colors">
                          {alliance.features.map((feat, fIdx) => (
                             <div key={fIdx} className="text-gray-400 font-medium tracking-wide flex items-center md:justify-start">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-4 inline-block"></span>
                                {feat}
                             </div>
                          ))}
                       </div>

                       <div className={`flex ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                          <Link 
                            href="/contact" 
                            className="inline-flex items-center justify-between border border-white/20 hover:border-white px-8 py-5 min-w-[280px] bg-white/[0.03] backdrop-blur-md text-white transition-all group/btn"
                          >
                             <span className="font-bold tracking-widest text-sm">{alliance.cta}</span>
                             <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-colors">&rarr;</span>
                          </Link>
                       </div>
                    </div>
                 </div>
              </div>
            )
          })}
        </div>
        
        {/* 底座入口 */}
        <Section className="bg-black text-center border-t border-white/10 !min-h-[50vh] flex flex-col justify-center">
          <h2 className="text-3xl font-serif font-light text-gray-400 mb-8">仍有游移？或是准备登阶？</h2>
          <Link href="/contact" className="text-sm border-b border-[#D4AF37] pb-1 text-[#D4AF37] uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all inline-block w-fit mx-auto">
             直接前往联结中枢进行身份筛选
          </Link>
        </Section>

      </div>
    </PageTransition>
  );
}
