# Fenghe Capital Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a flawless, dark-mode only Next.js site using framer-motion that executes the 7-page "Fenghe Capital Club" architecture with cinematic scroll transitions.

**Architecture:** Next.js 16 (App Router) + Tailwind CSS (v4) + framer-motion for UI interactions. No traditional layout cards, using edge-to-edge designs, deep blacks, and precise typography.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS, framer-motion, lucide-react.

---

### Task 1: Foundation Setup & Layout Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/PageTransition.tsx`
- Modify: `src/app/layout.tsx:1-50`

- [ ] **Step 1: Install dependencies**
```bash
pnpm install framer-motion lucide-react clsx tailwind-merge
```

- [ ] **Step 2: Create a PageTransition wrapper**
```tsx
// src/components/ui/PageTransition.tsx
"use client";
import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#050505] text-[#EDEDED]"
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create Navbar**
```tsx
// src/components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "首页" },
  { href: "/philosophy", label: "峰壑哲学" },
  { href: "/os", label: "资本操作系统" },
  { href: "/galaxy", label: "峰壑星系" },
  { href: "/alliance", label: "共筑峰峦" },
  { href: "/vision", label: "峰壑视野" },
  { href: "/contact", label: "共筑峰峦入口" }
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 h-20 z-50 flex items-center justify-between px-10 bg-[#050505]/60 backdrop-blur-md border-b min-w-[max-content] border-white/5"
    >
      <Link href="/" className="text-xl font-bold tracking-widest text-[#EDEDED]">FENGHE</Link>
      <div className="flex gap-8">
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 4: Create Footer**
```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#030303] py-16 px-10 border-t border-white/5 text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-4 md:mb-0">© 2026 峰壑资本俱乐部。保留所有权利。</div>
        <div className="flex gap-6 text-sm">
          <Link href="/contact" className="hover:text-white">联系我们</Link>
          <Link href="/philosophy" className="hover:text-white">关于峰壑</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Modify layout to use global wrappers**
```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "峰壑资本俱乐部 | 共筑峰峦",
  description: "顶级数字门户、价值引擎与全球声望门户",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="bg-[#050505]">
      <body className={`${inter.className} bg-[#050505] text-[#EDEDED] antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**
```bash
git add package.json pnpm-lock.yaml src/components/layout src/components/ui src/app/layout.tsx
git commit -m "feat: setup dark mode foundation layout and framer motion"
```

### Task 2: Build Section Component

**Files:**
- Create: `src/components/ui/Section.tsx`

- [ ] **Step 1: Write Section Component**
```tsx
// src/components/ui/Section.tsx
import { ReactNode } from "react";

export function Section({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <section className={`w-full min-h-screen flex flex-col justify-center px-10 lg:px-24 border-b border-white/5 ${className}`}>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/Section.tsx
git commit -m "feat: standard screen sized section component"
```

### Task 3: Develop Home Page (/)

**Files:**
- Modify: `src/app/page.tsx:1-60`

- [ ] **Step 1: Build Home Page**
```tsx
// src/app/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#080808]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-black to-black"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-[#ECECEC]">资本遇见雄心<br/>我们共筑峰峦</h1>
          <div className="flex gap-6 justify-center mt-16">
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black transition-all">成为生态伙伴</Link>
            <Link href="/os" className="px-8 py-4 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all">探索资本路径</Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <Section className="bg-[#030303] items-center text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-relaxed max-w-4xl text-gray-500">
          真正的资本是<span className="text-white font-normal relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-px after:bg-[#D4AF37]">加速器</span>，<br/>并非收割器。
        </h2>
      </Section>
      
      {/* Core Values */}
      <Section className="gap-24 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">立足高远</h3>
            </div>
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">路径坚实</h3>
            </div>
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">价值共生</h3>
            </div>
        </div>
      </Section>
      
      {/* Footer Teaser */}
      <Section className="items-center text-center bg-[#020202]">
          <p className="text-3xl text-gray-300 mb-10 font-light">我们绘制的是空中楼阁，还是登峰地图？</p>
          <Link href="/contact" className="text-sm uppercase tracking-widest border-b border-[#D4AF37] text-[#D4AF37] pb-1 hover:text-white hover:border-white transition-colors">寻找答案 &rarr;</Link>
      </Section>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat: complete cinematic edge-to-edge home page"
```

### Task 4: Develop Alliance Page (/alliance)

**Files:**
- Create: `src/app/alliance/page.tsx`

- [ ] **Step 1: Build Alliance Page**
```tsx
// src/app/alliance/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function Alliance() {
  return (
    <PageTransition>
      <Section className="bg-[#050505] !min-h-[60vh] pt-32">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-[#FAFAFA]">伙伴联盟</h1>
        <p className="text-3xl text-gray-400 font-light max-w-2xl">同频者共进。</p>
      </Section>
      
      <Section className="bg-[#080808]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div><h2 className="text-5xl md:text-6xl font-light text-gray-200">企业方<br/><span className="text-gray-500">上市跑道</span></h2></div>
          <div>
            <p className="text-gray-400 leading-relaxed text-xl mb-12">从商业模式重构到上市，我们不仅投钱，更投入认知。数十个成功案例验证的真实资本赋能引擎，只为具有颠覆潜质的实业服务。</p>
            <div className="flex gap-4 items-baseline">
                <div className="text-[#D4AF37] text-7xl md:text-9xl font-bold tracking-tighter">100%</div>
                <div className="text-xl uppercase tracking-widest text-[#D4AF37]">过会率目标承诺</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#050505]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div><h2 className="text-5xl md:text-6xl font-light text-gray-200">生态合伙人<br/><span className="text-gray-500">区域核心</span></h2></div>
          <div>
            <p className="text-gray-400 leading-relaxed text-xl mb-12">区域独家特许壁垒，总部品牌直达终端。与我们同频，享有核心生态利润分润与基石基金的优先跟投权。</p>
            <ul className="space-y-8 lg:text-3xl font-light">
              <li className="border-b border-white/10 pb-6 flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">01</span> 品牌独家授权体系</li>
              <li className="border-b border-white/10 pb-6 flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">02</span> 利润专项高额分成</li>
              <li className="flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">03</span> 中央基金盲池跟投保障</li>
            </ul>
          </div>
        </div>
      </Section>
      
      <Section className="items-center text-center bg-[#080808] !min-h-[50vh]">
          <Link href="/contact" className="px-12 py-6 border border-white hover:bg-white hover:text-black transition-all text-xl font-medium tracking-wide">对接您的独家赋能方案</Link>
      </Section>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/alliance/page.tsx
git commit -m "feat: complete alliance page with massive typography layout"
```

### Task 5: Develop Contact Page (/contact)

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Build Contact Page**
```tsx
// src/app/contact/page.tsx
"use client";
import { PageTransition } from "@/components/ui/PageTransition";
import { useState } from "react";

export default function Contact() {
  const [role, setRole] = useState<string>("none");

  return (
    <PageTransition>
      <div className="flex flex-col md:flex-row min-h-screen pt-20">
        {/* Left Side 40% */}
        <div className="w-full md:w-[40%] bg-[#030303] p-10 md:p-24 flex flex-col justify-center border-r border-white/5 relative overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 tracking-tight text-[#ECECEC]">全球联系<br/>入口体系</h1>
            <div className="space-y-16">
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-bold border-b border-white/10 pb-4 inline-block w-12">坐标</h3>
                <p className="text-2xl font-light text-gray-300">中国 · 深圳</p>
              </div>
              <div>
                <h3 className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-bold border-b border-white/10 pb-4 inline-block w-12">中枢</h3>
                <p className="text-2xl font-light text-gray-300">partner@fhzb.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side 60% */}
        <div className="w-full md:w-[60%] p-10 md:p-32 bg-[#050505] flex flex-col justify-center">
          <div className="w-full max-w-2xl">
             <div className="mb-20">
               <label className="block text-3xl font-light mb-8 text-gray-300">您希望以什么身份联结？</label>
               <select 
                 className="w-full bg-transparent border-b-2 border-white/10 pb-4 text-2xl focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none text-[#ECECEC] cursor-pointer"
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
               >
                 <option value="none" className="bg-[#111]">-- 开启通道 --</option>
                 <option value="project" className="bg-[#111]">项目方：寻求融资/上市辅导</option>
                 <option value="partner" className="bg-[#111]">考察者：意向申请城市合伙人</option>
                 <option value="institution" className="bg-[#111]">机构方：寻求项目联投/深度共建</option>
               </select>
             </div>

             {role === 'project' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="企业名称及核心商业模式" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <div className="w-full h-40 border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center text-gray-500 hover:text-white hover:border-white transition-colors cursor-pointer text-lg tracking-wider">
                   一键拖拽上传 PDF 商业计划书
                 </div>
                 <button className="bg-[#ECECEC] text-black px-12 py-5 text-lg font-medium hover:bg-white w-full transition-colors mt-8">递交总部枢纽</button>
               </div>
             )}
             {role === 'partner' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="您的拟覆盖区域界限 (城市/省区)" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <input type="text" placeholder="资金准备与本地政商资源概括" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <button className="bg-[#D4AF37] text-black px-12 py-5 text-lg font-medium hover:bg-[#e6be3d] w-full transition-colors mt-8">进入合伙人资质审查</button>
               </div>
             )}
              {role === 'institution' && (
               <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                 <input type="text" placeholder="资产管理规模或特长领域" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl focus:outline-none focus:border-white transition-colors text-white placeholder:text-gray-600"/>
                 <button className="bg-[#ECECEC] text-black px-12 py-5 text-lg font-medium hover:bg-white w-full transition-colors mt-8">进入机构白名单序列</button>
               </div>
             )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/contact/page.tsx
git commit -m "feat: complete split screen dynamic dark mode form"
```

### Task 6: Add Philosophy, OS, Galaxy & Vision Placeholders

**Files:**
- Create: `src/app/philosophy/page.tsx`
- Create: `src/app/os/page.tsx`
- Create: `src/app/galaxy/page.tsx`
- Create: `src/app/vision/page.tsx`

- [ ] **Step 1: Write placeholder implementations mapping the endpoints**
```tsx
// src/app/philosophy/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
export default function Philosophy() {
  return (
    <PageTransition>
        <Section className="items-center text-center"><h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#ECECEC]">峰峦思维。</h1></Section>
    </PageTransition>
  );
}
```

```tsx
// src/app/os/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
export default function OS() {
  return (
    <PageTransition>
        <div className="w-full min-h-screen bg-[#050505] flex items-center justify-center p-10"><h1 className="text-4xl text-gray-400">资本操作系统：融投管退横贯枢纽开发区</h1></div>
    </PageTransition>
  );
}
```

```tsx
// src/app/galaxy/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
export default function Galaxy() {
  return (
    <PageTransition>
        <div className="w-full min-h-screen bg-[#020202] flex items-center justify-center p-10"><h1 className="text-4xl text-gray-400">生态星系互动宇宙</h1></div>
    </PageTransition>
  );
}
```

```tsx
// src/app/vision/page.tsx
import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
export default function Vision() {
  return (
    <PageTransition>
        <Section className="items-center pt-40"><h1 className="text-5xl font-light text-[#ECECEC] mb-10">《第一性原理》内容卷宗矩阵开发区</h1></Section>
    </PageTransition>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/philosophy src/app/os src/app/galaxy src/app/vision
git commit -m "feat: outline deep layout architecture shells"
```
