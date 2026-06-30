"use client";

import { motion } from "framer-motion";
import { AlertOctagon, CheckCircle, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AIFindings() {
  const findings = [
    { type: "negative", title: "Unrealistic Salary", desc: "Listed salary ($150k-200k) is 45% above market average for this role and location.", confidence: 94 },
    { type: "negative", title: "Urgent Hiring Language", desc: "Excessive use of urgency markers ('immediate start', 'act now') common in scams.", confidence: 88 },
    { type: "positive", title: "Valid Company Domain", desc: "Email domain matches the verified corporate website (techflow.com).", confidence: 99 },
    { type: "info", title: "Vague Description", desc: "Job responsibilities lack specific technical requirements.", confidence: 75 },
  ];

  return (
    <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
      <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        AI Analysis Findings
      </h3>

      <div className="space-y-4">
        {findings.map((finding, i) => {
          const isNeg = finding.type === "negative";
          const isPos = finding.type === "positive";
          const Icon = isNeg ? AlertOctagon : isPos ? CheckCircle : Info;
          const color = isNeg ? "text-rose-400" : isPos ? "text-emerald-400" : "text-amber-400";
          const bg = isNeg ? "bg-rose-500/10 border-rose-500/20" : isPos ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-4 rounded-lg border ${bg} flex items-start gap-4`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${color}`} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h4 className="font-medium text-white">{finding.title}</h4>
                  <div className="text-xs font-medium text-zinc-500 shrink-0">
                    {finding.confidence}% confidence
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {finding.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
