import React from "react";
import { FaLeaf, FaMicroscope, FaBookOpen, FaHandshake } from "react-icons/fa";

import StoryBg from "../assets/UW-C BG.jpg";
import ValuesCards from "../components/ValuesCards";
import CTA from "../components/CTA";
import WhoWeAreCarousel from "../components/WhoWeAre";
import UnderwaterScene from "../components/UnderwaterScene";


export default function About() {
  return (<>
      <UnderwaterScene />
      <div>
        {/* Who We Are */}
        <section
        //   className="relative h-[500px] flex items-center justify-center text-center text-white"
        //   style={{
        //     backgroundImage: `url(${StoryBg})`,
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //   }}
        // >
        //   <div className="absolute inset-0 bg-black/50"></div>
        //   <div className="relative max-w-3xl px-6">
        //     <h2 className="text-violet-400 text-4xl font-bold mb-4">
        //       Who We Are
        //     </h2>
        //     <p className="text-lime-200 font-semibold ">
        //       We are a collective of ocean advocates, scientists, and community
        //       members working to conserve marine biodiversity. Our focus is on
        //       protecting endangered species, restoring coral reefs and
        //       mangroves, promoting sustainable practices, and empowering people
        //       with education and awareness.
        //     </p>
        //   </div>
        
        
        ><WhoWeAreCarousel/></section>
        

        {/* Mission & Vision */}
        <section className="bg-lime-100 max-w-8xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          <div className="bg-sky-200 shadow rounded-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <img
              src="https://media.istockphoto.com/id/1217125004/photo/fish-farm-in-calm-sea.jpg?s=612x612&w=0&k=20&c=obZkczS9MIgsZZ-eMHhO8z-Y-ME0n21l3PMi9IX90Kc="
              alt="Mission"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-2">
                Our Mission
              </h3>
              <p className="text-gray-700 font-semibold">
                Our mission is to safeguard marine biodiversity through a
                holistic approach that combines conservation, education,
                research, and sustainable practices. We are dedicated to
                protecting vital ecosystems such as coral reefs, mangroves, and
                seagrass meadows while ensuring the survival of endangered
                species that call them home. <br />
                <br />
                We work to promote responsible fisheries and aquaculture,
                restore degraded habitats, and empower coastal communities with
                the knowledge and tools to manage resources sustainably. Through
                scientific surveys and data-driven strategies, we guide
                effective policy decisions and conservation actions. By engaging
                schools, youth, and local leaders, we nurture a culture of ocean
                stewardship where everyone becomes a guardian of the sea.
                <br />
                <br /> At the heart of our mission lies a simple truth: the
                ocean is life. Protecting it today means protecting food
                security, livelihoods, climate stability, and a healthy planet
                for all.
              </p>
            </div>
          </div>

          <div className="bg-emerald-300 shadow rounded-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <img
              src="https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?_gl=1*1vecrtj*_ga*MTE4MDM5NDI1NC4xNzU4OTcwMzY0*_ga_8JE65Q40S6*czE3NTg5NzcwOTEkbzIkZzAkdDE3NTg5NzcwOTEkajYwJGwwJGgw"
              alt="Vision"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-2">
                Our Vision
              </h3>
              <p className="text-gray-700 font-semibold">
                We envision a future where oceans are thriving, resilient, and
                abundant — a future where coral reefs flourish with life,
                mangrove forests shield coasts, and marine species swim freely
                in clean, healthy waters. In this vision, communities live in
                harmony with the sea, drawing livelihoods without exhausting its
                resources, while governments, scientists, and organizations work
                hand-in-hand to sustain marine ecosystems.
                <br /> <br />
                We dream of a world where every child grows up with ocean
                literacy, where sustainable fishing is the norm, where
                coastlines are naturally protected from storms, and where marine
                biodiversity is valued as much as economic growth.
                <br />
                <br /> Our vision is a legacy — to ensure that the beauty,
                richness, and life-giving power of the oceans are passed on
                intact to future generations.
              </p>
            </div>
          </div>
          <div className="bg-pink-200 shadow rounded-xl overflow-hidden transform transition duration-200 hover:scale-105">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg"
              alt="Vision"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#023e8a] mb-2">
                Our Approach
              </h3>
              <p className="text-gray-700 font-semibold">
                Our approach is rooted in collaboration, science, and community
                empowerment. We believe that lasting ocean conservation comes
                from combining knowledge with action. That’s why we integrate
                cutting-edge scientific research with local wisdom to develop
                solutions that work both for ecosystems and the people who
                depend on them.
                <br /> <br />
                We focus on practical strategies: restoring coral reefs and
                mangroves, promoting sustainable fishing and aquaculture, and
                conducting data-driven monitoring programs that inform policy.
                At the same time, we invest in education and awareness campaigns
                to build a culture of ocean stewardship, where communities,
                schools, and individuals play an active role in protecting
                marine life.
                <br />
                <br /> By working hand-in-hand with governments, NGOs, and local
                communities, we ensure that conservation efforts scale beyond
                individual projects, creating ripple effects that protect oceans
                regionally and globally. Our approach is holistic, inclusive,
                and driven by the belief that protecting the sea is a shared
                responsibility one that requires both global cooperation and
                local action.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <ValuesCards />

        {/* Story */}
        <section className="bg-sky-100 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#023e8a] mb-6">
              Our Story
            </h2>
            <p className="text-sky-700 leading-relaxed mb-4 font-semibold">
              Our story began with a simple but powerful realization the ocean,
              the very foundation of life on Earth, was showing signs of
              distress. Local communities started noticing fewer fish in their
              nets, beaches covered in plastic rather than shells, and coral
              reefs that once flourished turning pale and lifeless. These
              changes weren’t distant problems; they were happening right here,
              in our waters. <br />
              <br />
              What started as a small group of volunteers teachers, students,
              fishers, and ocean lovers cleaning beaches and raising awareness
              in schools soon grew into a larger movement. We realized that
              protecting marine biodiversity required more than one-off efforts:
              it demanded science, community participation, and long-term
              commitment. <br />
              <br />
              Over time, we expanded into coral reef restoration, mangrove
              planting, sustainable fishing campaigns, and educational programs.
              Collaborations with NGOs, governments, and scientists strengthened
              our reach, while youth-led programs inspired the next generation
              of ocean stewards. <br />
              <br />
              Today, our story is still being written. What began as a local
              initiative has evolved into a dedicated trust working to protect
              marine ecosystems on a larger scale. We carry forward the same
              spirit — that small actions, when multiplied, can transform the
              future of our oceans.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <CTA />
    </div>
    </>
    );
}
