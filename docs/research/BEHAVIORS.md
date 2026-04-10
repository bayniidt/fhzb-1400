# Global Behaviors

## Scroll Animations
- **Reveal on Scroll**: Most sections and cards use `animate__fadeIn` or `animate__slideInUp` when entering the viewport.
- **Navbar Scroll**: The navbar starts transparent and becomes semi-transparent black with a backdrop-filter after scrolling ~50px.
- **Sticky Elements**: Navbar is `sticky top-0`.

## Hover Effects
- **Links/Buttons**: Opacity transition (typically 1.0 -> 0.7 or 0.8).
- **Portfolio Cards**: Slight scale-up and shadow increase on hover.

## Interaction Models
- **Homepage Insights**: Horizontal slider/carousel for articles.
- **Family Page**: Tab-based filtering for the portfolio grid.
- **Omega Page**: Statistical counters that animate from 0 to target value on scroll.

## Media
- **Background Video**: The hero uses an auto-playing, looped, muted video background.
- **3D Canvas**: "About Us" section contains a 3D cube (possibly Three.js or similar).
