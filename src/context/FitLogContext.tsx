"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Workout, PlanItem, SavedItem } from "@/types/workout";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "warning" | "info" | "error";
}

interface FitLogContextType {
  plan: PlanItem[];
  saved: SavedItem[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: number) => void;
  toggleCompletePlan: (id: number) => void;
  addToSaved: (workout: Workout) => { success: boolean; message: string };
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanCapped: boolean;
  totalPlanExercises: number;
  totalPlanMinutes: number;
  totalPlanCalories: number;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: "success" | "warning" | "info" | "error") => void;
  removeToast: (id: string) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

const PLAN_STORAGE_KEY = "fitlog_today_plan_v1";
const SAVED_STORAGE_KEY = "fitlog_saved_workouts_v1";
const MAX_PLAN_LIMIT = 5;

export const FitLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error("Failed to load FitLog data from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when plan changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
    } catch (err) {
      console.error("Failed to save plan to localStorage:", err);
    }
  }, [plan, isLoaded]);

  // Save to localStorage when saved changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
    } catch (err) {
      console.error("Failed to save saved workouts to localStorage:", err);
    }
  }, [saved, isLoaded]);

  const showToast = (
    title: string,
    description?: string,
    type: "success" | "warning" | "info" | "error" = "success"
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isInPlan = (id: number) => {
    return plan.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((item) => item.id === id);
  };

  const isPlanCapped = useMemo(() => plan.length >= MAX_PLAN_LIMIT, [plan]);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      showToast("Already in Plan", `"${workout.name}" is already in today's plan.`, "info");
      return { success: false, message: "Already in today's plan" };
    }

    if (plan.length >= MAX_PLAN_LIMIT) {
      showToast(
        "Plan Cap Reached (5 lifts)",
        "Today's plan is capped at 5 exercises. Complete or remove a lift to add more.",
        "warning"
      );
      return { success: false, message: "Today's plan is capped at 5 exercises." };
    }

    const newPlanItem: PlanItem = {
      ...workout,
      addedAt: Date.now(),
      isCompleted: false,
    };

    setPlan((prev) => [...prev, newPlanItem]);
    showToast("Added to today's plan", `"${workout.name}" has been locked into your routine.`, "success");
    return { success: true, message: "Added to today's plan" };
  };

  const removeFromPlan = (id: number) => {
    const target = plan.find((item) => item.id === id);
    setPlan((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      showToast("Removed from Plan", `"${target.name}" removed from today's plan.`, "info");
    }
  };

  const toggleCompletePlan = (id: number) => {
    setPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isCompleted;
          if (nextState) {
            showToast("Workout Completed! 🔥", `Awesome work crushing "${item.name}"!`, "success");
          } else {
            showToast("Marked as Pending", `"${item.name}" reset to active.`, "info");
          }
          return { ...item, isCompleted: nextState };
        }
        return item;
      })
    );
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      showToast("Already Saved", `"${workout.name}" is already in your saved list.`, "info");
      return { success: false, message: "Already saved" };
    }

    const newSavedItem: SavedItem = {
      ...workout,
      savedAt: Date.now(),
    };

    setSaved((prev) => [...prev, newSavedItem]);
    showToast("Saved for later", `"${workout.name}" added to your saved workouts.`, "success");
    return { success: true, message: "Saved for later" };
  };

  const removeFromSaved = (id: number) => {
    const target = saved.find((item) => item.id === id);
    setSaved((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      showToast("Removed from Saved", `"${target.name}" removed from saved list.`, "info");
    }
  };

  // Metrics calculations for Today's Plan
  const totalPlanExercises = plan.length;
  const totalPlanMinutes = useMemo(
    () => plan.reduce((sum, item) => sum + (Number(item.duration) || 0), 0),
    [plan]
  );
  const totalPlanCalories = useMemo(
    () => plan.reduce((sum, item) => sum + (Number(item.caloriesBurned) || 0), 0),
    [plan]
  );

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        isLoaded,
        addToPlan,
        removeFromPlan,
        toggleCompletePlan,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isSaved,
        isPlanCapped,
        totalPlanExercises,
        totalPlanMinutes,
        totalPlanCalories,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
};
