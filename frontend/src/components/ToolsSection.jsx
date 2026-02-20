import { useQuery } from "@tanstack/react-query";
import { getTools } from "../services/api";

const defaultTools = [
  { name: "Python", icon: "fab fa-python" },
  { name: "JavaScript", icon: "fab fa-js" },
  { name: "React", icon: "fab fa-react" },
  { name: "Git", icon: "fab fa-git-alt" },
  { name: "Linux", icon: "fab fa-linux" },
  { name: "Node.js", icon: "fab fa-node" },
  { name: "HTML5", icon: "fab fa-html5" },
  { name: "CSS3", icon: "fab fa-css3-alt" },
  { name: "Docker", icon: "fab fa-docker" },
  { name: "AWS", icon: "fab fa-aws" },
  { name: "Sass", icon: "fab fa-sass" },
  { name: "NPM", icon: "fab fa-npm" },
];

const ToolsSection = () => {
  const { data: apiData } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await getTools();
      return response.data;
    }
  });

  const toolsArray = Array.isArray(apiData) ? apiData : apiData?.results;
  const tools = toolsArray?.length > 0 ? toolsArray : defaultTools;

  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-teal-50 to-white">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="font-bold text-gray-800 text-3xl md:text-4xl mb-3">
            Tools & Technologies
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My expertise spans across these essential tools and programming
            languages. Some of them I am still learning, but I am passionate about mastering them to enhance my development skills.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <i className={`${tool.icon} text-4xl text-gray-700 mb-3`}></i>
              <span className="text-sm font-medium text-gray-600">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
