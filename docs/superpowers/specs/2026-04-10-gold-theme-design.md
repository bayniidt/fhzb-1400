# 峰壑资本“高级金”视觉升级规范 (方案 A)

## 1. 核心视觉理念
将原本纯冷的黑色调升级为带有色温潜流的“石墨暖黑”，通过模拟自然光泄露 (Light Leaks) 的金色动态光效，赋予页面深邃、温润且具有生命力的专业资本质感。

## 2. 颜色系统 (Color Tokens)
- **Primary Background (Base)**: `#121212` (主石墨色)
- **Secondary Background (Surface)**: `#181816` (暖调石墨色，用于卡片或背景渐变)
- **Accent Color (Gold)**: `#D4AF37` (哑光金，主色点缀)
- **Border/Divider**: `rgba(255, 255, 255, 0.15)` (高透亮白色辅助线)
- **Glow/Light Leak**: `rgba(212, 175, 55, 0.05)` (动态金光)

## 3. 股市素材 (股市_1.jpg - 股市_5.jpg) 集成方案
- **板块：资本操作系统 (/os)**
  - 使用 `股市_1.jpg` 作为底层视差背景。
  - 应用滤镜：`grayscale(30%) brightness(50%) contrast(120%) sepia(30%)` (模拟金黄色调)。
  - 混合模式：`overlay` 与金色层叠加。
- **板块：峰壑视野 (/vision)**
  - `股市_2.jpg`, `股市_3.jpg`, `股市_4.jpg` 分别作为研报封面占位图。
  - `股市_5.jpg` 作为媒体中心的新闻背景。

## 4. 关键动效规范
- **Gold Light Leaks**: 在每个页面的关键 Section (Hero, OS, Vision) 的左上方添加一个极其柔和的径向渐变光晕，并伴随 5-10 秒周期的微弱缩放/透明度变化。
- **Interactive Highlighting**: 
  - 导航项激活态：文字变为 `#D4AF37`，下方金色指示线 `scale-x-100`。
  - 卡片 Hover：边框透明度从 `0.1` 提升至 `0.4`，并产生微弱的金色外阴影。

## 5. 实施范围
- `src/app/layout.tsx` (全局底色与变量)
- `src/app/globals.css` (全局样式与指示器)
- `src/app/page.tsx` (首页)
- `src/app/os/page.tsx` (操作系统板块素材替换)
- `src/app/vision/page.tsx` (视野板块封面替换)
- `src/components/layout/Navbar.tsx` (激活态微调)
