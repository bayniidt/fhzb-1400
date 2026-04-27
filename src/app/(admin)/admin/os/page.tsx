"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Cpu, Layout } from "lucide-react";

export default function OSManagement() {
  const sections = [
    { 
      title: '主视觉区域', 
      icon: Cpu,
      items: [
        { key: 'os_hero_title', label: '主标题', type: 'text' as const },
        { key: 'os_hero_subtitle', label: '副标题', type: 'text' as const },
        { key: 'os_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="os"
      title="资本系统管理"
      description="管理资本操作系统全景图及实施路径内容。"
      sections={sections}
    />
  );
}
