"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Signal {
  label: string;
  desc?: string;
}

interface SignalsListProps {
  positive: Signal[];
  negative: Signal[];
  scamIndicators: Signal[];
}

export function SignalsList({ positive, negative, scamIndicators }: SignalsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-5 bg-white/[0.02] border-emerald-500/20">
        <h4 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Positive Signals
        </h4>
        <ul className="space-y-3">
          {positive.length > 0 ? positive.map((sig, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-zinc-300"
            >
              <span className="block font-medium">{sig.label}</span>
              {sig.desc && <span className="text-xs text-zinc-500">{sig.desc}</span>}
            </motion.li>
          )) : (
            <li className="text-sm text-zinc-600 italic">No positive signals detected.</li>
          )}
        </ul>
      </Card>

      <Card className="p-5 bg-white/[0.02] border-amber-500/20">
        <h4 className="text-sm font-semibold text-amber-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Negative Signals
        </h4>
        <ul className="space-y-3">
          {negative.length > 0 ? negative.map((sig, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-zinc-300"
            >
              <span className="block font-medium">{sig.label}</span>
              {sig.desc && <span className="text-xs text-zinc-500">{sig.desc}</span>}
            </motion.li>
          )) : (
            <li className="text-sm text-zinc-600 italic">No negative signals detected.</li>
          )}
        </ul>
      </Card>

      <Card className="p-5 bg-white/[0.02] border-rose-500/20">
        <h4 className="text-sm font-semibold text-rose-400 mb-4 flex items-center gap-2">
          <XCircle className="w-4 h-4" /> Scam Indicators
        </h4>
        <ul className="space-y-3">
          {scamIndicators.length > 0 ? scamIndicators.map((sig, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm text-rose-200"
            >
              <span className="block font-medium">{sig.label}</span>
              {sig.desc && <span className="text-xs text-rose-400/70">{sig.desc}</span>}
            </motion.li>
          )) : (
            <li className="text-sm text-zinc-600 italic">No direct scam patterns detected.</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
