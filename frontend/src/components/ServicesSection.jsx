// import React from "react";

const services = [
  {
    icon: "fas fa-chart-line",
    title: "High experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "fas fa-cubes",
    title: "Useful sandboxes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "fas fa-coffee",
    title: "Success side projects",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <h1 className="font-bold text-gray-800 text-2xl md:text-3xl mb-8 text-center">
          My Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white px-6 py-8 md:px-8 md:py-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 md:w-20 py-4 md:py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <i className={`${service.icon} text-blue-600 text-2xl`}></i>
              </div>
              <h4 className="font-medium text-gray-700 text-lg mb-4">
                {service.title}
              </h4>
              <p className="font-normal text-gray-500 text-md">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
//
