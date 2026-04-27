"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Activity, Database } from "lucide-react";

export default function OmegaManagement() {
  const sections = [
    { 
      title: '主视觉区域', 
      icon: Activity,
      items: [
        { key: 'ome_hero_title', label: '主标题', type: 'text' as const },
        { key: 'ome_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="omega"
      title="数字峰壑管理"
      description="管理数据看板、数字通行证及项目档案内容。"
      sections={sections}
    />
  );
}
