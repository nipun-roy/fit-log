import React, { Suspense } from "react";
import { Metadata } from "next";
import { MyPlanClient } from "./MyPlanClient";

export const metadata: Metadata = {
  title: "My Plan | FitLog",
  description: "Cap of five lifts for today. Finish them, then load more.",
};

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading workouts…</p>
        </div>
      }
    >
      <MyPlanClient />
    </Suspense>
  );
}
