"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star, Check, Bookmark } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export const WorkoutCard: React.FC<{ workout: Workout }> = ({ workout }) => {
  const { isInPlan, isSaved } = useFitLog();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col rounded-2xl bg-[#15171d] border border-[#232733] hover:border-[#ccff00]/60 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-[#ccff00]/5 hover:-translate-y-1"
    >
      {/* Card Image Container */}
      <div className="relative aspect-[16/10] w-full bg-[#1c202a] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c202a] via-[#252b39] to-[#1c202a] animate-pulse" />
        )}

        <Image
          src="/workout-card-figma.png"
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />

        {/* Status Indicators in top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {inPlan && (
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ccff00] text-black text-[10px] font-extrabold uppercase shadow-sm"
              title="In today's plan"
            >
              <Check className="w-3 h-3 stroke-[3]" />
              Plan
            </span>
          )}
          {saved && (
            <span
              className="flex items-center justify-center p-1 rounded-full bg-[#15171d]/90 border border-gray-600 text-[#ccff00] shadow-sm"
              title="Saved for later"
            >
              <Bookmark className="w-3 h-3 fill-current" />
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Muscle Group Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {workout.muscleGroups?.map((group) => (
              <span
                key={group}
                className="px-2.5 py-0.5 rounded-full bg-[#ccff00] text-black font-extrabold text-[10px] uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-display font-extrabold text-xl uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors leading-tight mb-1">
            {workout.name}
          </h3>

          {/* Equipment / Subtitle */}
          <p className="text-xs sm:text-sm text-gray-400 font-medium">
            {workout.equipment}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mt-5 pt-4 border-t border-[#232733] flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-gray-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-gray-300">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
