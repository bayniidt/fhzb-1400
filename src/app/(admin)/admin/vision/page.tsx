"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Eye, Film, BookOpen, Quote, Mic } from "lucide-react";

export default function VisionManagement() {
  const sections = [
    { 
      title: '1. 主视觉区域', 
      icon: Eye,
      items: [
        { key: 'vis_hero_title', label: '主标题', type: 'text' as const },
        { key: 'vis_hero_bg', label: '背景媒体', type: 'media' as const },
      ] 
    },
    {
      title: '2. 纪录片 (Documentary)',
      icon: Film,
      items: [
        { key: 'vis_doc_cover', label: '纪录片封面', type: 'media' as const },
        { key: 'vis_doc_video', label: '纪录片视频', type: 'media' as const },
      ]
    },
    {
      title: '3. 第一性原理·专栏 (Columns)',
      icon: BookOpen,
      items: [
        { key: 'vis_col1_title', label: '专栏 1 标题', type: 'text' as const },
        { key: 'vis_col1_type', label: '专栏 1 类型', type: 'text' as const },
        { key: 'vis_col1_author', label: '专栏 1 作者', type: 'text' as const },
        { key: 'vis_col2_title', label: '专栏 2 标题', type: 'text' as const },
        { key: 'vis_col2_type', label: '专栏 2 类型', type: 'text' as const },
        { key: 'vis_col2_author', label: '专栏 2 作者', type: 'text' as const },
      ]
    },
    {
      title: '4. 峰会实录·金句 (Summit)',
      icon: Quote,
      items: [
        { key: 'vis_summit_bg', label: '峰会背景图', type: 'media' as const },
        { key: 'vis_summit_quote', label: '峰会金句', type: 'text' as const },
      ]
    },
    {
      title: '5. 洞察白皮书研报 (Reports)',
      icon: BookOpen,
      items: [
        { key: 'vis_report1_title', label: '报告 1 标题', type: 'text' as const },
        { key: 'vis_report1_year', label: '报告 1 年份', type: 'text' as const },
        { key: 'vis_report1_cover', label: '报告 1 封面', type: 'media' as const },
        { key: 'vis_report2_title', label: '报告 2 标题', type: 'text' as const },
        { key: 'vis_report2_year', label: '报告 2 年份', type: 'text' as const },
        { key: 'vis_report2_cover', label: '报告 2 封面', type: 'media' as const },
        { key: 'vis_report3_title', label: '报告 3 标题', type: 'text' as const },
        { key: 'vis_report3_year', label: '报告 3 年份', type: 'text' as const },
        { key: 'vis_report3_cover', label: '报告 3 封面', type: 'media' as const },
      ]
    },
    {
      title: '6. 媒体中心 (Media Center)',
      icon: Mic,
      items: [
        { key: 'vis_news1_title', label: '新闻 1 标题', type: 'text' as const },
        { key: 'vis_news1_date', label: '新闻 1 日期', type: 'text' as const },
        { key: 'vis_news1_source', label: '新闻 1 来源', type: 'text' as const },
        { key: 'vis_news2_title', label: '新闻 2 标题', type: 'text' as const },
        { key: 'vis_news2_date', label: '新闻 2 日期', type: 'text' as const },
        { key: 'vis_news2_source', label: '新闻 2 来源', type: 'text' as const },
        { key: 'vis_news3_title', label: '新闻 3 标题', type: 'text' as const },
        { key: 'vis_news3_date', label: '新闻 3 日期', type: 'text' as const },
        { key: 'vis_news3_source', label: '新闻 3 来源', type: 'text' as const },
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
