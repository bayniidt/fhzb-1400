"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Home,
  BookOpen,
  Cpu,
  Globe2,
  Users2,
  Eye,
  Activity,
  LogOut,
  Globe,
  Shield,
  ClipboardList
} from "lucide-react";

const navigation = [
  { name: '首页管理', href: '/admin/home', icon: Home },
  { name: '峰壑哲学', href: '/admin/philosophy', icon: BookOpen },
  { name: '资本系统', href: '/admin/os', icon: Cpu },
  { name: '峰壑星系', href: '/admin/galaxy', icon: Globe2 },
  { name: '共筑峰峦', href: '/admin/alliance', icon: Users2 },
  { name: '加盟管理', href: '/admin/join', icon: ClipboardList },
  { name: '峰壑视野', href: '/admin/vision', icon: Eye },
  { name: '数字峰壑', href: '/admin/omega', icon: Activity },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth") === "true";
    const superAdmin = localStorage.getItem("admin_super") === "true";
    if (!isAuth && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (pathname === "/admin") {
      router.push("/admin/home");
    } else {
      setIsSuperAdmin(superAdmin);
      setIsAuthChecked(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_phone");
    localStorage.removeItem("admin_super");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#b7893b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#b7893b] rounded-lg flex items-center justify-center font-bold text-black">
            FH
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-[#b7893b]">管理中心</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#b7893b] text-black shadow-[0_0_20px_rgba(183,137,59,0.3)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
          {isSuperAdmin && (
            <Link
              href="/admin/members"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === '/admin/members'
                  ? 'bg-[#b7893b] text-black shadow-[0_0_20px_rgba(183,137,59,0.3)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="font-medium text-sm">成员管理</span>
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-colors text-sm"
          >
            <Globe className="w-5 h-5" />
            <span>查看官网</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#b7893b] rounded-lg flex items-center justify-center font-bold text-black text-sm">
              FH
            </div>
            <span className="font-serif font-bold text-lg text-[#b7893b]">后台管理</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <LayoutDashboard className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 z-[80] w-72 bg-[#0d0d0d] border-r border-white/10 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#b7893b] rounded-lg flex items-center justify-center font-bold text-black">
                FH
              </div>
              <span className="font-serif font-bold text-xl text-[#b7893b]">管理中心</span>
            </div>
            <nav className="p-4 flex-1 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      isActive ? 'bg-[#b7893b] text-black' : 'text-white/60'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {isSuperAdmin && (
                <Link
                  href="/admin/members"
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                    pathname === '/admin/members' ? 'bg-[#b7893b] text-black' : 'text-white/60'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>成员管理</span>
                </Link>
              )}
            </nav>
          </aside>
        </>
      )}
    </div>
  );
}
