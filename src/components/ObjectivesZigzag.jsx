import React from "react";

const OBJECTIVES = [
  {
    title: "Conservation & Protection",
    desc: "Marine biodiversity is under threat, and protecting species, habitats, and ecosystems has never been more urgent. Coral reefs, often called the ‘rainforests of the sea,’ shelter thousands of species but are rapidly declining due to warming waters. Mangroves safeguard our coasts while serving as nurseries for young fish, yet they are being cleared for development. Endangered species such as sea turtles, sharks, and dugongs face extinction if action is not taken. By conserving these habitats and species, we secure food, oxygen, medicine, and a stable climate not only for ourselves but also for future generations.",
    image: "/public/img-1.jpeg",
    cta: { text: "Learn More", href: "https://www.marinebio.org" },
  },
  {
    title: "Sustainable Use",
    desc: "Healthy oceans are vital for people and planet, yet overfishing, unsustainable aquaculture, and poorly managed coastal development threaten their balance. Responsible fisheries ensure fish stocks remain for future generations, while eco-friendly aquaculture provides food without polluting waters. Proper coastal management protects mangroves and reefs that defend communities from storms and erosion. By promoting practices that meet human needs while safeguarding marine ecosystems, we can achieve true harmony between development and conservation.",
    image: "/public/img-2.jpeg",
    cta: { text: "Our Practices", href: "/projects" },
  },
  {
    title: "Research & Monitoring",
    desc: "Effective marine conservation depends on science. By conducting regular surveys and ecosystem monitoring, researchers collect vital data on species populations, habitat conditions, and human impacts. From coral reef health checks to tagging sea turtles and measuring water quality, these studies reveal where action is most needed. The data not only supports restoration projects such as mangrove planting or coral rehabilitation but also guides governments in creating policies, protected areas, and sustainable fisheries. Research and monitoring ensure that conservation is based on evidence, not guesswork, making every effort more impactful.",
    image:
      "http://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg?_gl=1*kf3q67*_ga*MTE4MDM5NDI1NC4xNzU4OTcwMzY0*_ga_8JE65Q40S6*czE3NTg5NzAzNjQkbzEkZzEkdDE3NTg5NzExNDQkajMwJGwwJGgw",
    cta: { text: "View Research", href: "/research" },
  },
  {
    title: "Awareness & Education",
    desc: "Awareness and education are the heart of long-term marine conservation. Through workshops, school programs, and public campaigns, we aim to build a generation of ocean-literate citizens who understand the value of marine biodiversity. Children learn to see the ocean not just as a resource, but as a living system that sustains life on Earth. Local communities are empowered to become stewards of their coasts, taking responsibility for protecting coral reefs, mangroves, and fisheries. By inspiring collective action through knowledge, we ensure that ocean conservation becomes part of daily life, not just an occasional effort.",
    image:
      "https://www.marinebiodiversity.ca/wp-content/uploads/2025/06/coastal-marine-academy-collaboration.jpeg",
    cta: { text: "Get Educated", href: "/education" },
  },
  {
    title: "Collaboration",
    desc: "Marine conservation succeeds only when we work together. Our mission is to build strong partnerships with governments, NGOs, scientists, and local communities to scale impact beyond individual efforts. Governments have the power to establish protected areas and enforce policies, while NGOs bring expertise and global support. At the same time, local communities are empowered to act as stewards of their coasts, ensuring conservation is rooted in everyday life. By combining resources, knowledge, and action, collaboration transforms small-scale projects into regional and global movements that protect our oceans for future generations.",
    image:
      "https://media.istockphoto.com/id/2032406889/photo/male-leader-talking-to-his-team-about-plans-on-a-meeting-in-the-office.jpg?b=1&s=612x612&w=0&k=20&c=-KMAUlbTscJ3X7wZgO7QZm5t1AHAejQfjBVrPHe5d5o=",
    cta: { text: "Partner With Us", href: "/contact" },
  },
];

export default function ObjectivesZigzag() {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#023e8a] text-center mb-12">
          Our Objectives
        </h2>

        <div className="flex flex-col gap-16">
          {OBJECTIVES.map((obj, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={obj.title}
                className={`flex flex-col md:flex-row items-center md:items-start justify-between md:gap-10 ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image (fixed box 500x300, centered inside its half) */}
                <div className="md:w-1/2 w-full flex justify-start md:justify-center">
                  <div className="w-[500px] h-[300px] rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={obj.image}
                      alt={obj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content (flush right/left) */}
                <div className="md:w-1/2 w-full flex justify-start md:justify-center">
                  <div className="max-w-lg">
                    <h3 className="text-2xl md:text-3xl font-semibold text-[#023e8a]">
                      {obj.title}
                    </h3>
                    <p className="mt-4 leading-relaxed font-semibold text-sky-200 text-justify">
                      {obj.desc}
                    </p>
                    <a
                      href={obj.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transform transition duration-100 hover:scale-110 btn btn-primary mt-6"
                    >
                      {obj.cta.text}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
}
