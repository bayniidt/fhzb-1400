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
}

export function PageHero({ title, subtitle, bgImage, language = "zh" }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-20 bg-[#000000] overflow-hidden">
      {bgImage && (
        <img 
          src={bgImage} 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero Background"
        />
      )}
      <div className="max-w-7xl mx-auto relative z-10">
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
