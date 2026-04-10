"use client";

import React from "react";

export function Portfolios() {
  return (
    <section id="portfolios" className="relative min-h-[60vh] w-full bg-[#0a0a0a] flex flex-col justify-center items-center py-20 px-6">
      <h2 className="text-3xl md:text-4xl font-light text-white mb-20">投资案例</h2>
      
      {/* Logos Row (Simulated) */}
      <div className="w-full overflow-hidden relative">
        <div className="flex gap-20 animate-scroll whitespace-nowrap items-center">
          {["Airbnb", "阿里巴巴", "字节跳动", "小红书", "Slack", "Square", "Peloton", "Grab", "Keep", "商汤科技"].map((brand) => (
            <div key={brand} className="text-2xl md:text-3xl font-bold text-white/30 hover:text-white/70 transition-colors cursor-default">
              {brand}
            </div>
          ))}
          {/* Repeat for seamless scroll */}
          {["Airbnb", "阿里巴巴", "字节跳动", "小红书", "Slack", "Square", "Peloton", "Grab", "Keep", "商汤科技"].map((brand) => (
            <div key={`${brand}-2`} className="text-2xl md:text-3xl font-bold text-white/30 hover:text-white/70 transition-colors cursor-default">
              {brand}
            </div>
          ))}
        </div>
      </div>

      {/* CSS for scroll animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
