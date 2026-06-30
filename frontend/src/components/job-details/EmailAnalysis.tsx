"use client";

import { motion } from "framer-motion";
import { Mail, ShieldCheck, ShieldAlert, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

interface EmailAnalysisProps {
  email: string;
  domain: string;
  isDomainVerified: boolean;
  isFreeProvider: boolean;
  mxRecordsValid: boolean;
}

export function EmailAnalysis({ email, domain, isDomainVerified, isFreeProvider, mxRecordsValid }: EmailAnalysisProps) {
  const isHighRisk = isFreeProvider || !mxRecordsValid || (!isDomainVerified && !isFreeProvider);

  return (
    <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
      <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
        <Mail className="w-5 h-5 text-indigo-400" />
        Email & Contact Analysis
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500">Contact Email</span>
            <span className="text-sm font-medium text-white">{email}</span>
          </div>
          {isHighRisk ? (
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Domain Age & Verification
            </span>
            <span className={isDomainVerified ? "text-emerald-400" : "text-amber-400"}>
              {isDomainVerified ? "Verified Corporate" : "Unverified / New"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Provider Type</span>
            <span className={isFreeProvider ? "text-rose-400" : "text-emerald-400"}>
              {isFreeProvider ? "Free/Public (Gmail, Yahoo)" : "Custom Domain"}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">MX Records</span>
            <span className={mxRecordsValid ? "text-emerald-400" : "text-rose-400"}>
              {mxRecordsValid ? "Valid Configuration" : "Invalid / Missing"}
            </span>
          </div>
        </div>

        {isFreeProvider && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-amber-400/80 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 mt-4"
          >
            Legitimate enterprise companies rarely use free email providers for official recruitment communications.
          </motion.p>
        )}
      </div>
    </Card>
  );
}
