import React from "react";

export function AboutUs() {
  return (
    <section id="about" className="relative min-h-screen w-full bg-black flex items-center px-6 md:px-20 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-[56px] font-light leading-[1.2] text-white">
            成立于2005年
          </h2>
          <h2 className="text-4xl md:text-[56px] font-light leading-[1.2] text-white mt-4">
            中国风险投资市场的领导者
          </h2>
          <p className="mt-12 text-lg md:text-xl font-normal text-white/70 leading-relaxed max-w-xl">
            纪源资本团队管理规模约300亿人民币，全阶段布局，覆盖具备快速增长潜力的早期、成长期和中后期项目。
          </p>
        </div>

        {/* 3D Cube Video */}
        <div className="relative flex justify-center items-center">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-[500px] h-auto object-contain"
          >
            <source src="/videos/about-block.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
