// import React from "react";
import homeImg from "../assets/image/prof-pic.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-50 to-purple-50"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex justify-center mb-6 md:mb-12">
          <img
            src={homeImg}
            alt="CODEO"
            className="rounded-full w-28 h-28 md:w-40 md:h-40 border-4 border-white shadow-lg"
          />
        </div>
        <h6 className="font-medium text-gray-700 text-base md:text-2xl uppercase mb-4 md:mb-8">
          CODEO
        </h6>
        <h1 className="font-bold text-gray-900 text-4xl md:text-7xl leading-none mb-8">
          Full Stack Developer
        </h1>
        <p className="font-normal text-gray-600 text-md md:text-xl mb-16">
          I have a passion for software. I enjoy creating tools that make life
          easier for people.
        </p>
        <a
          href="#"
          className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition ease-linear duration-500"
        >
          Hire me
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
