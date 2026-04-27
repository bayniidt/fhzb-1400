"use client";

import ModuleManagement from "../components/ModuleManagement";
import { BookOpen, Target, Sparkles, Mail } from "lucide-react";

export default function PhilosophyManagement() {
  const sections = [
    { 
      title: '1. 峰峦思维 (Peak Thinking)', 
      icon: BookOpen,
      items: [
        { key: 'phi_hero_title', label: '主视觉标题', type: 'text' as const },
        { key: 'phi_hero_bg', label: '背景媒体', type: 'media' as const },
      ] 
    },
    { 
      title: '2. 使命与愿景 (Mission & Vision)', 
      icon: Target,
      items: [
        { key: 'phi_mission_content', label: '使命内容', type: 'text' as const },
        { key: 'phi_vision_content', label: '愿景内容', type: 'text' as const },
      ] 
    },
    {
      title: '3. 价值观 (Values)',
      icon: Sparkles,
      items: [
        { key: 'phi_val1_title', label: '价值观 1 标题', type: 'text' as const },
        { key: 'phi_val1_desc', label: '价值观 1 描述', type: 'text' as const },
        { key: 'phi_val2_title', label: '价值观 2 标题', type: 'text' as const },
        { key: 'phi_val2_desc', label: '价值观 2 描述', type: 'text' as const },
        { key: 'phi_val3_title', label: '价值观 3 标题', type: 'text' as const },
        { key: 'phi_val3_desc', label: '价值观 3 描述', type: 'text' as const },
        { key: 'phi_val4_title', label: '价值观 4 标题', type: 'text' as const },
        { key: 'phi_val4_desc', label: '价值观 4 描述', type: 'text' as const },
      ]
    },
    {
      title: '4. 核心理念 (Core Concepts)',
      icon: Target,
      items: [
        { key: 'phi_core1_title', label: '理念 1 标题', type: 'text' as const },
        { key: 'phi_core1_desc', label: '理念 1 描述', type: 'text' as const },
        { key: 'phi_core1_video', label: '理念 1 视频', type: 'media' as const },
        { key: 'phi_core2_title', label: '理念 2 标题', type: 'text' as const },
        { key: 'phi_core2_desc', label: '理念 2 描述', type: 'text' as const },
        { key: 'phi_core2_video', label: '理念 2 视频', type: 'media' as const },
        { key: 'phi_core3_title', label: '理念 3 标题', type: 'text' as const },
        { key: 'phi_core3_desc', label: '理念 3 描述', type: 'text' as const },
        { key: 'phi_core3_video', label: '理念 3 视频', type: 'media' as const },
      ]
    },
    {
      title: '5. 文化象征与仪式 (Cultural Symbols)',
      icon: Sparkles,
      items: [
        { key: 'phi_cultural_video', label: '文化展示视频', type: 'media' as const },
      ]
    },
    {
      title: '6. 创始人的信 (Founder Letter)',
      icon: Mail,
      items: [
        { key: 'phi_letter_bg', label: '背景图片', type: 'media' as const },
      ]
    }
  ];

  return (
    <ModuleManagement 
      moduleName="philosophy"
      title="峰壑哲学管理"
      description="管理使命、愿景、价值观及文化理念内容。"
      sections={sections}
    />
  );
}
