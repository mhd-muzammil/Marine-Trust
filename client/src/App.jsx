import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './Body';
import About from './pages/About';
import Blog from './pages/Blog';
// import BlogP1 from "./pages/Blog-p1"
import Contact from './pages/Contact';
import Donation from './pages/Donate';
import Project from './pages/Project';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { BASE_URL } from './utils/contants';

const socket = io('http://localhost:5000');

export default function App() {
  const [visitorCount, setVisitorCount] = useState(null);
  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const response = await axios.get(BASE_URL + '/stats/getVisitors');

        setVisitorCount(response.data.count);

        await axios.post(BASE_URL + '/stats/increment');
      } catch (err) {
        console.error('Error during initial data fetch/increment:', err);
      }
    };

    fetchAndIncrement();

    socket.on('visitorCount', (count) => {
      setVisitorCount(count);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar visitorCount={visitorCount} />
        <div className="flex-1">
          <Routes>
            {/* <Route path="/" element={<Body />} /> */}
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
