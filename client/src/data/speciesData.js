// src/data/speciesData.js
export const SPECIES_DB = {
  "marine-mammals": {
    title: "Marine Mammals",
    subtitle:
      "Whales, Dolphins, Seals, Sea Lions, Walrus, Manatees, Otters & Polar Bear",

    groups: {
      /* ----------------------------------------------------
       * 1) ENDANGERED (Always show first)
       * ---------------------------------------------------- */
      Endangered: [
        {
          id: "blue-whale",
          name: "Blue Whale",
          image:
            "https://images.pexels.com/photos/58634/pexels-photo-58634.jpeg",
          status: "Endangered",
          about:
            "Largest animal on Earth; recovering slowly after historic whaling.",
        },
        {
          id: "humpback-whale",
          name: "Humpback Whale",
          image:
            "https://images.pexels.com/photos/591516/pexels-photo-591516.jpeg",
          status: "Endangered",
          about:
            "Iconic whale known for singing and breaching; threatened by ship strikes & entanglement.",
        },
        {
          id: "north-atlantic-right-whale",
          name: "North Atlantic Right Whale",
          image:
            "https://images.pexels.com/photos/2832038/pexels-photo-2832038.jpeg",
          status: "Endangered",
          about:
            "Among the world's most endangered whales — fewer than 350 remain.",
        },
        {
          id: "sperm-whale",
          name: "Sperm Whale",
          image:
            "https://images.pexels.com/photos/459449/pexels-photo-459449.jpeg",
          status: "Endangered",
          about:
            "Deep-diving giant known for hunting squid; threatened by noise pollution & entanglement.",
        },
        {
          id: "vaquita",
          name: "Vaquita Porpoise",
          image:
            "https://images.pexels.com/photos/5205249/pexels-photo-5205249.jpeg",
          status: "Endangered",
          about:
            "Critically endangered porpoise — fewer than 10 individuals remain in the wild.",
        },
        {
          id: "hawaiian-monk-seal",
          name: "Hawaiian Monk Seal",
          image:
            "https://images.pexels.com/photos/229574/pexels-photo-229574.jpeg",
          status: "Endangered",
          about:
            "One of the rarest seals; facing entanglement, low prey availability, and habitat loss.",
        },
        {
          id: "sea-otter",
          name: "Sea Otter",
          image:
            "https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg",
          status: "Endangered",
          about:
            "Crucial kelp-forest predator; extremely vulnerable to oil spills and pollution.",
        },
        {
          id: "polar-bear",
          name: "Polar Bear",
          image:
            "https://images.pexels.com/photos/3951845/pexels-photo-3951845.jpeg",
          status: "Endangered",
          about:
            "Marine bear dependent on sea ice for hunting; declining rapidly due to global warming.",
        },
      ],

      /* ----------------------------------------------------
       * 2) THREATENED (Always show second)
       * ---------------------------------------------------- */
      Threatened: [
        {
          id: "greenland-seal",
          name: "Greenland Seal",
          image:
            "https://images.pexels.com/photos/562401/pexels-photo-562401.jpeg",
          status: "Threatened",
          about:
            "Ice-dependent seal vulnerable to climate-driven habitat loss.",
        },
        {
          id: "steller-sea-lion",
          name: "Steller Sea Lion",
          image:
            "https://images.pexels.com/photos/230956/pexels-photo-230956.jpeg",
          status: "Threatened",
          about:
            "Largest sea lion; populations declining due to ecosystem and prey changes.",
        },
        {
          id: "west-indian-manatee",
          name: "West Indian Manatee",
          image:
            "https://images.pexels.com/photos/63705/manatee-sea-cow-underwater-63705.jpeg",
          status: "Threatened",
          about:
            "Gentle herbivore threatened by boat collisions and habitat destruction.",
        },
      ],

      /* ----------------------------------------------------
       * 3) LEAST CONCERN (Always last)
       * ---------------------------------------------------- */
      "Least Concern": [
        {
          id: "common-dolphin",
          name: "Common Dolphin",
          image:
            "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg",
          status: "Least Concern",
          about:
            "Fast and social dolphins found in warm-temperate oceans worldwide.",
        },
        {
          id: "bottlenose-dolphin",
          name: "Bottlenose Dolphin",
          image:
            "https://images.pexels.com/photos/4751904/pexels-photo-4751904.jpeg",
          status: "Least Concern",
          about:
            "Extremely intelligent and widespread; known for friendly behavior.",
        },
        {
          id: "harbor-porpoise",
          name: "Harbor Porpoise",
          image:
            "https://images.pexels.com/photos/459444/pexels-photo-459444.jpeg",
          status: "Least Concern",
          about: "Small shy porpoise species common in cold coastal waters.",
        },
        {
          id: "ringed-seal",
          name: "Ringed Seal",
          image:
            "https://images.pexels.com/photos/229574/pexels-photo-229574.jpeg",
          status: "Least Concern",
          about:
            "Smallest Arctic seal species; essential prey for polar bears.",
        },
        {
          id: "california-sea-lion",
          name: "California Sea Lion",
          image:
            "https://images.pexels.com/photos/980708/pexels-photo-980708.jpeg",
          status: "Least Concern",
          about:
            "Agile, playful, and very social species native to the Pacific coast.",
        },
        {
          id: "northern-fur-seal",
          name: "Northern Fur Seal",
          image:
            "https://images.pexels.com/photos/1464564/pexels-photo-1464564.jpeg",
          status: "Least Concern",
          about: "Fur seal with dense underfur; once heavily hunted.",
        },
        {
          id: "dugong",
          name: "Dugong",
          image:
            "https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg",
          status: "Least Concern",
          about: "Herbivorous marine mammal feeding exclusively on seagrass.",
        },
        {
          id: "marine-otter",
          name: "Marine Otter",
          image:
            "https://images.pexels.com/photos/981916/pexels-photo-981916.jpeg",
          status: "Least Concern",
          about: "Rare coastal otter species found along rocky shorelines.",
        },
      ],
    },
  },
  fish: {
    title: "Fish",
    subtitle: "From reef fish to large pelagics",
    groups: {
      "Least Concern": [
        {
          id: "clownfish",
          name: "Clownfish",
          image:
            "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Least Concern",
          about: "Colorful reef fish living among sea anemones.",
        },
        {
          id: "parrotfish",
          name: "Parrotfish",
          image:
            "https://images.pexels.com/photos/3681002/pexels-photo-3681002.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Least Concern",
          about: "Important reef grazers that keep algae under control.",
        },
      ],
      Threatened: [
        {
          id: "grouper",
          name: "Grouper",
          image:
            "https://images.pexels.com/photos/45947/grouper-fish-fishing-hooks-45947.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Threatened",
          about: "Many grouper species are vulnerable due to overfishing.",
        },
      ],
      Endangered: [
        {
          id: "sawfish",
          name: "Sawfish",
          image:
            "https://images.pexels.com/photos/257292/pexels-photo-257292.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Endangered",
          about:
            "Distinctive toothed rostrum — critically endangered in many regions.",
        },
      ],
    },
  },

  reptiles: {
    title: "Reptiles",
    subtitle: "Sea turtles and other marine reptiles",
    groups: {
      Threatened: [
        {
          id: "green-sea-turtle",
          name: "Green Sea Turtle",
          image:
            "https://images.pexels.com/photos/1287561/pexels-photo-1287561.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Threatened",
          about:
            "Herbivorous turtle that grazes seagrass; threatened by bycatch and habitat loss.",
        },
      ],
      "Least Concern": [
        {
          id: "marine-iguana",
          name: "Marine Iguana",
          image:
            "https://images.pexels.com/photos/1460664/pexels-photo-1460664.jpeg?auto=compress&cs=tinysrgb&w=800",
          status: "Least Concern",
          about: "Unique iguanas that forage in the sea (Galápagos).",
        },
      ],
      Endangered: [],
    },
  },

  // add more groups (crustaceans, mollusks, etc.) here if needed
};

export default SPECIES_DB;
