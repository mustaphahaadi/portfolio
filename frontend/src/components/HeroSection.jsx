import { useState, useEffect } from "react";
import homeImg from "../assets/image/prof-pic.jpg";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const roles = ["Fouder & CEO", "Full Stack Developer", "Problem Solver", "Tech Enthusiast"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    let currentRole = roles[roleIndex];
    
    const typeText = () => {
      if (currentIndex <= currentRole.length) {
        setTypedText(currentRole.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          currentIndex = 0;
        }, 2000);
      }
    };

    typeText();
  }, [roleIndex]);

  const handleClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-6 md:mb-12">
          <div className="relative">
            <img
              src={homeImg}
              alt="CODEO"
              className="rounded-full w-28 h-28 md:w-40 md:h-40 border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white"></div>
          </div>
        </div>
        
        <h6 className="font-medium text-gray-700 text-base md:text-2xl uppercase mb-4 md:mb-8 tracking-wider">
          MUSTAPHA HAADI BUGNABA
        </h6>
        
        <h1 className="font-bold text-gray-900 text-4xl md:text-7xl leading-none mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">
            {typedText}
          </span>
          <span className="animate-blink">|</span>
        </h1>

        <p className="font-normal text-gray-600 text-md md:text-xl mb-8 max-w-2xl mx-auto">
          I have a passion for software. I enjoy creating tools that make life
          easier for people.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            onClick={handleClick}
            className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition ease-linear duration-500 flex items-center justify-center"
          >
            <span>Hire me</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
          <a
            href="#portfolio"
            className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold border-2 border-gray-800 text-gray-800 text-sm rounded-md hover:bg-gray-800 hover:text-white transition ease-linear duration-500 flex items-center justify-center"
          >
            <span>View Work</span>
            <i className="fas fa-briefcase ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
