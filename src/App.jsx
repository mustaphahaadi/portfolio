import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import ToolsSection from "./components/ToolsSection";
import CertificationsSection from "./components/CertificationsSection";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "react-hot-toast";

/* ─── Main Portfolio SPA ──────────────────────────── */
const PortfolioHome = () => (
  <div className="terminal-screen">
    <div className="crt-overlay"></div>
    <Navbar />
    <HeroSection />
    <ExperienceSection />
    <PortfolioSection />
    <ToolsSection />
    <EducationSection />
    <CertificationsSection />
    <ServicesSection />
    <BlogSection />
    <TestimonialSection />
    <ContactSection />
    <Footer />
  </div>
);

/* ─── Blog shell — keeps Navbar + Footer ──────────── */
const BlogShell = ({ children }) => (
  <div className="terminal-screen">
    <div className="crt-overlay"></div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/blog" element={<BlogShell><BlogListPage /></BlogShell>} />
        <Route path="/blog/:slug" element={<BlogShell><BlogPostPage /></BlogShell>} />
      </Routes>

      <Analytics />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d1117',
            color: '#00ff41',
            border: '1px solid #1e3a1e',
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.85rem',
          },
        }}
      />
    </>
  );
};

export default App;
