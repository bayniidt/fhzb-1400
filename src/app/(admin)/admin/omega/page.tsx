"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Activity, BarChart3, Ticket, FolderArchive } from "lucide-react";

export default function OmegaManagement() {
  const sections = [
    { 
      title: '1. 主视觉区域', 
      icon: Activity,
      items: [
        { key: 'ome_hero_title', label: '主标题', type: 'text' as const },
        { key: 'ome_hero_bg', label: '背景媒体', type: 'media' as const },
      ] 
    },
    {
      title: '2. 数据看板 (Dashboard Stats)',
      icon: BarChart3,
      items: [
        { key: 'ome_stat1_value', label: '统计数据 1 (生态总规模)', type: 'text' as const },
        { key: 'ome_stat1_label', label: '统计标签 1', type: 'text' as const },
        { key: 'ome_stat2_value', label: '统计数据 2 (覆盖行业)', type: 'text' as const },
        { key: 'ome_stat2_label', label: '统计标签 2', type: 'text' as const },
        { key: 'ome_stat3_value', label: '统计数据 3 (区域网络活跃度)', type: 'text' as const },
        { key: 'ome_stat3_label', label: '统计标签 3', type: 'text' as const },
      ]
    },
    {
      title: '3. 数字通行证 (NFT Pass)',
      icon: Ticket,
      items: [
        { key: 'ome_nft_bg', label: 'NFT 卡片背景', type: 'media' as const },
        { key: 'ome_nft_title', label: 'NFT 标题', type: 'text' as const },
        { key: 'ome_nft_desc', label: 'NFT 描述', type: 'text' as const },
      ]
    },
    {
      title: '4. 项目数字档案 (Project Archives)',
      icon: FolderArchive,
      items: [
        { key: 'ome_archive_step1_title', label: '阶段 1 标题 (项目发起)', type: 'text' as const },
        { key: 'ome_archive_step1_desc', label: '阶段 1 描述', type: 'text' as const },
        { key: 'ome_archive_step2_title', label: '阶段 2 标题 (关键里程碑)', type: 'text' as const },
        { key: 'ome_archive_step2_desc', label: '阶段 2 描述', type: 'text' as const },
        { key: 'ome_archive_step3_title', label: '阶段 3 标题 (资本加速)', type: 'text' as const },
        { key: 'ome_archive_step3_desc', label: '阶段 3 描述', type: 'text' as const },
        { key: 'ome_archive_step4_title', label: '阶段 4 标题 (登峰上市)', type: 'text' as const },
        { key: 'ome_archive_step4_desc', label: '阶段 4 描述', type: 'text' as const },
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
