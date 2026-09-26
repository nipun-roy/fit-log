"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import { Workout, PlanItem, SavedItem } from "@/types/workout";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Calendar,
} from "lucide-react";
import confetti from "canvas-confetti";

type SortOption = "duration" | "calories" | "rating";

export const MyPlanClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    toggleCompletePlan,
    removeFromSaved,
    addToPlan,
    isInPlan,
    totalPlanExercises,
    totalPlanMinutes,
    totalPlanCalories,
  } = useFitLog();

  // Tab state: "today" vs "saved"
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [tabParam]);

  const handleTabChange = (tab: "today" | "saved") => {
    setActiveTab(tab);
    router.replace(`/my-plan?tab=${tab}`, { scroll: false });
  };

  // Sort State
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Sorting logic
  const sortedPlan = useMemo(() => {
    const list = [...plan];
    if (sortBy === "duration") {
      return list.sort((a, b) => b.duration - a.duration);
    }
    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [plan, sortBy]);

  const sortedSaved = useMemo(() => {
    const list = [...saved];
    if (sortBy === "duration") {
      return list.sort((a, b) => b.duration - a.duration);
    }
    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [saved, sortBy]);

  // Current active list (sorted by selected option)
  const currentList = activeTab === "today" ? sortedPlan : sortedSaved;

  const handleMarkAsDone = (id: number) => {
    toggleCompletePlan(id);
    const item = plan.find((p) => p.id === id);
    if (item && !item.isCompleted) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#ccff00", "#ffffff", "#888888"],
        });
      } catch {
        // Ignore if confetti fails
      }
    }
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case "duration":
        return "Duration";
      case "calories":
        return "Calories";
      case "rating":
        return "Rating";
      default:
        return "Duration";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Subtitle */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mb-2">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 stat cards in a single panel) */}
      <div className="rounded-2xl bg-[#15171d] border border-[#232733] p-6 sm:p-8 mb-10 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#232733] gap-6 sm:gap-0">
          {/* Exercises Metric */}
          <div className="sm:px-6 first:sm:pl-0 flex flex-col">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
              Exercises
            </span>
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#ccff00] leading-none">
              {!isLoaded ? "0" : totalPlanExercises}
            </span>
          </div>

          {/* Minutes Metric */}
          <div className="pt-6 sm:pt-0 sm:px-8 flex flex-col">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
              Minutes
            </span>
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
              {!isLoaded ? "0" : totalPlanMinutes}
            </span>
          </div>

          {/* Calories Metric */}
          <div className="pt-6 sm:pt-0 sm:px-8 flex flex-col">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-2">
              Calories
            </span>
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none">
              {!isLoaded ? "0" : totalPlanCalories}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs and Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Tab switch pills */}
        <div className="inline-flex p-1 rounded-xl bg-[#15171d] border border-[#232733] w-full sm:w-auto">
          <button
            onClick={() => handleTabChange("today")}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "today"
                ? "bg-[#1f2430] text-white shadow-md border border-[#30384b]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({isLoaded ? plan.length : 0})
          </button>
          <button
            onClick={() => handleTabChange("saved")}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-[#1f2430] text-white shadow-md border border-[#30384b]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved ({isLoaded ? saved.length : 0})
          </button>
        </div>

        {/* Right side: Sort By dropdown matching Figma */}
        <div className="relative flex items-center justify-end gap-2">
          <span className="text-xs sm:text-sm text-gray-400">Sort By</span>
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15171d] border border-[#232733] hover:border-gray-500 text-xs sm:text-sm font-medium text-white transition-colors"
            >
              <span>{getSortLabel(sortBy)}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  sortDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-[#181a22] border border-[#2a2f3e] shadow-2xl py-1.5 z-30">
                <button
                  onClick={() => {
                    setSortBy("duration");
                    setSortDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                    sortBy === "duration"
                      ? "text-[#ccff00] font-bold bg-[#212635]"
                      : "text-gray-300 hover:bg-[#212635] hover:text-white"
                  }`}
                >
                  <span>Duration</span>
                  {sortBy === "duration" && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setSortBy("calories");
                    setSortDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                    sortBy === "calories"
                      ? "text-[#ccff00] font-bold bg-[#212635]"
                      : "text-gray-300 hover:bg-[#212635] hover:text-white"
                  }`}
                >
                  <span>Calories</span>
                  {sortBy === "calories" && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setSortBy("rating");
                    setSortDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors flex items-center justify-between ${
                    sortBy === "rating"
                      ? "text-[#ccff00] font-bold bg-[#212635]"
                      : "text-gray-300 hover:bg-[#212635] hover:text-white"
                  }`}
                >
                  <span>Rating</span>
                  {sortBy === "rating" && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {!isLoaded ? (
        <div className="rounded-2xl border border-[#232733] bg-[#15171d]/60 p-12 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading workouts…</p>
        </div>
      ) : currentList.length === 0 ? (
        /* Empty State */
        <div className="rounded-2xl border-2 border-dashed border-[#232733] bg-[#15171d]/30 py-20 px-6 text-center flex flex-col items-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white mb-3">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mb-8">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "You haven't saved any lifts for later yet. Explore the library and bookmark exercises."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all shadow-md shadow-[#ccff00]/20 hover:scale-105"
          >
            <span>Go to workouts</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      ) : (
        /* List of Workout Cards */
        <div className="flex flex-col gap-4">
          {currentList.map((item) => {
            const isCompleted = "isCompleted" in item ? (item as PlanItem).isCompleted : false;
            const alreadyInToday = isInPlan(item.id);

            return (
              <div
                key={item.id}
                className={`group flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#15171d] border transition-all duration-200 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-950/10 opacity-80"
                    : "border-[#232733] hover:border-gray-600"
                }`}
              >
                {/* Left: Thumbnail & Metadata */}
                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden bg-[#1c202b] shrink-0 border border-[#232733]">
                    <Image
                      src="/workout-card-figma.png"
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Check className="w-6 h-6 text-[#ccff00] stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Title & Equipment & Stats */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide truncate ${
                          isCompleted ? "line-through text-gray-400" : "text-white"
                        }`}
                      >
                        {item.name}
                      </h3>
                      {isCompleted && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                          Completed
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 font-medium mb-3 truncate">
                      {item.equipment}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-gray-500" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-gray-300">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-[#232733] shrink-0">
                  {/* View Details */}
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2.5 rounded-full bg-transparent hover:bg-[#202533] border border-[#2e3444] text-gray-200 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    View Details
                  </Link>

                  {/* If in Today's Plan: Mark as Done */}
                  {activeTab === "today" && (
                    <button
                      onClick={() => handleMarkAsDone(item.id)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 ${
                        isCompleted
                          ? "bg-[#182613] border border-[#ccff00] text-[#ccff00] hover:bg-emerald-900/40"
                          : "bg-[#ccff00] hover:bg-[#d8ff33] text-black shadow-sm shadow-[#ccff00]/20"
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>{isCompleted ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  {/* If in Saved Tab: Move to Today's Plan */}
                  {activeTab === "saved" && (
                    <button
                      onClick={() => addToPlan(item)}
                      disabled={alreadyInToday}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all ${
                        alreadyInToday
                          ? "bg-[#182613] text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                          : "bg-[#ccff00] hover:bg-[#d8ff33] text-black"
                      }`}
                    >
                      {alreadyInToday ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Plan</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Remove Button (X) */}
                  <button
                    onClick={() => {
                      if (activeTab === "today") {
                        removeFromPlan(item.id);
                      } else {
                        removeFromSaved(item.id);
                      }
                    }}
                    className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                    title={`Remove from ${activeTab === "today" ? "today's plan" : "saved"}`}
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
