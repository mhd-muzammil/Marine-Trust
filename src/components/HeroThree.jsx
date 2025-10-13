import React, { useRef, useEffect } from "react";
import * as THREE from "three";

// HeroThree.jsx
// React component for Vite + React + Tailwind projects
// - Big eye-catching heading
// - 3D animated background using three.js (particles + soft coral cluster)
// - Overlayed CTA buttons and a short intro + Objectives button

export default function HeroThree() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x001b2e, 0.015);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    // Lights
    const hemi = new THREE.HemisphereLight(0x88ccee, 0x002244, 0.9);
    scene.add(hemi);
    const point = new THREE.PointLight(0xaaffff, 1.2);
    point.position.set(40, 40, 40);
    scene.add(point);

    // Particles
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 160; // x
      positions[i3 + 1] = (Math.random() - 0.2) * 80;  // y
      positions[i3 + 2] = (Math.random() - 0.5) * 160; // z
      speeds[i] = 0.003 + Math.random() * 0.02;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    const sprite = new THREE.TextureLoader().load(
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="10" fill="white"/></svg>'
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.6,
      map: sprite,
      transparent: true,
      depthWrite: false,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Coral cluster (soft blobs)
    const coralGroup = new THREE.Group();
    for (let i = 0; i < 18; i++) {
      const geo = new THREE.SphereGeometry(0.9 + Math.random() * 1.6, 16, 12);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.55 - Math.random() * 0.12, 0.6, 0.5),
        roughness: 0.65,
        metalness: 0.03,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 6, (Math.random() - 1.1) * 6 - 6, (Math.random() - 0.5) * 6);
      mesh.scale.setScalar(0.8 + Math.random() * 1.6);
      coralGroup.add(mesh);
    }
    coralGroup.position.set(-8, -6, 0);
    scene.add(coralGroup);

    // Floating seagrass made of thin planes
    const grassGroup = new THREE.Group();
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x1a8b7a,
      side: THREE.DoubleSide,
      roughness: 0.9,
      metalness: 0.0,
    });
    for (let i = 0; i < 14; i++) {
      const g = new THREE.PlaneGeometry(0.3, 6, 4, 1);
      const gm = new THREE.Mesh(g, grassMat);
      gm.position.set((Math.random() - 0.5) * 22, -10 - Math.random() * 2, (Math.random() - 0.5) * 8);
      gm.rotation.z = (Math.random() - 0.5) * 0.6;
      grassGroup.add(gm);
    }
    scene.add(grassGroup);

    // Animation state
    let t = 0;

    // Resize handler
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    // Animation loop
    const animate = () => {
      t += 0.01;

      // update particles positions slightly to simulate flow
      const pos = particleGeometry.attributes.position.array;
      const sp = particleGeometry.attributes.aSpeed.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += Math.sin(t * 0.5 + i) * 0.0005 + sp[i] * 0.08; // gentle upward thrust
        if (pos[i3 + 1] > 50) pos[i3 + 1] = -50;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // sway coral and grass
      coralGroup.rotation.y = Math.sin(t * 0.3) * 0.08 + mouseX * 0.4;
      coralGroup.rotation.x = Math.sin(t * 0.2) * 0.03 + mouseY * 0.2;
      grassGroup.children.forEach((g, idx) => {
        g.rotation.z = Math.sin(t * 0.8 + idx) * 0.12 + mouseX * 0.2;
      });

      // gentle camera parallax
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, -2, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    let raf = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // HTML overlay
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[85vh] bg-gradient-to-b from-[#001628] via-[#002b45] to-[#001b2e] overflow-hidden text-white">
      {/* three.js mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
            Marine Biodiversity
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-200">Conservation</span>
          </h1>

          <p className="mt-6 text-sm md:text-base text-slate-200 max-w-xl">
            Protecting species, habitats and ecosystems through research, sustainable management,
            and community action. Explore our objectives, ongoing activities, and how you can help.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#objectives" className="inline-flex items-center px-5 py-3 rounded-2xl bg-emerald-400/20 border border-emerald-300 text-emerald-100 backdrop-blur-sm hover:scale-[1.02] transition">
              View Objectives
            </a>

            <button className="inline-flex items-center px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg transition transform hover:-translate-y-0.5">
              Get Involved
            </button>
          </div>

          {/* small cards showing quick stats */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-semibold">120+</div>
              <div className="text-xs text-slate-300">Species Monitored</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-semibold">15</div>
              <div className="text-xs text-slate-300">Ongoing Projects</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-semibold">8</div>
              <div className="text-xs text-slate-300">Community Partners</div>
            </div>
          </div>
        </div>

        {/* right column: translucent info panel */}
        <aside className="w-full md:w-96 p-6 bg-gradient-to-b from-white/3 to-white/2 rounded-2xl border border-white/6 backdrop-blur-md">
          <h3 className="text-lg font-semibold">Quick Activities</h3>
          <ul className="mt-4 text-sm text-slate-200 space-y-2">
            <li>• Research & monitoring of marine biodiversity</li>
            <li>• Conservation & habitat restoration plans</li>
            <li>• Sustainable fisheries & aquaculture support</li>
            <li>• Education programs and community workshops</li>
          </ul>

          <div className="mt-6">
            <a href="#activities" className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-medium shadow">
              See All Activities
            </a>
          </div>
        </aside>
      </div>

      {/* anchor targets for smooth scroll */}
      <div id="objectives" />
      <div id="activities" />
    </section>
  );
}
