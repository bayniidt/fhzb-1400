"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Eye, Film } from "lucide-react";

export default function VisionManagement() {
  const sections = [
    { 
      title: '主视觉区域', 
      icon: Eye,
      items: [
        { key: 'vis_hero_title', label: '主标题', type: 'text' as const },
        { key: 'vis_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="vision"
      title="峰壑视野管理"
      description="管理纪录片、深度洞察、峰会实录及媒体中心内容。"
      sections={sections}
    />
  );
}
