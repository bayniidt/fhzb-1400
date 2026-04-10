"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const { t } = useLanguage();
  const [role, setRole] = useState<string>("none");

  return (
    <PageTransition>
      <div className="bg-[#121212] min-h-screen flex flex-col pt-20">
        <div className="flex flex-col lg:flex-row flex-grow">
          {/* 左半区：固定联系信息与氛围 */}
          <div className="w-full lg:w-[40%] bg-[#1A1A1A] p-10 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
            <img 
              src="/videos/背景图_1.jpg" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
              alt="Contact Background"
            />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <span className="text-[#D4AF37] uppercase tracking-[0.4em] font-bold text-xs block mb-8 underline decoration-[#D4AF37]">
                {t('接入门户', 'Access Portal')}
              </span>
              <h1 className="text-5xl lg:text-7xl font-serif font-light mb-16 tracking-tighter text-white leading-tight drop-shadow-2xl">
                {t('全业务', 'Full Business')} <br/>
                {t('合作通道。', 'Collaboration.')}
              </h1>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 opacity-60">
                    {t('电子邮箱', 'Email Address')}
                  </h3>
                  <a href="mailto:contact@fh-capital.com" className="text-xl md:text-2xl text-[#ECECEC] font-light hover:text-[#D4AF37] transition-colors">
                    contact@fh-capital.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 opacity-60">
                    {t('总部地址', 'Headquarter')}
                  </h3>
                  <p className="text-xl md:text-2xl text-[#ECECEC] font-light leading-relaxed">
                    {t('上海市 · 静安区', 'Jingan District, Shanghai')} <br />
                    {t('南京西路 1601 号越洋国际 38 楼', 'Floor 38, Park Place, 1601 Nanjing West Road')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右半区：智能申请分流表单 */}
          <div className="w-full lg:w-[60%] p-10 lg:p-32 bg-[#121212] flex flex-col justify-center">
            <div className="w-full max-w-2xl">
              <div className="mb-20">
                <label className="block text-2xl lg:text-4xl font-serif font-light mb-8 text-[#ECECEC]">
                  {t('您希望以什么身份与峰壑结阵？', 'How would you like to join the Alliance?')}
                </label>
                <div className="relative group">
                  <select 
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-xl lg:text-2xl font-serif focus:outline-none focus:border-[#D4AF37] transition-all appearance-none text-gray-400 cursor-pointer font-light"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="none" className="bg-[#111]">-- {t('请选择战略角色', 'Select Your Role')} --</option>
                    <option value="project" className="bg-[#111]">{t('项目合作 (寻求资本赋能)', 'Project Collaboration')}</option>
                    <option value="partner" className="bg-[#111]">{t('加盟合作 (区域主理人)', 'Regional Partner')}</option>
                    <option value="club" className="bg-[#111]">{t('会员入会 (圈层加入)', 'Membership Inquiries')}</option>
                    <option value="institution" className="bg-[#111]">{t('机构同盟 (LP/GP 互动)', 'Institutional Alliance')}</option>
                    <option value="media" className="bg-[#111]">{t('媒体活动 (公关合作)', 'Press & Media')}</option>
                  </select>
                  <div className="absolute right-0 bottom-6 pointer-events-none text-[#D4AF37] opacity-40">↓</div>
                </div>
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
                    <input type="text" placeholder={t('企业全称与核心实业领域', 'Company Name & Core Industry')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <div className="flex gap-8">
                      <input type="text" placeholder={t('当前阶段 (天使/A轮/拟IPO等)', 'Current Stage')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                      <input type="text" placeholder={t('核心诉求 (资金/模型重构)', 'Key Requirements')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    </div>
                    <div className="w-full h-32 border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all cursor-pointer group">
                      <span className="text-sm tracking-widest uppercase font-medium">
                        {t('拖拽或点击上传完整商业计划书 (BP)', 'Upload Business Plan (BP)')}
                      </span>
                    </div>
                    <button className="bg-[#ECECEC] text-[#121212] px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white w-full transition-colors mt-8">
                      {t('递交项目数据室', 'Submit to Data Room')}
                    </button>
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
                    <input type="text" placeholder={t('意向锁定的城市或省区', 'Target Region')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <input type="text" placeholder={t('基础资金池准备概览', 'Capital Commitment Overview')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <textarea rows={3} placeholder={t('简述您在当地的政商壁垒或核心实业产业群资源...', 'Briefly describe your local resources...')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                    <button className="bg-[#D4AF37] text-black px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#eac448] w-full transition-colors mt-8">
                      {t('开启极核区域授权面审', 'Start Regional Interview')}
                    </button>
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
                      <input type="text" placeholder={t('您的称呼与行业背景', 'Name & Industry Background')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                      <input type="text" placeholder={t('圈内推荐人 (必填项)', 'Referrer (Required)')} className="w-full bg-transparent border-b border-[#D4AF37]/50 pb-4 text-lg focus:outline-none focus:border-[#D4AF37] transition-colors text-[#D4AF37] placeholder:text-[#D4AF37]/40"/>
                    </div>
                    <input type="text" placeholder={t('基础验资证明 (流动性资产声明)', 'Proof of Net Worth')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <textarea rows={2} placeholder={t('入会核心动机 (学习圈层/锁定内定跟投权等)...', 'Reason for joining...')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                    <button className="border border-white text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black w-full transition-colors mt-8">
                      {t('提交后台资质核验', 'Submit for Verification')}
                    </button>
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
                    <input type="text" placeholder={t('机构主体名称与资本性质', 'Institution Name & Capital Nature')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <div className="flex gap-8">
                      <input type="text" placeholder={t('AUM 资产管理规模', 'AUM')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                      <input type="text" placeholder={t('投资偏好/赛道', 'Investment Focus')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    </div>
                    <textarea rows={2} placeholder={t('联合投资模型或资金接驳方案简述...', 'Joint Investment Model Overview...')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                    <button className="bg-[#ECECEC] text-[#121212] px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white w-full transition-colors mt-8">
                      {t('接驳基金管理人通道', 'Connect with Fund Managers')}
                    </button>
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
                    <input type="text" placeholder={t('所属媒体、自媒体 IP 或会议品牌背书', 'Media Outlet or Event Brand')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <input type="text" placeholder={t('合作载体形式', 'Type of Cooperation')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                    <textarea rows={3} placeholder={t('详细资源互换方案与核心曝光量级说明...', 'Detailed cooperation proposal...')} className="w-full bg-transparent border-b border-white/10 pb-4 text-lg focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                    <button className="border border-white text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black w-full transition-colors mt-8">
                      {t('发送至公关枢纽处', 'Contact PR Hub')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
