"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Cpu, Layout, Shield, FileText } from "lucide-react";

export default function OSManagement() {
  const sections = [
    { 
      title: '1. 主视觉区域', 
      icon: Cpu,
      items: [
        { key: 'os_hero_title', label: '主标题', type: 'text' as const },
        { key: 'os_hero_subtitle', label: '副标题', type: 'text' as const },
        { key: 'os_hero_bg', label: '背景媒体', type: 'media' as const },
      ] 
    },
    {
      title: '2. 阶段地图 (Ascent Map)',
      icon: Layout,
      items: [
        { key: 'os_stage1_title', label: '阶段1 标题 (融)', type: 'text' as const },
        { key: 'os_stage1_desc', label: '阶段1 描述', type: 'text' as const },
        { key: 'os_stage1_video', label: '阶段1 视频', type: 'media' as const },
        
        { key: 'os_stage2_title', label: '阶段2 标题 (投)', type: 'text' as const },
        { key: 'os_stage2_desc', label: '阶段2 描述', type: 'text' as const },
        { key: 'os_stage2_video', label: '阶段2 视频', type: 'media' as const },
        
        { key: 'os_stage3_title', label: '阶段3 标题 (管)', type: 'text' as const },
        { key: 'os_stage3_desc', label: '阶段3 描述', type: 'text' as const },
        { key: 'os_stage3_video', label: '阶段3 视频', type: 'media' as const },
        
        { key: 'os_stage4_title', label: '阶段4 标题 (退)', type: 'text' as const },
        { key: 'os_stage4_desc', label: '阶段4 描述', type: 'text' as const },
        { key: 'os_stage4_video', label: '阶段4 视频', type: 'media' as const },
      ]
    },
    {
      title: '3. 硬性承诺 (Commitments)',
      icon: Shield,
      items: [
        { key: 'os_commitment_1_value', label: '承诺 1 数值 (对赌陪跑)', type: 'text' as const },
        { key: 'os_commitment_1_detail', label: '承诺 1 详情', type: 'text' as const },
        { key: 'os_commitment_2_value', label: '承诺 2 数值 (亏损兑付)', type: 'text' as const },
        { key: 'os_commitment_2_detail', label: '承诺 2 详情', type: 'text' as const },
        { key: 'os_commitment_3_value', label: '承诺 3 数值 (回购保障)', type: 'text' as const },
        { key: 'os_commitment_3_detail', label: '承诺 3 详情', type: 'text' as const },
        { key: 'os_commitment_4_value', label: '承诺 4 数值 (上市百分百)', type: 'text' as const },
        { key: 'os_commitment_4_detail', label: '承诺 4 详情', type: 'text' as const },
      ]
    },
    {
      title: '4. 工作流预览 (Workflow Tools)',
      icon: FileText,
      items: [
        { key: 'os_workflow_bg', label: '展示背景', type: 'media' as const },
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
