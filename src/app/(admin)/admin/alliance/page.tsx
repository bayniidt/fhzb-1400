"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Users2, Handshake, Building2, Briefcase, Landmark, Crown } from "lucide-react";

export default function AllianceManagement() {
  const sections = [
    { 
      title: '1. 主视觉区域', 
      icon: Users2,
      items: [
        { key: 'all_hero_title', label: '主标题', type: 'text' as const },
        { key: 'all_hero_bg', label: '背景媒体', type: 'media' as const },
      ] 
    },
    {
      title: '2. 上市公司集群 (Industrial Targets)',
      icon: Building2,
      items: [
        { key: 'all_cluster1_video', label: '上市公司集群 媒体', type: 'media' as const },
      ]
    },
    {
      title: '3. 生态合伙人集群 (Eco Partners)',
      icon: Handshake,
      items: [
        { key: 'all_cluster2_video', label: '生态合伙人集群 媒体', type: 'media' as const },
      ]
    },
    {
      title: '4. 机构伙伴集群 (Financial Institutions)',
      icon: Landmark,
      items: [
        { key: 'all_cluster3_video', label: '机构伙伴集群 媒体', type: 'media' as const },
      ]
    },
    {
      title: '5. 会员俱乐部集群 (Member Club)',
      icon: Crown,
      items: [
        { key: 'all_cluster4_video', label: '会员俱乐部集群 媒体', type: 'media' as const },
      ]
    },
    {
      title: '6. 底部 CTA',
      icon: Users2,
      items: [
        { key: 'all_cta_bg', label: 'CTA 背景', type: 'media' as const },
      ]
    }
  ];

  return (
    <ModuleManagement 
      moduleName="alliance"
      title="共筑峰峦管理"
      description="管理上市公司、生态合伙人、机构伙伴及会员俱乐部内容。"
      sections={sections}
    />
  );
}
