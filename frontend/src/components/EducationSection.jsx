// import React from "react";

const educationItems = [
  {
    year: "2021 – 2025",
    institution: "Kumasi Technical University",
    description:
      "Bachelor's degree in Computer Technology with a focus on software engineering and web development.",
    location: "Kumasi, Ghana",
  },
  {
    year: "2017 – 2020",
    institution: "Ghanaian-German Snr High",
    description:
      "A pure eneral pure science with biology, chemistry, physics and elective maths.",
    location: "Tepa, Ghana",
  },
  {
    year: "- – 2017",
    institution: "Tuffour Red Sox Int.",
    description:
      "Nusery & Basic Education",
    location: "Bawku, Ghana",
  },
];

const EducationSection = () => {
  return (
    <section
      id="education"
      className="py-20 bg-gradient-to-b from-yellow-50 to-white"
    >
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-semibold text-gray-800 text-3xl md:text-4xl mb-3">
            Education
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My academic journey and professional certifications that shaped my
            expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {item.year}
                </span>
                <span className="text-sm text-gray-500">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {item.location}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-3">
                {item.institution}
              </h3>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <div className="border-t pt-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  View Certificate
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
