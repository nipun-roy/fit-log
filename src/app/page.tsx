import { HeroBanner } from "@/components/HeroBanner";
import { WorkoutLibrary } from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero / Banner matching Figma */}
      <HeroBanner />

      {/* The Library Grid (3x4 responsive) */}
      <WorkoutLibrary />
    </div>
  );
}
