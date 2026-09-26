"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import {
  Calendar,
  Bookmark,
  Check,
  ArrowLeft,
  Star,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

export const WorkoutDetailClient: React.FC<{ workout: Workout }> = ({ workout }) => {
  const { addToPlan, removeFromPlan, isInPlan, addToSaved, removeFromSaved, isSaved, plan } =
    useFitLog();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const isCapped = plan.length >= 5;

  const handlePlanAction = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      const result = addToPlan(workout);
      if (result.success) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#ccff00", "#ffffff", "#888888"],
          });
        } catch {
          // Ignore if confetti fails
        }
      }
    }
  };

  const handleSavedAction = () => {
    if (saved) {
      removeFromSaved(workout.id);
    } else {
      addToSaved(workout);
    }
  };

  return (
    <div>
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-[#ccff00] transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Workouts</span>
      </Link>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Side: Large Visual/Media */}
        <div className="lg:col-span-6 w-full">
          <div className="relative aspect-square sm:aspect-[4/4] lg:aspect-[4/4.5] w-full rounded-3xl overflow-hidden bg-[#15171d] border border-[#232733] shadow-2xl">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1e28] to-[#15171d] animate-pulse" />
            )}

            <Image
              src="/workout-figma.png"
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover object-center transition-all duration-500 ${
                imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />

            {/* In Plan Badge Over Image */}
            {inPlan && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ccff00] text-black text-xs font-extrabold uppercase shadow-lg">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                In Today&apos;s Plan
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05] mb-4">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
            {workout.description}
          </p>

          {/* Muscle Group Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups?.map((group) => (
              <span
                key={group}
                className="px-3.5 py-1 rounded-full bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table Panel */}
          <div className="rounded-2xl bg-[#15171d] border border-[#232733] divide-y divide-[#232733] overflow-hidden mb-8">
            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                EQUIPMENT
              </span>
              <span className="text-sm font-semibold text-white">{workout.equipment}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                DIFFICULTY
              </span>
              <span className="text-sm font-semibold text-white">{workout.difficulty}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                SETS
              </span>
              <span className="text-sm font-semibold text-white">{workout.sets}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                REPS
              </span>
              <span className="text-sm font-semibold text-white">{workout.reps}</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                DURATION
              </span>
              <span className="text-sm font-semibold text-white">{workout.duration} min</span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                CALORIES
              </span>
              <span className="text-sm font-semibold text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                RATING
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{workout.rating}</span>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mb-10">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white mb-4">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-3.5">
              {workout.instructions?.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3.5 text-sm sm:text-base text-gray-300">
                  <span className="flex-shrink-0 font-bold text-gray-400 select-none">
                    {index + 1}.
                  </span>
                  <span className="leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Primary Button: Add to today's plan */}
            <button
              onClick={handlePlanAction}
              disabled={!inPlan && isCapped}
              className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 ${
                inPlan
                  ? "bg-[#182613] border border-[#ccff00] text-[#ccff00] hover:bg-red-950/30 hover:border-red-500 hover:text-red-400 group"
                  : isCapped
                  ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
                  : "bg-[#ccff00] hover:bg-[#d8ff33] text-black shadow-lg shadow-[#ccff00]/20 hover:scale-[1.01]"
              }`}
            >
              {inPlan ? (
                <>
                  <CheckCircle2 className="w-4 h-4 group-hover:hidden" />
                  <span className="group-hover:hidden">Added to Today&apos;s Plan</span>
                  <span className="hidden group-hover:inline">Remove from Plan</span>
                </>
              ) : isCapped ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Plan Full (5/5 Lifts)</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            {/* Secondary Button: Save for later */}
            <button
              onClick={handleSavedAction}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                saved
                  ? "bg-[#1f2636] border border-blue-400 text-blue-300 hover:bg-red-950/30 hover:border-red-500 hover:text-red-400 group"
                  : "bg-[#15171d] hover:bg-[#1c202a] border border-[#2e3444] text-white hover:border-gray-500"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
              {saved ? (
                <>
                  <span className="group-hover:hidden">Saved</span>
                  <span className="hidden group-hover:inline">Remove Saved</span>
                </>
              ) : (
                <span>Save for later</span>
              )}
            </button>
          </div>

          {/* Cap notice if reached */}
          {isCapped && !inPlan && (
            <p className="text-xs text-amber-400/90 mt-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                Today&apos;s plan is limited to 5 lifts. Head to{" "}
                <Link href="/my-plan" className="underline hover:text-white">
                  My Plan
                </Link>{" "}
                to finish or clear a lift.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
