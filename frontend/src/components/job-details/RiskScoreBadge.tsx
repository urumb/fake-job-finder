"use client";

import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function RiskScoreBadge({ score }: { score: number }) {
  const isHighRisk = score >= 70;
  const isMediumRisk = score >= 40 && score < 70;
  const isLowRisk = score < 40;

  const Icon = isHighRisk ? AlertTriangle : isMediumRisk ? AlertCircle : CheckCircle2;
  const color = isHighRisk ? "text-rose-500" : isMediumRisk ? "text-amber-500" : "text-emerald-500";
  const bg = isHighRisk ? "bg-rose-500" : isMediumRisk ? "bg-amber-500" : "bg-emerald-500";
  const label = isHighRisk ? "High Risk" : isMediumRisk ? "Medium Risk" : "Low Risk";

  return (
    <Card className="p-6 bg-white/[0.02] border-white/5 flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-white/10 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          ></circle>
          <motion.circle
            className={`${color} stroke-current drop-shadow-[0_0_8px_rgba(currentcolor,0.5)]`}
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            initial={{ strokeDasharray: "0 251.2" }}
            animate={{ strokeDasharray: `${(score / 100) * 251.2} 251.2` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.circle>
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-zinc-500">/100</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="text-lg font-bold text-white">{label}</h3>
        </div>
        <p className="text-sm text-zinc-400">
          {isHighRisk
            ? "Multiple critical scam indicators detected."
            : isMediumRisk
            ? "Some suspicious patterns require review."
            : "No significant scam indicators found."
          }
        </p>
      </div>
    </Card>
  );
}
