import React from "react";
import { FitLogLogo } from "./FitLogLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c0d10] border-t border-[#1f222b] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand logo */}
        <div className="flex items-center">
          <FitLogLogo linkToHome={true} />
        </div>

        {/* Right: Copyright line */}
        <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-right tracking-wide">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
