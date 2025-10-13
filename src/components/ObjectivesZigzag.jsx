// src/components/ObjectivesZigzag.jsx
import React, { useRef, useEffect } from "react";

/**
 * ObjectivesZigzag.jsx
 * - Uses Three.js in a client-only/dynamic way (lazy import inside useEffect).
 * - Adds a subtle 3D animated background (particles + rotating shape).
 * - Keeps your OBJECTIVES array and markup, but adds hover/animation styling.
 *
 * Install three:
 *   npm install three
 *
 * Notes:
 * - If using Next.js, either put "use client"; at top or dynamic import the component with ssr:false.
 * - Image paths: if images are in the Vite `public/` folder, reference them like "/img-1.jpeg" (no /public prefix).
 */

const OBJECTIVES = [
  {
    title: "Conservation & Protection",
    desc: "Marine biodiversity is under threat, and protecting species, habitats, and ecosystems has never been more urgent. Coral reefs, often called the ‘rainforests of the sea,’ shelter thousands of species but are rapidly declining due to warming waters. Mangroves safeguard our coasts while serving as nurseries for young fish, yet they are being cleared for development. Endangered species such as sea turtles, sharks, and dugongs face extinction if action is not taken. By conserving these habitats and species, we secure food, oxygen, medicine, and a stable climate not only for ourselves but also for future generations.",
    image: "/img-1.jpeg",
    cta: { text: "Learn More", href: "https://www.marinebio.org" },
  },
  {
    title: "Sustainable Use",
    desc: "Healthy oceans are vital for people and planet, yet overfishing, unsustainable aquaculture, and poorly managed coastal development threaten their balance. Responsible fisheries ensure fish stocks remain for future generations, while eco-friendly aquaculture provides food without polluting waters. Proper coastal management protects mangroves and reefs that defend communities from storms and erosion. By promoting practices that meet human needs while safeguarding marine ecosystems, we can achieve true harmony between development and conservation.",
    image: "/img-2.jpeg",
    cta: { text: "Our Practices", href: "/projects" },
  },
  {
    title: "Research & Monitoring",
    desc: "Effective marine conservation depends on science. By conducting regular surveys and ecosystem monitoring, researchers collect vital data on species populations, habitat conditions, and human impacts. From coral reef health checks to tagging sea turtles and measuring water quality, these studies reveal where action is most needed. The data not only supports restoration projects such as mangrove planting or coral rehabilitation but also guides governments in creating policies, protected areas, and sustainable fisheries. Research and monitoring ensure that conservation is based on evidence, not guesswork, making every effort more impactful.",
    image: "https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg",
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
      "https://media.istockphoto.com/id/2032406889/photo/male-leader-talking-to-his-team-about-plans-on-a-meeting-in-the-office.jpg",
    cta: { text: "Partner With Us", href: "/contact" },
  },
];

