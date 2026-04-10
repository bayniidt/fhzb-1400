# 峰壑资本“高级金”视觉升级实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将网站视觉调性从纯冷黑升级为具有“老钱”质感的高级暗金方案（温润石墨与流金），并集成股市素材。

**Architecture:** 通过 CSS 变量 (`globals.css`) 定制全新的暖调石墨色底色，并在各页面组件中植入基于 Framer Motion 的金色径向渐变光晕 (Light Leaks)。同步替换关键板块的背景图片/视频为新增的股市素材。

**Tech Stack:** Next.js 16, Tailwind CSS, Framer Motion, Playfair Display (Serif)

---

### Task 1: 全局底色与颜色变量调整
**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 更新 globals.css 颜色变量**
    将 `--background` 更新为 `#121212`，补全辅助暖色变量。
- [ ] **Step 2: 在 layout.tsx 中更新全局底色样式**
    确保全站容器使用新的暖调石墨色。
- [ ] **Step 3: 提交更改**

### Task 2: 首页 (Home) 视觉调优与金辉层
**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 首页 Hero 区增加动态金辉 (Light Leak)**
    使用 Framer Motion 实现一个极低透明度的背景金色漫反射动画。
- [ ] **Step 2: 优化“核心价值枢纽”卡片样式**
    微调卡片背景为 `#1C1C1C`，增加悬停时的金色外发光效果。
- [ ] **Step 3: 提交更改**

### Task 3: 资本操作系统 (OS) 素材集成与调色
**Files:**
- Modify: `src/app/os/page.tsx`

- [ ] **Step 1: 替换主背景图为股市素材**
    将 `/videos/股市_1.jpg` 应用为底层背景。
- [ ] **Step 2: 应用金黄色调滤镜**
    使用 Tailwind 滤镜 (sepia, brightness) 确保素材与金奢调性统一。
- [ ] **Step 3: 提交更改**

### Task 4: 峰壑视野 (Vision) 封面素材替换
**Files:**
- Modify: `src/app/vision/page.tsx`

- [ ] **Step 1: 替换研报/纪录片封面占位图**
    使用 `股市_2.jpg`, `股市_3.jpg`, `股市_4.jpg` 替换现有占位图。
- [ ] **Step 2: 确保文字在复杂背景下的可读性**
    增加文字阴影或底层半透明遮罩。
- [ ] **Step 3: 提交更改**

### Task 5: 导航栏 (Navbar) 与激活态精修
**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: 导航栏底色调整为 #161616 哑光黑**
- [ ] **Step 2: 增加导航项点击时的金色流光动效**
- [ ] **Step 3: 提交更改**
