import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-sm">
        {/* Left: Brand */}
        <div className="text-center md:text-left text-blue-200">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">CivicEdge</span>
        </div>

        {/* Center: Developer Credit */}
        <div className="text-center text-blue-100">
          Developed by{" "}
          <span className="font-semibold text-white">Aswin Sandeep</span>
        </div>

        {/* Right: Social Links */}
        <div className="flex justify-center md:justify-end gap-6 text-blue-200">
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="YouTube"
          >
            YouTube
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
