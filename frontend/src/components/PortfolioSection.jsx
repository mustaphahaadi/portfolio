// import React from "react";

const projects = [
  {
    number: "01",
    title: "Demo API Generator",
    description:
      "A dummy data free and documented API generator to facilitate the process of testing the front-end portion of projects.",
    icon: "fas fa-code",
  },
  {
    number: "02",
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce solution with payment integration and admin dashboard.",
    icon: "fas fa-shopping-cart",
  },
  {
    number: "03",
    title: "Task Management App",
    description:
      "A collaborative task management tool with real-time updates and team features.",
    icon: "fas fa-tasks",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="font-medium text-gray-700 text-2xl md:text-3xl mb-3">
            Portfolio
          </h1>
          <p className="font-normal text-gray-500 text-sm md:text-base">
            Showcasing my best and most impactful work
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-60 bg-blue-50 flex items-center justify-center">
                <i className={`${project.icon} text-6xl text-blue-600`}></i>
                <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-700">
                  {project.number}
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-semibold text-gray-800 text-xl mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
