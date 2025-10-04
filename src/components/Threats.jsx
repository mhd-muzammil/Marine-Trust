import React from "react";

const ITEMS = [
  {
    title: "Plastic Pollution",
    desc: "Millions of tons of plastic enter the ocean each year, harming wildlife and ecosystems.",
  },
  {
    title: "Overfishing",
    desc: "Unsustainable fishing removes key species and destabilizes food webs.",
  },
  {
    title: "Climate Change",
    desc: "Warming and acidification lead to coral bleaching and habitat loss.",
  },
  {
    title: "Habitat Destruction",
    desc: "Coastal development and dredging destroy mangroves and seagrass beds.",
  },
];

export default function Threats() {
  return (
    <section className="bg-[#e0f7fa] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#000000] mb-8">
          Threats to Marine Life
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {ITEMS.map((i) => (
            <div
              key={i.title}
              className="transform transition duration-200 hover:scale-110 p-6 bg-yellow-300 rounded-lg shadow"
            >
              <h4 className="font-bold text-lg text-orange-600">{i.title}</h4>
              <p className="mt-2 text-gray-900">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
