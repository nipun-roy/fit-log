"use client";

import React from "react";
import { useFitLog } from "@/context/FitLogContext";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useFitLog();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = "border-[#232733]";
        let icon = <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />;

        if (toast.type === "warning") {
          borderClass = "border-amber-500/40";
          icon = <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === "error") {
          borderClass = "border-red-500/40";
          icon = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
        } else if (toast.type === "info") {
          borderClass = "border-blue-500/40";
          icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#15171d]/95 backdrop-blur-md border ${borderClass} shadow-2xl text-white transition-all transform animate-in fade-in slide-in-from-bottom-5 duration-300`}
            role="alert"
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-white">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 transition-colors rounded-md"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
