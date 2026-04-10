import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#080808]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-black to-black"></div>
        </div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-[#ECECEC]">资本遇见雄心<br/>我们共筑峰峦</h1>
          <div className="flex gap-6 justify-center mt-16">
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white hover:text-black transition-all">成为生态伙伴</Link>
            <Link href="/os" className="px-8 py-4 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all">探索资本路径</Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <Section className="bg-[#030303] items-center text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-relaxed max-w-4xl text-gray-500">
          真正的资本是<span className="text-white font-normal relative after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-px after:bg-[#D4AF37]">加速器</span>，<br/>并非收割器。
        </h2>
      </Section>
      
      {/* Core Values */}
      <Section className="gap-24 bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">立足高远</h3>
            </div>
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">路径坚实</h3>
            </div>
            <div className="h-[60vh] bg-[#0c0c0c] border border-white/5 relative group p-10 flex items-end overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90 z-10"></div>
                <h3 className="text-4xl relative z-20 font-medium text-gray-300 group-hover:text-white transition-colors">价值共生</h3>
            </div>
        </div>
      </Section>
      
      {/* Footer Teaser */}
      <Section className="items-center text-center bg-[#020202]">
          <p className="text-3xl text-gray-300 mb-10 font-light">我们绘制的是空中楼阁，还是登峰地图？</p>
          <Link href="/contact" className="text-sm uppercase tracking-widest border-b border-[#D4AF37] text-[#D4AF37] pb-1 hover:text-white hover:border-white transition-colors">寻找答案 &rarr;</Link>
      </Section>
    </PageTransition>
  );
}
