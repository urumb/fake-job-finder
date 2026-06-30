"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SalaryAnalysisProps {
  listedSalary: string;
  marketAverage: string;
  deviation: number;
}

export function SalaryAnalysis({ listedSalary, marketAverage, deviation }: SalaryAnalysisProps) {
  const isSuspicious = deviation > 30; // More than 30% above market is suspicious

  return (
    <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
      <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-indigo-400" />
        Salary Analysis
      </h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-500 mb-1">Listed Compensation</div>
            <div className={`text-2xl font-bold ${isSuspicious ? 'text-rose-400' : 'text-white'}`}>
              {listedSalary}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-zinc-500 mb-1">Market Average</div>
            <div className="text-xl font-medium text-zinc-300">
              {marketAverage}
            </div>
          </div>
        </div>

        <div className="relative pt-4 pb-2">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isSuspicious ? "90%" : "60%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${isSuspicious ? 'bg-rose-500' : 'bg-emerald-500'}`}
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            {isSuspicious ? (
              <TrendingUp className="w-4 h-4 text-rose-400" />
            ) : deviation < -10 ? (
              <TrendingDown className="w-4 h-4 text-amber-400" />
            ) : (
              <Minus className="w-4 h-4 text-emerald-400" />
            )}
            <span className={`text-sm font-medium ${
              isSuspicious ? 'text-rose-400' : deviation < -10 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {Math.abs(deviation)}% {deviation > 0 ? "above" : "below"} market rate
            </span>
          </div>
        </div>

        {isSuspicious && (
          <p className="text-sm text-rose-400/80 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
            This salary is unrealistically high for the requested experience level and location. This is a common tactic used in advance-fee scams.
          </p>
        )}
      </div>
    </Card>
  );
}
