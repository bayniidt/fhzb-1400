"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Video, Image as ImageIcon } from "lucide-react";

export default function HomeManagement() {
  const sections = [
    { 
      title: '主视觉区域 (Hero Section)', 
      icon: Video,
      items: [
        { key: 'hero_title_1', label: '主标题', type: 'text' as const },
        { key: 'hero_title_2', label: '副标题', type: 'text' as const },
        { key: 'hero_btn_1', label: '按钮一文案', type: 'text' as const },
        { key: 'hero_btn_2', label: '按钮二文案', type: 'text' as const },
        { key: 'hero_bg_video', label: '背景视频 URL', type: 'media' as const },
      ] 
    },
    { 
      title: '峰壑宣言 (Manifesto Section)', 
      icon: ImageIcon,
      items: [
        { key: 'manifesto_title', label: '大标题', type: 'text' as const },
        { key: 'manifesto_content_1', label: '内容行一', type: 'text' as const },
        { key: 'manifesto_content_2', label: '内容行二', type: 'text' as const },
        { key: 'manifesto_content_3', label: '内容行三', type: 'text' as const },
        { key: 'manifesto_bg_image', label: '背景图片 URL', type: 'media' as const },
      ] 
    }
  ];

  return (
    <ModuleManagement 
      moduleName="home"
      title="首页内容管理"
      description="管理官网首页的核心视觉内容、按钮文案及背景媒体。"
      sections={sections}
    />
  );
}
