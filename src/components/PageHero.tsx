import React from "react";
import {
  websiteHeroSubtitleClassName,
  websiteHeroTitleClassName,
} from "@/lib/website-typography";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  language?: "zh" | "en";
  fullScreen?: boolean;
}

export function PageHero({
  title,
  subtitle,
  bgImage,
  language = "zh",
  fullScreen = true,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-[#000000] px-6 md:px-20 ${
        fullScreen
          ? "flex min-h-screen items-center"
          : "pt-40 pb-20"
      }`}
    >
      {bgImage && (
        <img 
          src={bgImage} 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero Background"
        />
      )}
      <div
        className={`relative z-10 mx-auto max-w-7xl ${
          fullScreen ? "w-full pt-24" : ""
        }`}
      >
        <h1 className={websiteHeroTitleClassName(language, "font-light")}>
          {title}
        </h1>
        {subtitle && (
          <p className={websiteHeroSubtitleClassName(language, "mt-8 max-w-2xl font-light")}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  );
}
