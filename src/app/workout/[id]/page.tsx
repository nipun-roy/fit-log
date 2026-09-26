import React from "react";
import { notFound } from "next/navigation";
import { Workout } from "@/types/workout";
import { WorkoutDetailClient } from "./WorkoutDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch workout with status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching workout ${id}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) {
    return {
      title: "Workout Not Found | FitLog",
    };
  }
  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }: PageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WorkoutDetailClient workout={workout} />
    </div>
  );
}
