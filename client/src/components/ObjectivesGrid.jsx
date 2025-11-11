// src/components/ObjectivesGrid.jsx
import React from "react";

const OBJECTIVES = [
  {
    title: "Conservation & Protection",
    desc: "Protect critical habitats like coral reefs, mangroves and seagrass using targeted restoration and protected areas.",
    icon: "🪸",
  },
  {
    title: "Sustainable Fisheries",
    desc: "Work with fishers to adopt practices that keep stocks healthy while supporting livelihoods and food security.",
    icon: "🐟",
  },
  {
    title: "Science & Monitoring",
    desc: "Collect data, monitor ecosystems and run evidence-led restoration so actions are measurable and scalable.",
    icon: "🔬",
  },
  {
    title: "Education & Community",
    desc: "Train coastal communities and schools to become local stewards and advocates for ocean health.",
    icon: "📚",
  },
  {
    title: "Policy & Advocacy",
    desc: "Partner with local authorities to create enforceable protections and community-based management.",
    icon: "⚖️",
  },
  {
    title: "Partnerships",
    desc: "Collaborate with NGOs, research institutions and businesses to amplify impact and secure funding.",
    icon: "🤝",
  },
];

export default function ObjectivesGrid() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Our Objectives
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OBJECTIVES.map((o) => (
          <div
            key={o.title}
            className="bg-white/5 border border-white/6 p-6 rounded-2xl hover:translate-y-1 transition transform"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{o.icon}</div>
              <h3 className="text-lg font-semibold text-white">{o.title}</h3>
            </div>
            <p className="mt-4 text-sky-100/80">{o.desc}</p>
            <a
              href="#"
              className="inline-block mt-4 text-sm font-semibold text-[#00b4d8] hover:underline"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
