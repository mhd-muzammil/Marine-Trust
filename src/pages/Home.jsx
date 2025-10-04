import React from "react";
import Hero from "../components/Hero";
import ObjectivesZigzag from "../components/ObjectivesZigzag";
import Threats from "../components/Threats";
import CTA from "../components/CTA";
import HeroWaves from "../components/HeroWaves";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroWaves />
      <ObjectivesZigzag />
      <Threats />
      <CTA />
    </main>
  );
}
