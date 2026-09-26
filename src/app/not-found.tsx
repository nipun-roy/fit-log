import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#15171d] border border-[#232733] flex items-center justify-center mb-6 shadow-2xl">
        <Dumbbell className="w-10 h-10 text-[#ccff00] -rotate-45" />
      </div>

      <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase mb-3">
        ERROR 404
      </span>

      <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white mb-4">
        LOST YOUR FORM?
      </h1>

      <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        The lift or page you were aiming for has been reracked or doesn&apos;t exist. Let&apos;s get
        you back to the library.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-200 shadow-lg shadow-[#ccff00]/20 hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Return to Workouts</span>
      </Link>
    </div>
  );
}
