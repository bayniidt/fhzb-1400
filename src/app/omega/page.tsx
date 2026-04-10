import { Navbar } from "@/components/Navbar";
import { PageHero } from "@/components/PageHero";
import { Footer } from "@/components/Footer";

export default function OmegaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-black">
        <PageHero 
          title="OMEGA 计划" 
          subtitle="OMEGA 计划由纪源资本发起，旨在为处于初创阶段的创业者提供全方位的支持，陪伴中国创业者共同成长。" 
        />
        
        {/* Omega Stats */}
        <section className="px-6 md:px-20 py-20 bg-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-light text-white mb-2">300+</div>
              <div className="text-white/50">已投资项目</div>
            </div>
            <div>
              <div className="text-5xl font-light text-white mb-2">50+</div>
              <div className="text-white/50">上市公司</div>
            </div>
            <div>
              <div className="text-5xl font-light text-white mb-2">15+</div>
              <div className="text-white/50">年投资经验</div>
            </div>
          </div>
        </section>

        {/* Batch Info */}
        <section className="px-6 md:px-20 py-20 max-w-7xl mx-auto w-full">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/omega-batch.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12">
              <h3 className="text-4xl text-white font-light">OMEGA 圆桌派</h3>
              <p className="mt-4 text-white/70 max-w-xl">
                与顶尖创业者深度对话，探索科技与未来的边界。
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

