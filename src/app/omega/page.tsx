"use client";

import { Navbar } from "@/components/layout/Navbar"
import { PageHero } from "@/components/PageHero"
import { useLanguage } from "@/context/LanguageContext"

export default function OmegaPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-black">
        <PageHero 
          title={t("峰壑数据看板", "OMEGA PROGRAM")}
          subtitle={t("实时呈现生态总规模、成功案例、行业覆盖与网络活跃度。用动态可视化数据，让资本价值可量化、可信任。。", "The OMEGA Program, initiated by Fenghe Capital, aims to provide all-round support for early-stage entrepreneurs, growing alongside China's innovators.")}
          bgImage="/fhzb-1400/videos/背景图_3.jpg"
        />
        
        {/* Omega Stats */}
        <section className="px-6 md:px-20 py-20 bg-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-light text-white mb-2">300+</div>
              <div className="text-white/50">{t("生态总规模", "Invested Projects")}</div>
            </div>
            <div>
              <div className="text-5xl font-light text-white mb-2">50+</div>
              <div className="text-white/50">{t("上市公司", "Public Companies")}</div>
            </div>
            <div>
              <div className="text-5xl font-light text-white mb-2">15+</div>
              <div className="text-white/50">{t("年投资经验", "Years of Experience")}</div>
            </div>
          </div>
        </section>

        {/* Batch Info */}
        <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto w-full">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
            <img
              src="/fhzb-1400/videos/背景图_4.jpg"
              className="absolute inset-0 w-full h-full object-cover"
              alt="OMEGA Batch"
            />
            <div className="absolute inset-0 bg-black/10 flex flex-col justify-end p-12">
              <h3 className="text-4xl text-white font-light">{t("OMEGA 圆桌派", "OMEGA Roundtable")}</h3>
              <p className="mt-4 text-white font-light max-w-xl shadow-lg">
                {t("与顶尖创业者深度对话，探索科技与未来的边界。", "Deep dialogues with top entrepreneurs, exploring the boundaries of technology and the future.")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

