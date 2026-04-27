"use client";

import ModuleManagement from "../components/ModuleManagement";
import { BookOpen, Target, Sparkles } from "lucide-react";

export default function PhilosophyManagement() {
  const sections = [
    { 
      title: '峰峦思维 (Peak Thinking)', 
      icon: BookOpen,
      items: [
        { key: 'phi_hero_title', label: '主视觉标题', type: 'text' as const },
        { key: 'phi_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    },
    { 
      title: '使命与愿景 (Mission & Vision)', 
      icon: Target,
      items: [
        { key: 'phi_mission_content', label: '使命内容', type: 'text' as const },
        { key: 'phi_vision_content', label: '愿景内容', type: 'text' as const },
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
