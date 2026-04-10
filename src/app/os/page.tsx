"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

export default function OS() {
  const [activeStage, setActiveStage] = useState<number>(0);
  
  const osStages = [
    { title: "融", subtitle: "Fundraise", desc: "不仅是资金的聚合，更是生态圈层入场券的发放。我们搭建基石盲池基金，从根源上锁定战略资源。", tools: ["基石信任契约模板", "LP 战略意图解析模型", "资产穿透财务表"] },
    { title: "投", subtitle: "Invest", desc: "第一性原理下的极客尽调。摒弃PPT叙事，直面企业的工业代码与真实人效。", tools: ["产业根基测绘仪", "三维立体背景调查", "估值压力测试沙盘"] },
    { title: "管", subtitle: "Manage", desc: "深度赋能的营地搭建。从商业模式重构到上市合规体系搭建，提供如手术刀般精准的模块植入。", tools: ["商业模式重组框架", "全维风控合规手册", "上市路径倒推甘特图"] },
    { title: "退", subtitle: "Exit", desc: "精准规划的安全绳。上市百分百目标驱动，同时备置严密的托底退出通道，确保资本果实的无损采摘。", tools: ["24% 回购保障协议范本", "并购重组资源匹配库", "亏损兑付数学模型"] }
  ];

  return (
    <PageTransition>
      <div className="bg-[#050505]">
        {/* Header Title */}
        <section className="pt-40 pb-20 px-10 max-w-7xl mx-auto flex flex-col justify-center border-b border-white/5">
           <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#ECECEC] mb-8">
             CAPITAL<br/>
             <span className="text-[#D4AF37] font-light italic font-serif">O.S.</span>
           </h1>
           <p className="text-2xl text-gray-500 font-light max-w-2xl">
             不只输出资本。<br/>
             我们交付的是跑通资本市场的全链路闭环代码。
           </p>
        </section>

        {/* 模块一：操作系统全景图 (融投管退) */}
        <Section className="!py-0 bg-[#020202]">
           <div className="flex flex-col lg:flex-row min-h-screen">
              {/* 左侧阶段栏 */}
              <div className="w-full lg:w-1/3 border-r border-white/5 flex flex-col justify-center py-20 lg:py-0">
                 {osStages.map((stage, idx) => (
                    <div 
                      key={idx}
                      onMouseEnter={() => setActiveStage(idx)}
                      className={`px-10 py-10 cursor-default border-b border-white/5 transition-all duration-500 relative overflow-hidden group ${activeStage === idx ? 'bg-[#0a0a0a]' : 'hover:bg-[#070707]'}`}
                    >
                       <div className={`absolute left-0 top-0 w-1 h-full transition-colors duration-500 ${activeStage === idx ? 'bg-[#D4AF37]' : 'bg-transparent'}`} />
                       <div className="flex justify-between items-baseline mb-2">
                         <span className="text-5xl font-black text-white/5 mb-4 group-hover:text-white/10 transition-colors">0{idx + 1}</span>
                         <span className="text-sm tracking-widest text-[#D4AF37] opacity-60 uppercase">{stage.subtitle}</span>
                       </div>
                       <h3 className={`text-4xl font-light transition-colors duration-500 ${activeStage === idx ? 'text-[#ECECEC]' : 'text-gray-600'}`}>
                         {stage.title} 阶段
                       </h3>
                    </div>
                 ))}
              </div>
              
              {/* 右侧交互展示区 */}
              <div className="w-full lg:w-2/3 p-10 lg:p-32 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37] rounded-full blur-[200px] opacity-[0.03] pointer-events-none" />
                  
                  <motion.div 
                    key={activeStage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                     <h4 className="text-3xl text-gray-300 font-light mb-8 leading-relaxed max-w-xl">
                       {osStages[activeStage].desc}
                     </h4>
                     
                     <div className="mt-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-gray-600 font-bold mb-6 block">阶段赋能工具 // Core Tools</span>
                        <div className="flex flex-col gap-4">
                           {osStages[activeStage].tools.map((tool, tIdx) => (
                              <div key={tIdx} className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/50 transition-colors cursor-crosshair">
                                 <span className="text-lg text-gray-400 group-hover:text-white transition-colors">{tool}</span>
                                 <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37] transition-all">
                                   &rarr;
                                 </span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
              </div>
           </div>
        </Section>

        {/* 模块二：登峰地图 (沉浸视频与第一性原理) */}
        <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden">
           {/* 背景：暗影等高线测绘雷达模拟 */}
           <div className="absolute inset-0 z-0">
             <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen scale-110"
                poster="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2560" // 科技雷达或等高线地图替换图
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505] z-10" />
           </div>

           <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
              <h2 className="text-5xl md:text-7xl font-serif text-[#ECECEC] mb-24 max-w-4xl leading-tight">
                 第一性原理：<br/>
                 <span className="text-[#D4AF37] italic font-light">如何精准测绘资本等高线。</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
                 {[
                   { role: "地图测绘者", desc: "剔除市场幻觉，用数据与产业真相精准标识每一处价值矿脉与隐患悬崖。" },
                   { role: "营地搭建者", desc: "深度植入规范化经营代码，在悬崖边钉死锚点，搭建企业合规的钢铁营盘。" },
                   { role: "安全绳守护者", desc: "在上市冲刺区提供极致资金与认知保护，即便失足也有严密的风险对冲锁扣护住本金。" },
                 ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2, duration: 0.8 }}
                    >
                       <span className="text-sm font-bold text-gray-600 block mb-4 uppercase tracking-[0.2em]">Our Role {idx + 1}</span>
                       <h3 className="text-3xl font-light text-white mb-6">{item.role}</h3>
                       <p className="text-gray-500 leading-relaxed text-lg">{item.desc}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* 模块三：核心承诺 (极限硬向承诺) */}
        <Section className="bg-[#030303] !py-32">
           <div className="text-center mb-24">
              <h2 className="text-sm tracking-[0.3em] font-bold text-gray-600 uppercase mb-4">Core Commitments</h2>
              <div className="text-5xl font-light text-[#ECECEC]">不用口号，用契约。</div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { data: "对赌陪跑", label: "绑定利益，一荣俱荣", stat: "100%", suffix: "同进退" },
                { data: "亏损兑付", label: "极致托底的生态安全带", stat: "0", suffix: "风险敞口敞口外流" },
                { data: "24%", label: "强制回购的底线保障协议", stat: "24", suffix: "%化解壁垒" },
                { data: "100%", label: "上市目标与过会通关决心", stat: "99", suffix: "%执行率" },
              ].map((promise, idx) => (
                 <div key={idx} className="relative group p-10 h-[400px] flex flex-col justify-end bg-black border border-white/5 hover:border-[#D4AF37]/40 transition-colors overflow-hidden">
                    <div className="absolute top-8 left-8 text-[#D4AF37] font-serif italic text-6xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 blur-sm group-hover:blur-none">
                       {promise.data}
                    </div>
                    <div className="relative z-10">
                       <h3 className="text-3xl font-medium text-gray-200 mb-3">{promise.data}</h3>
                       <p className="text-gray-600">{promise.label}</p>
                    </div>
                 </div>
              ))}
           </div>
        </Section>

        {/* 模块四：工具流预览 (锁定态的云平台) */}
        <section className="bg-[#050505] py-32 px-10 border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                 <div>
                    <h2 className="text-5xl font-light text-[#ECECEC] mb-4">赋能云平台预览</h2>
                    <p className="text-gray-500 text-xl">高度结构化的智库武器库，沉淀数十个亿级项目的成功样板代码。</p>
                 </div>
                 <Link href="/contact" className="shrink-0 text-[#D4AF37] uppercase tracking-widest text-sm border-b border-[#D4AF37]/50 pb-1 hover:text-white hover:border-white transition-colors">
                    申请解锁全量权限
                 </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative pb-20">
                 {/* 加密的朦胧遮罩层 */}
                 <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pt-40 pointer-events-none">
                    <div className="pointer-events-auto bg-white text-black px-10 py-4 font-bold tracking-widest text-sm uppercase shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:bg-[#D4AF37] transition-colors cursor-pointer inline-block">
                       &rarr; 核心库已锁定 (需入库许可)
                    </div>
                 </div>

                 {/* 底部模拟文档文件 */}
                 {[
                   { format: "PDF", name: "合规整改手册_2026战略版 (节选)" },
                   { format: "EXCEL", name: "三张表自动化测算穿透模型_V4.2" },
                   { format: "PPT", name: "全球化路演核心逻辑结构模板" },
                   { format: "DOC", name: "反摊薄与优先清算协议标准范式" },
                   { format: "VIDEO", name: "敲钟前夜：保荐机构内部推演实录" },
                   { format: "PDF", name: "产业赋能前置的尽调白皮书" },
                 ].map((doc, idx) => (
                    <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-8 flex flex-col justify-between h-48 filter blur-[2px] opacity-60">
                       <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-gray-500 font-bold text-xs tracking-wider">
                         {doc.format}
                       </div>
                       <p className="text-white font-medium line-clamp-2">{doc.name}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

      </div>
    </PageTransition>
  );
}
