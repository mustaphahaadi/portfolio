// import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">{"Let's Stay Connected"}</h2>
        <p className="text-gray-600 mb-6">
          {"I'm"} not currently taking on new client work but feel free to
          contact me for any other inquiries.
        </p>

        {/* Social Media Links */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8 mx-auto max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Follow Me</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="fab fa-github text-blue-600"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="fab fa-linkedin-in text-blue-600"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="fab fa-twitter text-blue-600"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="fab fa-instagram text-blue-600"></i>
            </a>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          © 2023 CODEO. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
