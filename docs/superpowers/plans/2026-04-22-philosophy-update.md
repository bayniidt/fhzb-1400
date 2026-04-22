# Philosophy 页面文化区块更新实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 更新 Philosophy 页面的“三大文化支柱”和“文化象征与仪式”区块，集成视频资源并优化文案。

**Architecture:** 
- 修改 `src/app/philosophy/page.tsx` 中的数据结构。
- 在“三大文化支柱”中使用 `<video>` 标签替换原有静态内容。
- 在“文化象征与仪式”中增加“图腾解”内容并集成视频。

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion.

---

### Task 1: 更新“三大文化支柱”数据与渲染

**Files:**
- Modify: `src/app/philosophy/page.tsx`

- [ ] **Step 1: 更新 pillars 数据数组**
    - 添加视频路径字段。
    - 更新描述文案。

- [ ] **Step 2: 修改渲染逻辑**
    - 在卡片背景或核心位置添加 `<video>` 标签，设置 `autoPlay`, `muted`, `loop`, `playsInline`。

### Task 2: 更新“文化象征与仪式”区块

**Files:**
- Modify: `src/app/philosophy/page.tsx`

- [ ] **Step 1: 修改标题并添加“图腾解”内容**
    - 将标题改为与三大文化支柱一致的样式。
    - 在标题下方添加“Logo ‘峰峦’ 图腾解”的文字描述。

- [ ] **Step 2: 集成 footer 视频**
    - 在该区块添加 `/videos/footer-compressed.mp4` 作为背景或视觉焦点。

- [ ] **Step 3: 优化仪式展示文案**
    - 确保“登峰路演会”、“生态共建日”、“承诺兑现典礼”等内容准确展示。

### Task 3: 验证与调整

- [ ] **Step 1: 检查视频播放情况**
    - 确保所有视频在不同设备上都能自动播放且静音。
- [ ] **Step 2: 检查响应式布局**
    - 确保视频在移动端和桌面端都有良好的展示效果。
