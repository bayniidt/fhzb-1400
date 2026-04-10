import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 text-xl text-white/60 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
