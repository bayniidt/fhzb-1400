import React from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export function PageHero({ title, subtitle, bgImage }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-20 bg-[#121212] overflow-hidden">
      {bgImage && (
        <img 
          src={bgImage} 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero Background"
        />
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 text-xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
    </section>
  );
}
