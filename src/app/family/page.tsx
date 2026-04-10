import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";

export default function FamilyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-black">
        <PageHero 
          title="投资案例" 
          subtitle="纪源资本是一家全球领先的风险投资公司，专注投资于工业科技、企业服务、环境与材料、医疗科技、消费科技等五大领域。" 
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
                  COMPANY {i + 1}
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

