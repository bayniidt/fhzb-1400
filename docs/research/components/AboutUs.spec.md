# AboutUs Specification

## Overview
- **Target file**: `src/components/AboutUs.tsx`
- **Interaction model**: Static with background/side video.

## DOM Structure
- `section`: h-screen, bg-black, flex items-center
  - `div`: Max-width container, 2-column grid
    - `div`: Text content (left)
      - `h2`: "成立于2005年"
      - `h2`: "中国风险投资市场的领导者"
      - `p`: Description
    - `div`: Video/Canvas area (right)
      - `video`: `about-block.mp4`

## Computed Styles
- Titles: `text-[56px] font-light leading-[1.3]`
- Description: `text-lg font-normal text-white/70 max-w-xl mt-8`
- Container: `content-center`
