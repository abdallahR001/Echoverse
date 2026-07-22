import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import WorldSectionPurple from "./components/WorldSectionPurple";
import WorldSectionRed from "./components/WorldSectionRed";
import HowItWorks from "./components/HowItWorks";
import MultiverseSection from "./components/MultiverseSection";
import CTASection from "./components/CTASection";
import './globals.css'

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <WorldSectionPurple />
      <WorldSectionRed />
      <MultiverseSection />
      <HowItWorks />
      <CTASection />
    </>
  );
}
