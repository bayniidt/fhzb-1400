import { PageTransition } from "@/components/ui/PageTransition";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function Alliance() {
  return (
    <PageTransition>
      <Section className="bg-[#050505] !min-h-[60vh] pt-32">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-[#FAFAFA]">伙伴联盟</h1>
        <p className="text-3xl text-gray-400 font-light max-w-2xl">同频者共进。</p>
      </Section>
      
      <Section className="bg-[#080808]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div><h2 className="text-5xl md:text-6xl font-light text-gray-200">企业方<br/><span className="text-gray-500">上市跑道</span></h2></div>
          <div>
            <p className="text-gray-400 leading-relaxed text-xl mb-12">从商业模式重构到上市，我们不仅投钱，更投入认知。数十个成功案例验证的真实资本赋能引擎，只为具有颠覆潜质的实业服务。</p>
            <div className="flex gap-4 items-baseline">
                <div className="text-[#D4AF37] text-7xl md:text-9xl font-bold tracking-tighter">100%</div>
                <div className="text-xl uppercase tracking-widest text-[#D4AF37]">过会率目标承诺</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#050505]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div><h2 className="text-5xl md:text-6xl font-light text-gray-200">生态合伙人<br/><span className="text-gray-500">区域核心</span></h2></div>
          <div>
            <p className="text-gray-400 leading-relaxed text-xl mb-12">区域独家特许壁垒，总部品牌直达终端。与我们同频，享有核心生态利润分润与基石基金的优先跟投权。</p>
            <ul className="space-y-8 lg:text-3xl font-light">
              <li className="border-b border-white/10 pb-6 flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">01</span> 品牌独家授权体系</li>
              <li className="border-b border-white/10 pb-6 flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">02</span> 利润专项高额分成</li>
              <li className="flex justify-between items-center hover:text-[#D4AF37] transition-colors"><span className="opacity-40 text-sm">03</span> 中央基金盲池跟投保障</li>
            </ul>
          </div>
        </div>
      </Section>
      
      <Section className="items-center text-center bg-[#080808] !min-h-[50vh]">
          <Link href="/contact" className="px-12 py-6 border border-white hover:bg-white hover:text-black transition-all text-xl font-medium tracking-wide">对接您的独家赋能方案</Link>
      </Section>
    </PageTransition>
  );
}
