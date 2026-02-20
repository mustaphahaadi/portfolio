import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "../services/api";

const defaultExperiences = [
  {
    company: "ReStart Digital / Kumasi",
    position: "Fo-Founder & CEO",
    year: "2024-Present",
    description:
      "A startup building innovative software solutions, making technical decisions, and driving innovation in software solutions",
    icon: "fas fa-users-cog",
  },
  {
    company: "Khoders World - KsTU / Campus Club",
    position: "Former President & Tutor",
    year: "2022-Present",
    description:
      "Mentoring beginner programmers, making technical decisions, and driving innovation in software solutions.",
    icon: "fas fa-laptop-code",
  },
  {
    company: "IRID, KsTU",
    position: "Reseach Associate",
    year: "May - Oct, 2025",
    description:
      "Led front-end development for multiple projects, implemented modern JavaScript frameworks, and optimized web performance.",
    icon: "fas fa-chart-line",
  },
  {
    company: "Code Masters / London",
    position: "Full Stack Developer",
    year: "2019-2020",
    description:
      "Designed and developed full-stack applications, implemented REST APIs, and managed database systems.",
    icon: "fas fa-layer-group",
  },
];

const ExperienceSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const response = await getExperiences();
      return response.data;
    }
  });

  const experiences = Array.isArray(apiData) ? apiData : (apiData?.results || defaultExperiences);

  return (
    <section
      id="experience"
      className="py-16 md:py-24 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl mb-4">
            Professional Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            My career milestones and key contributions in the tech industry
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="group relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="md:col-span-2 flex items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full">
                    <i className={`${exp.icon} text-blue-600 text-2xl`}></i>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <p className="text-blue-600 font-semibold mb-2">{exp.year}</p>
                  <p className="text-gray-700 font-medium text-sm">
                    {exp.company}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-gray-900 font-bold text-xl md:text-2xl mb-3">
                    {exp.position}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
              {index !== experiences.length - 1 && (
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
