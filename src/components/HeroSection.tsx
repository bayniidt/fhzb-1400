import React from "react";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Videos */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1] hidden md:block"
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1] md:hidden"
      >
        <source src="/videos/hero-mobile.mp4" type="video/mp4" />
      </video>

      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-black/30 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent to-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-[56px] font-light leading-[1.3] text-white tracking-[0.1em] mb-4">
          向下扎根， 向上生长
          <br />
          <span className="mt-2 block">黼蔀黻纪， 源远流长</span>
        </h1>
        <p className="mt-10 max-width-[800px] text-base md:text-lg font-normal leading-[1.5] text-white/90">
          专注投资于工业科技、企业服务、环境与材料、医疗科技、消费科技等五大领域。
        </p>
      </div>
    </section>
  );
}
