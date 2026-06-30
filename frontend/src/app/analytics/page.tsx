"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Download, Filter } from "lucide-react";

// Lazy load all 8 charts
const FakeVsRealTrend = dynamic(() => import("@/components/charts/FakeVsRealTrend"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const RiskScoreDistribution = dynamic(() => import("@/components/charts/RiskScoreDistribution"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const DailyScanTrend = dynamic(() => import("@/components/charts/DailyScanTrend"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const MonthlyScanTrend = dynamic(() => import("@/components/charts/MonthlyScanTrend"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const TopScamIndicators = dynamic(() => import("@/components/charts/TopScamIndicators"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const SalaryDistribution = dynamic(() => import("@/components/charts/SalaryDistribution"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const CompanyVerificationStatus = dynamic(() => import("@/components/charts/CompanyVerificationStatus"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});
const BlockchainVerification = dynamic(() => import("@/components/charts/BlockchainVerification"), {
  ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-lg"></div>,
});


export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d");

  const timeframes = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "all", label: "All Time" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Analytics
          </h1>
          <p className="text-zinc-400">
            Deep dive into job market trends and scam indicators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeframe === tf.value
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors">
             <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1: Fake vs Real */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6 flex items-center justify-between">
              <div>
                 <h3 className="text-lg font-medium text-white">Fake vs Real Jobs</h3>
                 <p className="text-sm text-zinc-400">Safe vs flagged jobs over time.</p>
              </div>
              <button className="p-1.5 text-zinc-400 hover:text-white bg-white/5 rounded-md transition-colors"><Filter className="w-4 h-4" /></button>
            </div>
            <div className="h-[300px]"><FakeVsRealTrend /></div>
          </Card>
        </motion.div>

        {/* Chart 2: Risk Score Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Risk Score Distribution</h3>
              <p className="text-sm text-zinc-400">Volume of scans grouped by risk level.</p>
            </div>
            <div className="h-[300px]"><RiskScoreDistribution /></div>
          </Card>
        </motion.div>

        {/* Chart 3: Daily Scan Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Daily Scan Trend</h3>
              <p className="text-sm text-zinc-400">Daily usage volume over selected timeframe.</p>
            </div>
            <div className="h-[300px]"><DailyScanTrend /></div>
          </Card>
        </motion.div>

        {/* Chart 4: Monthly Scan Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Monthly Scan Trend</h3>
              <p className="text-sm text-zinc-400">Macro view of system usage over the year.</p>
            </div>
            <div className="h-[300px]"><MonthlyScanTrend /></div>
          </Card>
        </motion.div>

        {/* Chart 5: Top Scam Indicators */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Top Scam Indicators</h3>
              <p className="text-sm text-zinc-400">Most frequent AI-detected flags across high-risk jobs.</p>
            </div>
            <div className="h-[300px]"><TopScamIndicators /></div>
          </Card>
        </motion.div>

        {/* Chart 6: Salary Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Salary Distribution</h3>
              <p className="text-sm text-zinc-400">Analysis of stated compensation across scanned jobs.</p>
            </div>
            <div className="h-[300px]"><SalaryDistribution /></div>
          </Card>
        </motion.div>

        {/* Chart 7: Company Verification Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Company Verification Status</h3>
              <p className="text-sm text-zinc-400">Breakdown of domain and entity verification.</p>
            </div>
            <div className="h-[300px]"><CompanyVerificationStatus /></div>
          </Card>
        </motion.div>

        {/* Chart 8: Blockchain Verification Success Rate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <Card className="p-6 bg-white/[0.02] border-white/5 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white">Blockchain Verification Rate</h3>
              <p className="text-sm text-zinc-400">On-chain transaction success and failure rates.</p>
            </div>
            <div className="h-[300px]"><BlockchainVerification /></div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
