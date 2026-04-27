"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  MousePointer2, 
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
  Layers,
  Newspaper,
  MessageSquareQuote,
  Compass,
  Phone
} from "lucide-react";
import Link from "next/link";

const stats = [
  { name: '总访问量', value: '12,845', change: '+12.5%', icon: Eye, color: 'text-blue-400' },
  { name: '活跃用户', value: '1,240', change: '+5.2%', icon: Users, color: 'text-purple-400' },
  { name: '点击率', value: '4.8%', change: '+0.4%', icon: MousePointer2, color: 'text-amber-400' },
  { name: '增长率', value: '22.4%', change: '+3.1%', icon: TrendingUp, color: 'text-emerald-400' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">欢迎回来，管理员</h1>
        <p className="text-white/50">这是您网站今天的运行概况。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#b7893b]/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                {stat.change} <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
            <h3 className="text-white/60 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            快捷操作
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '全站文案', desc: '编辑主要视觉内容与翻译', href: '/admin/content', icon: Layers },
              { title: '导航管理', desc: '修改官网顶部菜单', href: '/admin/navigation', icon: Compass },
              { title: '发布动态', desc: '分享最新企业资讯', href: '/admin/news', icon: Newspaper },
              { title: '问答管理', desc: '更新首页轮播文字', href: '/admin/questions', icon: MessageSquareQuote },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#b7893b]/10 hover:border-[#b7893b]/50 transition-all group"
              >
                <h3 className="text-white font-bold mb-1 group-hover:text-[#b7893b] transition-colors">{action.title}</h3>
                <p className="text-white/40 text-sm">{action.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Updates */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">最近更新</h2>
            <Link href="/admin/news" className="text-[#b7893b] text-sm hover:underline flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            {[
              { title: '生态基金规模破百亿', date: '2小时前', type: '动态' },
              { title: '首页视觉标题已更新', date: '5小时前', type: '内容' },
              { title: '新增一条轮播问答', date: '昨天', type: '问答' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${
                  idx !== 2 ? 'border-b border-white/10' : ''
                }`}
              >
                <div>
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <p className="text-white/40 text-xs mt-1">{item.date} • {item.type}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/20" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
