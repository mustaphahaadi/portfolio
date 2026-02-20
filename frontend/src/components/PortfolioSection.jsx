import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/api";

const PortfolioSection = () => {
  const Projects = [
    {
      id: 1,
      number: "01",
      title: "Blockchain-Based Medical Records Sytem (EmersBlock)",
      description: "A blockchain-based system for secure and efficient medical record management.This is my final year project at KsTU. I'm currently working on it.",
      icon: "fas fa-hospital"
    },
    {
      id: 2,
      number: "02",
      title: "School Management System",
      description: "A comprehensive platform for managing school operations, including student enrollment, attendance, and grading. It is for basic school management.",
      icon: "fas fa-briefcase"
    },
    {
      id: 3,
      number: "03",
      title: "Saas Cybersecurity Platform(CyberRest)",
      description: "A SaaS platform for cybersecurity solutions, including threat detection, vulnerability assessment, and incident response. A fun project I did with a friend as my learning project in cybersecurity.",
      icon: "fas fa-tasks"
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const { data: apiProjects, isLoading: loading, error: queryError, refetch: fetchProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await getProjects();
      return response.data;
    }
  });

  const projects = Array.isArray(apiProjects) ? apiProjects : (apiProjects?.results || Projects);
  const error = queryError ? queryError.message : null;

  const handleViewProject = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Rest of the component remains the same
  if (loading) {
    return (
      <section id="portfolio" className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-medium text-gray-700 text-2xl md:text-3xl mb-3">Portfolio</h1>
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-medium text-gray-700 text-2xl md:text-3xl mb-3">Portfolio</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            <p>{error}</p>
            <button
              onClick={fetchProjects}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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

        {projects.length === 0 ? (
          <div className="text-center text-gray-500">
            No projects available. Add some projects through the admin panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-60 bg-blue-50 flex items-center justify-center">
                  <i className={`${project.icon || 'fas fa-code'} text-6xl text-blue-600`}></i>
                  <div className="absolute top-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-700">
                    {project.number}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-semibold text-gray-800 text-xl mb-3">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <button
                    onClick={() => handleViewProject(project)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6 bg-blue-50 p-8 rounded-lg flex justify-center">
                <i className={`${selectedProject.icon || 'fas fa-code'} text-8xl text-blue-600`}></i>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors mr-2"
                >
                  Close
                </button>
                <a
                  href="https://github.com/mustaphahaadi/"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
