"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Workout } from "@/types/workout";
import { WorkoutCard } from "./WorkoutCard";
import { Search, SlidersHorizontal, RefreshCw, AlertTriangle } from "lucide-react";

export const WorkoutLibrary: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
      if (!res.ok) {
        throw new Error(`Failed to load workouts (Status ${res.status})`);
      }
      const data = await res.json();
      setWorkouts(data);
    } catch (err: unknown) {
      console.error("Error fetching workouts:", err);
      setError(err instanceof Error ? err.message : "Failed to load workout library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Extract all unique muscle groups
  const allMuscleGroups = useMemo(() => {
    const set = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups?.forEach((g) => set.add(g));
    });
    return ["All", ...Array.from(set)];
  }, [workouts]);

  // Filtered workouts
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.muscleGroups?.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesMuscle =
        selectedMuscle === "All" || workout.muscleGroups?.includes(selectedMuscle);

      return matchesSearch && matchesMuscle;
    });
  }, [workouts, searchQuery, selectedMuscle]);

  return (
    <section id="library" className="w-full pt-8 pb-20 scroll-mt-24">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-2">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lifts, muscle, equipment..."
            className="w-full bg-[#15171d] border border-[#232733] focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-4 py-2.5 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Muscle Group Filter Chips */}
      {!loading && !error && allMuscleGroups.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-gray-500 shrink-0 mr-1" />
          {allMuscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all uppercase tracking-wider ${
                selectedMuscle === muscle
                  ? "bg-[#ccff00] text-black shadow-sm"
                  : "bg-[#15171d] border border-[#232733] text-gray-400 hover:text-white hover:border-gray-600"
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#15171d] border border-[#232733] overflow-hidden p-0 flex flex-col"
            >
              <div className="aspect-[16/10] bg-[#1a1e28] animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-[#242938] rounded-full animate-pulse" />
                    <div className="h-5 w-14 bg-[#242938] rounded-full animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 bg-[#242938] rounded-md animate-pulse" />
                  <div className="h-4 w-1/2 bg-[#242938] rounded-md animate-pulse" />
                </div>
                <div className="pt-4 border-t border-[#232733] flex justify-between">
                  <div className="h-4 w-14 bg-[#242938] rounded animate-pulse" />
                  <div className="h-4 w-16 bg-[#242938] rounded animate-pulse" />
                  <div className="h-4 w-12 bg-[#242938] rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-2xl border border-red-500/30 bg-[#171216] p-10 text-center flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Failed to load workouts</h3>
          <p className="text-sm text-gray-400 max-w-md mb-6">{error}</p>
          <button
            onClick={fetchWorkouts}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Loading</span>
          </button>
        </div>
      )}

      {/* No matching search results */}
      {!loading && !error && filteredWorkouts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#232733] bg-[#15171d]/50 p-12 text-center">
          <p className="font-display text-2xl uppercase font-bold text-white mb-2">
            No matching lifts found
          </p>
          <p className="text-gray-400 text-sm mb-6">
            Try adjusting your search query or clear filters to see all available lifts.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("All");
            }}
            className="px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 3x4 Responsive Grid */}
      {!loading && !error && filteredWorkouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};
