"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FitLogLogo } from "./FitLogLogo";
import { useFitLog } from "@/context/FitLogContext";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const planCount = isLoaded ? plan.length : 0;
  const savedCount = isLoaded ? saved.length : 0;

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#1f222b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <FitLogLogo />
        </div>

        {/* Center: Navigation Links (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              isWorkoutsActive
                ? "bg-[#182613] text-[#ccff00] shadow-sm shadow-[#ccff00]/10"
                : "text-gray-400 hover:text-white hover:bg-[#15171d]"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              isMyPlanActive
                ? "bg-[#182613] text-[#ccff00] shadow-sm shadow-[#ccff00]/10"
                : "text-gray-400 hover:text-white hover:bg-[#15171d]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges (Counters) */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Plan badge = filled pill with accent background */}
          <Link
            href="/my-plan?tab=today"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            title="View Today's Plan"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center shadow-sm shadow-[#ccff00]/30 transition-transform group-hover:scale-110">
              {planCount}
            </span>
          </Link>

          {/* Saved badge = pill with outline/border only */}
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
            title="View Saved Workouts"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full border border-[#3b4152] bg-[#15171d] text-gray-300 font-semibold text-xs flex items-center justify-center transition-transform group-hover:border-gray-400">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-3">
          <Link
            href="/my-plan?tab=today"
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black flex items-center justify-center text-[11px] font-bold">
              {planCount}
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#ccff00]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-[#12141a] border-b border-[#232733] space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                isWorkoutsActive
                  ? "bg-[#182613] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#1a1d26]"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium ${
                isMyPlanActive
                  ? "bg-[#182613] text-[#ccff00]"
                  : "text-gray-300 hover:bg-[#1a1d26]"
              }`}
            >
              My Plan
            </Link>
          </div>

          <div className="pt-3 border-t border-[#232733] flex items-center justify-around">
            <Link
              href="/my-plan?tab=today"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span>Today&apos;s Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center">
                {planCount}
              </span>
            </Link>
            <Link
              href="/my-plan?tab=saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-gray-300"
            >
              <span>Saved Workouts</span>
              <span className="w-5 h-5 rounded-full border border-[#3b4152] bg-[#15171d] text-gray-300 text-xs flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
