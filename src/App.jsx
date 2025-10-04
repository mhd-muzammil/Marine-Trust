import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./Body";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Donation from "./pages/Donate";
import Project from "./pages/Project";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Project/>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