export default function ObjectivesZigzag() {
  const mountRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let raf = null;
    let renderer, scene, camera;
    let particleGeo, particleMat, particlePoints, shapeMesh;

    (async () => {
      // dynamic import to avoid SSR issues
      const THREE = await import("three");

      if (!mounted || !mountRef.current) return;
      const mount = mountRef.current;
      const width = mount.clientWidth || 1200;
      const height = mount.clientHeight || 600;

      // renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      mount.appendChild(renderer.domElement);

      // scene + camera
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x001b2e, 0.0025);
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 60);

      // lights
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      const point = new THREE.PointLight(0xcffaff, 1.2);
      point.position.set(50, 50, 50);
      scene.add(point);

      // particles (soft floating)
      const count = 600;
      particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const speeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        speeds[i] = 0.2 + Math.random() * 0.8;
      }
      particleGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      particleGeo.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

      const sprite = new THREE.TextureLoader().load(
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="10" fill="white" opacity="0.9"/></svg>'
      );

      particleMat = new THREE.PointsMaterial({
        size: 1.5,
        map: sprite,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      particlePoints = new THREE.Points(particleGeo, particleMat);
      scene.add(particlePoints);

      // rotating shape (low-poly "coral" look)
      const icoGeo = new THREE.IcosahedronGeometry(8, 1);
      const wire = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x45e7d6),
        clearcoat: 0.2,
        metalness: 0.1,
        roughness: 0.7,
        opacity: 0.95,
        transparent: true,
      });
      shapeMesh = new THREE.Mesh(icoGeo, wire);
      shapeMesh.position.set(0, -6, 0);
      scene.add(shapeMesh);

      // resize handler
      const onResize = () => {
        if (!mount) return;
        const w = mount.clientWidth || 800;
        const h = mount.clientHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // pointer for parallax
      let mouseX = 0;
      let mouseY = 0;
      const onPointer = (e) => {
        const r = mount.getBoundingClientRect();
        mouseX = (e.clientX - r.left) / r.width - 0.5;
        mouseY = (e.clientY - r.top) / r.height - 0.5;
      };
      window.addEventListener("pointermove", onPointer);

      // animate
      let t = 0;
      const animate = () => {
        if (!mounted) return;
        t += 0.01;

        // move particles up gently and respawn below
        const pos = particleGeo.attributes.position.array;
        const sp = particleGeo.attributes.aSpeed.array;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          pos[i3 + 1] += Math.sin(t * 0.5 + i) * 0.01 + sp[i] * 0.02;
          if (pos[i3 + 1] > 120) pos[i3 + 1] = -120;
        }
        particleGeo.attributes.position.needsUpdate = true;

        // rotate shape + parallax
        shapeMesh.rotation.x =
          shapeMesh.rotation.x * 0.98 + mouseY * 0.6 * 0.02;
        shapeMesh.rotation.y += 0.007 + Math.sin(t * 0.5) * 0.002;
        shapeMesh.position.x += (mouseX * 12 - shapeMesh.position.x) * 0.03;
        shapeMesh.material.color.setHSL(
          0.5 + Math.sin(t * 0.8) * 0.05,
          0.6,
          0.55
        );

        camera.position.x += (mouseX * 8 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 6 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      // cleanup
      mount.__objCleanup = () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
      };
    })();

    return () => {
      mounted = false;
      if (raf) cancelAnimationFrame(raf);
      const mount = mountRef.current;
      try {
        if (mount && mount.__objCleanup) mount.__objCleanup();
        if (mount && mount.firstChild) mount.removeChild(mount.firstChild);
      } catch (err) {
        console.error(err);
        
      }
      try {
        if (particleGeo) particleGeo.dispose();
        if (particleMat) particleMat.dispose();
        if (renderer) renderer.dispose();
      } catch (err) {
        console.error(err);
        
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Three.js canvas container (absolute behind content) */}
      <div
        ref={mountRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e0fbfc] text-center mb-12 drop-shadow-lg">
          Our Objectives
        </h2>

        <div className="flex flex-col gap-16">
          {OBJECTIVES.map((obj, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <div
                key={obj.title}
                className={`flex flex-col md:flex-row items-center md:items-start justify-between md:gap-10 transform transition-all duration-500 ease-out
                  ${reverse ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image block */}
                <div className="md:w-1/2 w-full flex justify-start md:justify-center">
                  <div className="w-full max-w-[520px] h-[320px] rounded-2xl overflow-hidden shadow-2xl transform transition hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(2,62,138,0.18)] bg-gradient-to-br from-sky-800/40 to-emerald-800/20 border border-white/6">
                    <img
                      src={obj.image}
                      alt={obj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback: if external fails, show placeholder gradient
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {/* subtle overlay for glow */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-screen"></div>
                  </div>
                </div>

                {/* Text content */}
                <div className="md:w-1/2 w-full flex justify-start md:justify-center">
                  <div className="max-w-lg">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">
                      {obj.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-slate-200 text-justify">
                      {obj.desc}
                    </p>
                    <a
                      href={obj.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-6 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 text-black font-semibold shadow hover:scale-105 transition-transform"
                    >
                      {obj.cta.text}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
