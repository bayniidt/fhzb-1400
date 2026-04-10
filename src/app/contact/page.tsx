"use client";
import { PageTransition } from "@/components/ui/PageTransition";
import { useState } from "react";

export default function Contact() {
  const [role, setRole] = useState<string>("none");

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row min-h-screen pt-20">
        {/* Left Side 40% */}
        <div className="w-full md:w-[40%] bg-[#030303] p-10 md:p-24 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight text-[#ECECEC]">全球联系<br/>入口体系</h1>
            <div className="space-y-16">
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-bold border-b border-white/10 pb-4 inline-block w-12">坐标</h3>
                <p className="text-2xl font-light text-gray-300">中国 · 深圳</p>
              </div>
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-bold border-b border-white/10 pb-4 inline-block w-12">中枢</h3>
                <p className="text-2xl font-light text-gray-300">partner@fhzb.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side 60% */}
        <div className="w-full md:w-[60%] p-10 md:p-32 bg-[#050505] flex flex-col justify-center">
          <div className="w-full max-w-2xl">
             <div className="mb-20">
               <label className="block text-3xl font-light mb-8 text-gray-300">您希望以什么身份联结？</label>
               <select 
                 className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-2xl focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none text-[#ECECEC] cursor-pointer"
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
               >
                 <option value="none" className="bg-[#111]">-- 开启通道 --</option>
                 <option value="project" className="bg-[#111]">项目方：寻求融资/上市辅导</option>
                 <option value="partner" className="bg-[#111]">考察者：意向申请城市合伙人</option>
                 <option value="institution" className="bg-[#111]">机构方：寻求项目联投/深度共建</option>
               </select>
             </div>

             {role === 'project' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="企业名称及核心商业模式" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <div className="w-full h-40 border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-colors cursor-pointer text-lg tracking-wider">
                   一键拖拽上传 PDF 商业计划书
                 </div>
                 <button className="bg-[#ECECEC] text-black px-12 py-5 text-lg font-medium hover:bg-white w-full transition-colors mt-8">递交总部枢纽</button>
               </div>
             )}
             {role === 'partner' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="您的拟覆盖区域界限 (城市/省区)" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <input type="text" placeholder="资金准备与本地政商资源概括" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <button className="bg-[#D4AF37] text-black px-12 py-5 text-lg font-medium hover:bg-[#e6be3d] w-full transition-colors mt-8">进入合伙人资质审查</button>
               </div>
             )}
              {role === 'institution' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="资产管理规模或特长领域" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <button className="bg-[#ECECEC] text-black px-12 py-5 text-lg font-medium hover:bg-white w-full transition-colors mt-8">进入机构白名单序列</button>
               </div>
             )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
