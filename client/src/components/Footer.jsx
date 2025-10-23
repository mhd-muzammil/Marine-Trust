import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#023047] text-[#90e0ef] py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div>
          © {new Date().getFullYear()} Marine Biodiversity Trust — All rights
          reserved
        </div>
        <div className="flex gap-3">
          <a href="#" aria-label="twitter">
            🐦
          </a>
          <a href="#" aria-label="youtube">
            ▶️
          </a>
          <a href="#" aria-label="facebook">
            f
          </a>
        </div>
      </div>
    </footer>
  );
}
