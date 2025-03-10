import React from "react";
import logo from "../assets/image/navbar-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto md:h-12 hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-4">
              <a
                href="#about"
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                About
              </a>
              <a
                href="#experience"
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Experience
              </a>
              <a
                href="#portfolio"
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Portfolio
              </a>
              <a
                href="#testimonials"
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-1.5 md:px-6 md:py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm md:text-base rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg">
              <i className="fas fa-download"></i>
              <span>Get my CV</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600 focus:outline-none rounded-lg hover:bg-purple-50 transition-colors duration-300"
            >
              <i
                className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
          <div className="flex flex-col space-y-2">
            <a
              href="#about"
              onClick={handleLinkClick}
              className="block text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
            >
              About
            </a>
            <a
              href="#experience"
              onClick={handleLinkClick}
              className="block text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
            >
              Experience
            </a>
            <a
              href="#portfolio"
              onClick={handleLinkClick}
              className="block text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
            >
              Portfolio
            </a>
            <a
              href="#testimonials"
              onClick={handleLinkClick}
              className="block text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="block text-gray-600 hover:text-purple-600 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-purple-50"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
