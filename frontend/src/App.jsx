// import React from "react";
import "./assets/image/brand-1.png";
import "./assets/image/navbar-logo.png";
import "./assets/image/brand-3.png";
import "./assets/css/tailwind.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import ToolsSection from "./components/ToolsSection";
import TestimonialSection from "./components/TestimonialSection";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";

const App = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <EducationSection />
      <ExperienceSection />
      <ToolsSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;
