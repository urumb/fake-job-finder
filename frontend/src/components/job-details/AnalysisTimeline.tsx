"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Clock, ShieldAlert, ChevronDown, Activity, FileText, BrainCircuit, Search, Database, Fingerprint, Mail, DollarSign, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimelineStage {
  id: string;
  title: string;
  icon: LucideIcon;
  status: "complete" | "warning" | "error" | "processing";
  timeTaken: string;
  confidence?: number;
  details: string;
}

const mockStages: TimelineStage[] = [
  { id: "1", title: "Content Extraction", icon: FileText, status: "complete", timeTaken: "0.4s", details: "Successfully parsed HTML and extracted core job text, title, and metadata." },
  { id: "2", title: "NLP Processing", icon: BrainCircuit, status: "complete", timeTaken: "1.2s", details: "Tokenized content and ran entity extraction (Company, Location, Requirements)." },
  { id: "3", title: "Scam Pattern Detection", icon: Search, status: "warning", timeTaken: "2.5s", confidence: 88, details: "Flagged 'Urgent Hiring Language' model with high confidence. Found 4 instances of pressure tactics." },
  { id: "4", title: "Salary Analysis", icon: DollarSign, status: "error", timeTaken: "0.8s", confidence: 94, details: "Cross-referenced requested salary against market database. Deviation: +45%." },
  { id: "5", title: "Email Verification", icon: Mail, status: "warning", timeTaken: "1.5s", details: "Domain is a free provider (gmail.com). MX records exist but domain age check is skipped." },
  { id: "6", title: "Company Verification", icon: Database, status: "error", timeTaken: "2.1s", confidence: 75, details: "Could not find matching corporate entity registration for 'Global Remote Staffing' in primary operating jurisdiction." },
  { id: "7", title: "Blockchain Verification", icon: Fingerprint, status: "complete", timeTaken: "4.2s", details: "Generated cryptographic hash of findings and committed to Ethereum ledger." },
  { id: "8", title: "Final Risk Calculation", icon: Activity, status: "complete", timeTaken: "0.1s", details: "Aggregated all signal weights. Final computed risk score: 85/100 (HIGH RISK)." },
];

export function AnalysisTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>("4");

  return (
    <Card className="p-6 bg-white/[0.02] border-white/5">
      <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-indigo-400" />
        Timeline of Analysis
      </h3>

      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/50 before:via-white/10 before:to-transparent">
        {mockStages.map((stage, i) => {
          const Icon = stage.icon;
          const isExpanded = expandedId === stage.id;

          let statusColor = "text-zinc-500 bg-zinc-500/10 border-zinc-500/20";
          let StatusIcon = Clock;

          if (stage.status === "complete") {
            statusColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
            StatusIcon = CheckCircle2;
          } else if (stage.status === "warning") {
            statusColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
            StatusIcon = ShieldAlert;
          } else if (stage.status === "error") {
            statusColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
            StatusIcon = ShieldAlert;
          }

          return (
            <div key={stage.id} className="relative flex items-start group is-active py-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border shadow shrink-0 z-10 transition-colors ${statusColor}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="ml-4 flex-1">
                <div
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer group-hover:border-white/10"
                  onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{stage.title}</span>
                      <StatusIcon className={`w-3.5 h-3.5 ${statusColor.split(' ')[0]}`} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      {stage.confidence && (
                        <span className="hidden sm:inline bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {stage.confidence}% conf
                        </span>
                      )}
                      <span>{stage.timeTaken}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                          {stage.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
