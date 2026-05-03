"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function FamilyPage() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-black">
        <PageHero 
          title={t("投资案例", "PORTFOLIO")}
          subtitle={t("通过第一性原理，我们与具有全球雄心的创业者共同定义未来。", "Through first principles, we define the future alongside entrepreneurs with global ambitions.")}
          bgImage="/videos/股市_1.jpg"
          language={language}
        />
        
        {/* Portfolio Content would go here */}
        <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Mocked portfolio grid */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer group"
              >
                <span className="text-white/20 group-hover:text-white/80 font-bold transition-colors">
                  {t("公司", "COMPANY")} {i + 1}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

