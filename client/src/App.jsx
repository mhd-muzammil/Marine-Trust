import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './Body';
import FloatingActions from './components/FloatingActions';
import io from 'socket.io-client';
import axios from 'axios';
import { BASE_URL } from './utils/contants';
<<<<<<< HEAD

// Lazy load all the page components
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Opine = lazy(() => import('./pages/Opine'));
const Contact = lazy(() => import('./pages/Contact'));
const Donation = lazy(() => import('./pages/Donate'));
const Project = lazy(() => import('./pages/Project'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const MembershipAgreement = lazy(() => import('./pages/MembershipAgreement'));
const DonationPolicy = lazy(() => import('./pages/DonationPolicy'));
const Careers = lazy(() => import('./pages/Careers'));
const FellowShip = lazy(() => import('./pages/FellowShip'));
const CountriesPage = lazy(() => import('./pages/CountriesPage'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const MarineLife = lazy(() => import('./pages/MarineLife'));
const MarineGroupPage = lazy(() => import('./pages/MarineGroupPage'));
const SpeciesDetails = lazy(() => import('./pages/SpeciesDetails'));
=======
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import MembershipAgreement from './pages/MembershipAgreement';
import DonationPolicy from './pages/DonationPolicy';
import Careers from './pages/Careers';
import FellowShip from './pages/FellowShip';
import FloatingActions from './components/FloatingActions';
import CountriesPage from './pages/CountriesPage';
import CountryDetail from './pages/CountryDetail';
import MarineLife from './pages/MarineLife';
import MarineGroupPage from './pages/MarineGroupPage';
import SpeciesDetails from './pages/SpeciesDetails';
import MarineQuiz from './pages/MarineQuiz';
// import OceanDepthExperience from './pages/OceanDepthExperience';
import OceanDive from './pages/OceanDrive';
>>>>>>> d87fdce43e12918fc251c26363881ce2516f575f

const socket = io('http://localhost:5173');

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

    // Cleanup socket connection on component unmount
    return () => {
      socket.off('visitorCount');
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar visitorCount={visitorCount} />
        <FloatingActions />
        <div className="flex-1">
<<<<<<< HEAD
          <Suspense fallback={<div className="flex justify-center items-center h-full">Loading...</div>}>
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
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/cancellation-refund-policy" element={<RefundPolicy />} />
              <Route path="/membership-agreement" element={<MembershipAgreement />} />
              <Route path="/donation-policy" element={<DonationPolicy />} />
              <Route path="/marine-life" element={<MarineLife />} />
              <Route path="/marine-life/:group" element={<MarineGroupPage />} />
              <Route path="/marine-life/:group/:speciesId" element={<SpeciesDetails />} />
              <Route path="/countries" element={<CountriesPage />} />
              <Route path="/countries/:id" element={<CountryDetail />} />
            </Routes>
          </Suspense>
=======
          <Routes>
            {/* <Route path="/" element={<Body />} /> */}
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
            {/* <Route path="/ocean-depth" element={<OceanDepthExperience />} /> */}
            <Route path="/ocean-drive" element={<OceanDive />} />

          </Routes>
>>>>>>> d87fdce43e12918fc251c26363881ce2516f575f
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}