import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./Body";
import FloatingActions from "./components/FloatingActions";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "./utils/contants";
import MarineNews from "./pages/MarineNews";

/* Lazy loaded pages */
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Opine = lazy(() => import("./pages/Opine"));
const Contact = lazy(() => import("./pages/Contact"));
const Donation = lazy(() => import("./pages/Donate"));
const Project = lazy(() => import("./pages/Project"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const MembershipAgreement = lazy(() => import("./pages/MembershipAgreement"));
const DonationPolicy = lazy(() => import("./pages/DonationPolicy"));
const Careers = lazy(() => import("./pages/Careers"));
const FellowShip = lazy(() => import("./pages/FellowShip"));
const CountriesPage = lazy(() => import("./pages/CountriesPage"));
const CountryDetail = lazy(() => import("./pages/CountryDetail"));
const MarineLife = lazy(() => import("./pages/MarineLife"));
const MarineGroupPage = lazy(() => import("./pages/MarineGroupPage"));
const SpeciesDetails = lazy(() => import("./pages/SpeciesDetails"));
const MarineQuiz = lazy(() => import("./pages/MarineQuiz"));
const OceanDive = lazy(() => import("./pages/OceanDrive"));

const socket = io("https://back.marinebiodiversityconservation.com");

export default function App() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stats/getVisitors`);
        setVisitorCount(res.data.count);
        await axios.post(`${BASE_URL}/stats/increment`);
      } catch (err) {
        console.error("Visitor count error:", err);
      }
    };

    fetchAndIncrement();

    socket.on("visitorCount", (count) => {
      setVisitorCount(count);
    });

    return () => socket.off("visitorCount");
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar visitorCount={visitorCount} />
        <FloatingActions />

        <div className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/opine" element={<Opine />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/fellowship" element={<FellowShip />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donation />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route
                path="/cancellation-refund-policy"
                element={<RefundPolicy />}
              />
              <Route
                path="/membership-agreement"
                element={<MembershipAgreement />}
              />
              <Route path="/donation-policy" element={<DonationPolicy />} />

              <Route path="/marine-life" element={<MarineLife />} />
              <Route path="/marine-life/:group" element={<MarineGroupPage />} />
              <Route
                path="/marine-life/:group/:speciesId"
                element={<SpeciesDetails />}
              />

              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/countries/:id" element={<CountryDetail />} />

              <Route path="/marine-quiz" element={<MarineQuiz />} />
              <Route path="/ocean-drive" element={<OceanDive />} />
              <Route path="/marine-news" element={<MarineNews />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
