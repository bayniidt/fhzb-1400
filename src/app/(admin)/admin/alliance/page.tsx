"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Users2, Handshake } from "lucide-react";

export default function AllianceManagement() {
  const sections = [
    { 
      title: '主视觉区域', 
      icon: Users2,
      items: [
        { key: 'all_hero_title', label: '主标题', type: 'text' as const },
        { key: 'all_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="alliance"
      title="共筑峰峦管理"
      description="管理上市公司、生态合伙人及机构伙伴内容。"
      sections={sections}
    />
  );
}
