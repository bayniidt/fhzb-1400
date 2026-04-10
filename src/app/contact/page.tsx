"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [role, setRole] = useState<string>("none");

  return (
    <PageTransition>
      <div className="flex flex-col lg:flex-row min-h-screen pt-20 bg-[#050505]">
        {/* 左半区：固定联系信息与氛围 */}
        <div className="w-full lg:w-[40%] bg-[#030303] p-10 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10">
            <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8">Access Portal</span>
            <h1 className="text-5xl lg:text-7xl font-light mb-16 tracking-tighter text-[#ECECEC] leading-tight">
              全业务<br/>合作通道。
            </h1>

            <div className="space-y-16">
              <div>
                <h3 className="text-gray-600 uppercase tracking-widest text-xs mb-4 font-bold border-b border-white/5 pb-4 inline-block w-full">全球中枢坐标</h3>
                <p className="text-2xl font-light text-gray-300">中国 · 深圳</p>
                <p className="text-sm text-gray-500 mt-2 font-mono">22.54°N, 114.05°E</p>
              </div>
              <div>
                <h3 className="text-gray-600 uppercase tracking-widest text-xs mb-4 font-bold border-b border-white/5 pb-4 inline-block w-full">专属对接近路</h3>
                <p className="text-2xl font-light text-[#D4AF37] hover:text-white transition-colors cursor-pointer">partner@fhzb.com</p>
              </div>
              <div className="pt-8 opacity-40">
                <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xs">
                  *所有通过此智能通道提交的信息组，将经过高重加密并自动分流至对应的总裁决策或基金执行引擎。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 右半区：智能申请分流表单 */}
        <div className="w-full lg:w-[60%] p-10 lg:p-32 bg-[#050505] flex flex-col justify-center">
          <div className="w-full max-w-2xl">
             <div className="mb-20">
               <label className="block text-2xl lg:text-4xl font-light mb-8 text-[#ECECEC]">您希望以什么身份与峰壑结阵？</label>
               <select 
                 className="w-full bg-transparent border-b border-white/20 pb-4 text-xl lg:text-2xl focus:outline-none focus:border-[#D4AF37] transition-all appearance-none text-gray-400 cursor-pointer font-light"
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 style={{ backgroundImage: 'linear-gradient(to right, rgba(212, 175, 55, 0) 90%, rgba(212, 175, 55, 0.4) 100%)' }}
               >
                 <option value="none" className="bg-[#111]">-- 请选择战略角色 --</option>
                 <option value="project" className="bg-[#111]">项目合作 (产业/上市公司寻求跨界与资本赋能)</option>
                 <option value="partner" className="bg-[#111]">加盟合作 (申请城市合伙人/区域独家主理)</option>
                 <option value="club" className="bg-[#111]">会员入会 (成为共筑峰峦顶级圈层的一员)</option>
                 <option value="institution" className="bg-[#111]">机构同盟 (VC/PE/家族办公室共投资源互动)</option>
                 <option value="media" className="bg-[#111]">媒体活动 (资源互换/品牌公关及圈层会议合作)</option>
               </select>
             </div>

             <AnimatePresence mode="wait">
               {/* 1. 项目合作 */}
               {role === 'project' && (
                 <motion.div 
                   key="project"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="space-y-12"
                 >
                   <input type="text" placeholder="企业全称与核心实业领域" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <div className="flex gap-8">
                     <input type="text" placeholder="当前阶段 (天使/A轮/拟IPO等)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                     <input type="text" placeholder="核心诉求 (资金/模型重构)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   </div>
                   <div className="w-full h-32 border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all cursor-pointer group">
                     <span className="text-sm tracking-widest uppercase font-medium">拖拽或点击上传完整商业计划书 (BP)</span>
                   </div>
                   <button className="bg-[#ECECEC] text-[#050505] px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white w-full transition-colors mt-8">递交项目数据室</button>
                 </motion.div>
               )}

               {/* 2. 合伙人加盟 */}
               {role === 'partner' && (
                 <motion.div 
                   key="partner"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="space-y-12"
                 >
                   <input type="text" placeholder="意向锁定的城市或省区" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <input type="text" placeholder="基础资金池准备概览 (不低于总部最低限额)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <textarea rows={3} placeholder="简述您在当地的政商壁垒或核心实业产业群资源..." className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                   <button className="bg-[#D4AF37] text-black px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#eac448] w-full transition-colors mt-8">开启极核区域授权面审</button>
                 </motion.div>
               )}

               {/* 3. 会员申请 */}
               {role === 'club' && (
                 <motion.div 
                   key="club"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="space-y-12"
                 >
                   <div className="flex gap-8">
                     <input type="text" placeholder="您的称呼与行业背景" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                     <input type="text" placeholder="圈内推荐人 (必填项)" className="w-full bg-transparent border-b border-[#D4AF37]/50 pb-4 text-lg focus:outline-none focus:border-[#D4AF37] transition-colors text-[#D4AF37] placeholder:text-[#D4AF37]/40"/>
                   </div>
                   <input type="text" placeholder="基础验资证明 (流动性资产声明)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <textarea rows={2} placeholder="入会核心动机 (学习圈层/锁定内定跟投权等)..." className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                   <button className="border border-white text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black w-full transition-colors mt-8">提交后台资质核验</button>
                 </motion.div>
               )}

                {/* 4. 机构合作 */}
               {role === 'institution' && (
                 <motion.div 
                   key="institution"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="space-y-12"
                 >
                   <input type="text" placeholder="机构主体名称与资本性质 (PE/VC/Family Office)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <div className="flex gap-8">
                     <input type="text" placeholder="AUM 资产管理规模" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                     <input type="text" placeholder="投资偏好/赛道" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   </div>
                   <textarea rows={2} placeholder="联合投资模型或资金接驳方案简述..." className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>

                   <button className="bg-[#ECECEC] text-[#050505] px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white w-full transition-colors mt-8">接驳基金管理人通道</button>
                 </motion.div>
               )}

               {/* 5. 媒体/活动合作 */}
               {role === 'media' && (
                 <motion.div 
                   key="media"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.5 }}
                   className="space-y-12"
                 >
                   <input type="text" placeholder="所属媒体、自媒体 IP 或会议品牌背书" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <input type="text" placeholder="合作载体形式 (峰会论坛赞助/版面互换/独家专访)" className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                   <textarea rows={3} placeholder="详细资源互换方案与核心曝光量级说明..." className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                   <button className="border border-white text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black w-full transition-colors mt-8">发送至公关枢纽处</button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
