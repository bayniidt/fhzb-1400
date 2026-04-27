"use client";

import ModuleManagement from "../components/ModuleManagement";
import { Globe2, Map, Network, Rocket } from "lucide-react";

export default function GalaxyManagement() {
  const sections = [
    { 
      title: '1. 总部 · 中央引擎 (HQ · Central Engine)', 
      icon: Globe2,
      items: [
        { key: 'gal_hero_title', label: '主标题', type: 'text' as const },
        { key: 'gal_hero_subtitle', label: '副标题', type: 'text' as const },
        { key: 'gal_hero_bg', label: '背景媒体', type: 'media' as const },
        { key: 'gal_hq_role1_title', label: '总部角色 1 标题 (标准制定者)', type: 'text' as const },
        { key: 'gal_hq_role1_desc', label: '总部角色 1 描述', type: 'text' as const },
        { key: 'gal_hq_role2_title', label: '总部角色 2 标题 (资源赋能者)', type: 'text' as const },
        { key: 'gal_hq_role2_desc', label: '总部角色 2 描述', type: 'text' as const },
        { key: 'gal_hq_role3_title', label: '总部角色 3 标题 (生态连接者)', type: 'text' as const },
        { key: 'gal_hq_role3_desc', label: '总部角色 3 描述', type: 'text' as const },
        { key: 'gal_hq_role4_title', label: '总部角色 4 标题 (品牌塑造者)', type: 'text' as const },
        { key: 'gal_hq_role4_desc', label: '总部角色 4 描述', type: 'text' as const },
        { key: 'gal_hq_role5_title', label: '总部角色 5 标题 (风险守护者)', type: 'text' as const },
        { key: 'gal_hq_role5_desc', label: '总部角色 5 描述', type: 'text' as const },
      ] 
    },
    {
      title: '2. 区域俱乐部阵列 (Regional Clubs)',
      icon: Map,
      items: [
        { key: 'gal_region1_name', label: '区域 1 名称 (华南/深圳)', type: 'text' as const },
        { key: 'gal_region1_label', label: '区域 1 标签', type: 'text' as const },
        { key: 'gal_region2_name', label: '区域 2 名称 (华东/上海)', type: 'text' as const },
        { key: 'gal_region2_label', label: '区域 2 标签', type: 'text' as const },
        { key: 'gal_region3_name', label: '区域 3 名称 (西南/成都)', type: 'text' as const },
        { key: 'gal_region3_label', label: '区域 3 标签', type: 'text' as const },
        { key: 'gal_region4_name', label: '区域 4 名称 (华北/北京)', type: 'text' as const },
        { key: 'gal_region4_label', label: '区域 4 标签', type: 'text' as const },
        { key: 'gal_region_map_bg', label: '区域地图背景', type: 'media' as const },
      ]
    },
    {
      title: '3. 超级协同网络 (Synergy Matrix)',
      icon: Network,
      items: [
        { key: 'gal_synergy_bg', label: '协同网络背景', type: 'media' as const },
      ]
    },
    {
      title: '4. 加入星系 CTA (Join Galaxy)',
      icon: Rocket,
      items: [
        { key: 'gal_cta_title', label: '大标题', type: 'text' as const },
        { key: 'gal_cta_subtitle', label: '副标题 (高亮)', type: 'text' as const },
        { key: 'gal_cta_desc', label: '描述文案', type: 'text' as const },
        { key: 'gal_cta_bg', label: 'CTA 背景', type: 'media' as const },
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
