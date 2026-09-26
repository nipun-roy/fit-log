"use client";

import React, { useEffect, useState } from "react";
import { Workout } from "@/types/workout";
import { WorkoutCard } from "./WorkoutCard";
import { RefreshCw, AlertTriangle } from "lucide-react";

// Workout Library section matching Figma design
export const WorkoutLibrary: React.FC = () => {
  // State to hold the workouts list from API
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all workouts from FitLog API
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

  // Fetch on mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="w-full pt-8 pb-20 scroll-mt-24">
      {/* Section Header exactly matching Figma */}
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white mb-2">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading animation: 12 Skeleton cards */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#15171d] border border-[#232733] overflow-hidden p-0 flex flex-col"
            >
              <div className="aspect-[16/10] bg-[#1a1e28] animate-pulse" />
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

      {/* Error state with retry button */}
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

      {/* 3x4 Responsive Grid of Workouts matching Figma */}
      {!loading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};
