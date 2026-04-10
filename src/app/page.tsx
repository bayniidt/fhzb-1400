import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutUs } from "@/components/AboutUs";
import { Portfolios } from "@/components/Portfolios";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutUs />
        <Portfolios />
        {/* Other sections will be added here */}
      </main>
      <Footer />
    </div>
  );
}


