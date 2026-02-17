import React from "react";
import { Youtube, Linkedin } from "lucide-react";

const SolverFooter = () => {
  return (
    <footer className="bg-blue-700 text-blue-200 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-sm">
        
        {/* Left: Brand */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-50">CivicEdge</span>
        </div>

        {/* Center: Developer Credit */}
        <div className="text-center">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/your-linkedin-username"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-semibold text-blue-50
              hover:text-white
              transition-colors
            "
          >
            Aswin Sandeep
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex justify-center md:justify-end gap-5">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="
              text-blue-300
              hover:text-white
              transition-colors
            "
          >
            <Youtube className="w-5 h-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/your-linkedin-username"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              text-blue-300
              hover:text-white
              transition-colors
            "
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SolverFooter;
