import { FaEye } from "react-icons/fa";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#152066] text-white py-8 px-6 md:px-12 border-t-4 border-[#1e88e5]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="flex items-center text-xl font-bold mr-0 md:mr-4 mb-2 md:mb-0">
            <FaEye className="mr-2" /> Smart Retina
          </div>
          <span className="hidden md:inline text-blue-400">|</span>
          <span className="text-sm text-blue-200 md:ml-4">
            Platform | Faculty of Computer and Information Science
          </span>
        </div>
        <div className="text-sm text-blue-300 font-light">
          &copy; 2026 Smart Retina. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;