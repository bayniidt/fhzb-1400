"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Globe2, Map } from "lucide-react";

export default function GalaxyManagement() {
  const sections = [
    { 
      title: '主视觉区域', 
      icon: Globe2,
      items: [
        { key: 'gal_hero_title', label: '主标题', type: 'text' as const },
        { key: 'gal_hero_subtitle', label: '副标题', type: 'text' as const },
        { key: 'gal_hero_bg', label: '背景媒体 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="galaxy"
      title="峰壑星系管理"
      description="管理总部、区域俱乐部及全球协同网络内容。"
      sections={sections}
    />
  );
}
