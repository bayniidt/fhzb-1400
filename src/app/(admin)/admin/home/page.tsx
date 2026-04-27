"use client";

import ModuleManagement from "../components/ModuleManagement";
import { 
  Video, 
  Image as ImageIcon, 
  Layout, 
  Newspaper, 
  Rocket 
} from "lucide-react";

export default function HomeManagement() {
  const sections = [
    { 
      title: '1. Banner 区域', 
      icon: Layout,
      items: [
        { key: 'home_banner_title_1', label: '主标题', type: 'text' as const },
        { key: 'home_banner_title_2', label: '副标题', type: 'text' as const },
        { key: 'home_banner_btn_1', label: '按钮一文案', type: 'text' as const },
        { key: 'home_banner_btn_2', label: '按钮二文案', type: 'text' as const },
        { key: 'home_banner_video', label: '背景视频', type: 'media' as const },
      ] 
    },
    { 
      title: '2. 峰壑宣言区域', 
      icon: ImageIcon,
      items: [
        { key: 'home_manifesto_title', label: '大标题', type: 'text' as const },
        { key: 'home_manifesto_content_1', label: '内容行一', type: 'text' as const },
        { key: 'home_manifesto_content_2', label: '内容行二', type: 'text' as const },
        { key: 'home_manifesto_content_3', label: '内容行三', type: 'text' as const },
        { key: 'home_manifesto_video', label: '右侧展示媒体', type: 'media' as const },
      ] 
    },
    { 
      title: '3. 核心价值枢纽区域', 
      icon: Layout,
      items: [
        { key: 'home_hub_title', label: '板块标题', type: 'text' as const },
      ] 
    },
    { 
      title: '4. 最新动态区域', 
      icon: Newspaper,
      items: [
        { key: 'home_news_title', label: '板块标题', type: 'text' as const },
        { key: 'home_news_subtitle', label: '副标题', type: 'text' as const },
      ] 
    },
    { 
      title: '5. 开启攀登之路区域', 
      icon: Rocket,
      items: [
        { key: 'home_ascent_title', label: '行动号召文案', type: 'text' as const },
        { key: 'home_ascent_video', label: '背景视频', type: 'media' as const },
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
