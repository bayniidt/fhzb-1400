import React from 'react';

/**
 * Extracted SVG icons from jiyuancap.com
 * Usage: import { HamburgerIcon, ArrowUpRightIcon } from '@/components/icons'
 */

export const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.7-2.1 1.2v-1h-3.1v10.1h3.1v-5.3c0-.3 0-.6.1-.8.2-.5.7-.8 1.4-.8.9 0 1.2.7 1.2 1.8v5.1h3.1M6.7 8.3C7.7 8.3 8.3 7.7 8.3 6.8c0-.9-.6-1.5-1.6-1.5-1 0-1.6.6-1.6 1.5 0 .9.6 1.5 1.6 1.5M8.2 18.5V8.4H5.1v10.1h3.1z"/>
  </svg>
);

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Placeholder for the logo SVG path if I find it, otherwise we'll use an image or text */}
    <text x="0" y="30" fill="currentColor" fontSize="24" fontWeight="bold">JIYUAN</text>
  </svg>
);
