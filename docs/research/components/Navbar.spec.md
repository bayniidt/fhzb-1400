# Navbar Specification

## Overview
- **Target file**: `src/components/Navbar.tsx`
- **Screenshot**: `docs/design-references/homepage/desktop.png`
- **Interaction model**: Scroll-driven background transition.

## DOM Structure
- `nav`: Parent container (sticky)
  - `div`: Max-width container (flex)
    - `a`: Logo link
      - `LogoIcon` (from icons.tsx)
    - `div`: Desktop menu links container
      - `a`: Nav links (About, Portfolios, Philosophy, Insights, Contact)
    - `div`: Mobile menu toggle (visible only on mobile)

## Computed Styles (Desktop)

### Container (initial state)
- position: `sticky`
- top: `0`
- zIndex: `50`
- height: `64px`
- background-color: `rgba(0, 0, 0, 0)` (transparent)
- transition: `all 0.5s ease-out`
- padding: `0 40px`

### Container (scrolled state > 50px)
- background-color: `rgba(0, 0, 0, 0.8)`
- backdrop-filter: `blur(8px)`
- border-bottom: `1px solid rgba(255, 255, 255, 0.1)`

### Nav Links
- font-size: `16px`
- font-weight: `400`
- line-height: `32px`
- color: `#FFFFFF`
- padding: `16px 0`
- margin-left: `40px`
- transition: `opacity 0.3s ease-out`

### Nav Links (hover)
- opacity: `0.7`

## Responsive Behavior
- **Mobile (< 768px)**: 
  - Desktop link container hidden.
  - Hamburger menu icon visible.
  - Logo scales down.
  - Click hamburger opens full-screen overlay with larger links.

## Assets
- Logo: `LogoIcon` from `icons.tsx`
