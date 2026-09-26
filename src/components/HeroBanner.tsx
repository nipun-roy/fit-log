import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full my-6 sm:my-8">
      <div className="relative overflow-hidden rounded-2xl bg-[#15171d] border border-[#232733] p-6 sm:p-10 lg:p-14">
        {/* Subtle radial glow background behind figure */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Copy & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[#ccff00] text-xs font-bold tracking-[0.2em] uppercase mb-4 inline-block">
              WORKOUT LIBRARY
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08] mb-5">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
              plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md shadow-[#ccff00]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Right Column: Hero Figure Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              <Image
                src="/hero-figure.png"
                alt="FitLog Muscular Figure on Preacher Curl Bench"
                width={380}
                height={380}
                priority
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] max-h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
