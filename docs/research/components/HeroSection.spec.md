# HeroSection Specification

## Overview
- **Target file**: `src/components/HeroSection.tsx`
- **Screenshot**: `docs/design-references/homepage/desktop.png`
- **Interaction model**: Static with background video.

## DOM Structure
- `section`: Outer container (h-screen, relative)
  - `video`: Background video (absolute, object-cover)
  - `div`: Overlay (absolute inset-0, radial gradient for depth)
  - `div`: Content wrapper (relative, flex flex-col justify-center items-center)
    - `h1`: Main heading (line 1)
    - `h1`: Main heading (line 2)
    - `p`: Subtext/Description

## Computed Styles (Desktop)

### Container
- height: `100vh`
- display: `flex`
- flex-direction: `column`
- justify-content: `center`
- align-items: `center`
- overflow: `hidden`

### Background Video
- position: `absolute`
- top: `0`, left: `0`
- width: `100%`, height: `100%`
- object-fit: `cover`
- z-index: `-1`

### Main Heading (h1)
- font-size: `56.32px` (3.5rem)
- font-weight: `300` (Light)
- line-height: `1.3`
- color: `#FFFFFF`
- text-align: `center`
- letter-spacing: `0.1em`

### Subtext (p)
- font-size: `18px`
- font-weight: `400`
- line-height: `27px`
- color: `#FFFFFF`
- margin-top: `40px`
- max-width: `800px`
- text-align: `center`

## Text Content
- Heading Line 1: "向下扎根， 向上生长"
- Heading Line 2: "黼蔀黻纪， 源远流长"
- Subtext: "专注投资于工业科技、企业服务、环境与材料、医疗科技、消费科技等五大领域。"

## Responsive Behavior
- **Mobile (< 768px)**:
  - Heading font-size: `32px`
  - Subtext font-size: `16px`
  - Video switched to mobile version (`hero-mobile.mp4`)

## Assets
- Desktop Video: `/videos/hero-desktop.mp4`
- Mobile Video: `/videos/hero-mobile.mp4`
