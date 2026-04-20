import React from "react";
import { Youtube, Github,Linkedin } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="bg-[#181818] text-slate-400 border-t border-slate-800 ">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-sm">
        
        {/* Left: Brand */}
        <div className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-100">CivicEdge</span>
        </div>

        {/* Center: Developer Credit */}
        <div className="text-center">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/your-linkedin-username"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-100 hover:text-blue-400 transition-colors"
          >
            Aswin Sandeep
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex justify-center md:justify-end gap-5">
          <a
            href="https://www.youtube.com/@AswinSandeep"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-slate-400 hover:text-red-500 transition-colors"
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
          <a
            href="https://github.com/Aswin123445"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
