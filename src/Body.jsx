import React from "react";
// import Hero from "./components/Hero";
import ObjectivesZigzag from "./components/ObjectivesZigzag";
import Threats from "./components/Threats";
import CTA from "./components/CTA";

export default function Body() {
  return (
    <main>
      {/* <Hero /> */}
      <ObjectivesZigzag />
      <Threats />
      <CTA />
    </main>
  );
}
