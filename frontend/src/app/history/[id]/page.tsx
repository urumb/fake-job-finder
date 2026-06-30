"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Share2, Download, Building, MapPin, DollarSign, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RiskScoreBadge } from "@/components/job-details/RiskScoreBadge";
import { AIFindings } from "@/components/job-details/AIFindings";
import { VerificationStatus } from "@/components/job-details/VerificationStatus";
import { SalaryAnalysis } from "@/components/job-details/SalaryAnalysis";
import { EmailAnalysis } from "@/components/job-details/EmailAnalysis";
import { SignalsList } from "@/components/job-details/SignalsList";
import { AnalysisTimeline } from "@/components/job-details/AnalysisTimeline";
import { Card } from "@/components/ui/card";

export default function JobDetailsPage() {
  const params = useParams();

  const mockJob = {
    id: params.id as string,
    title: "Senior React Developer",
    company: "Global Remote Staffing",
    location: "Remote / Worldwide",
    salary: "$150,000 - $200,000",
    postedAt: "2 days ago",
    score: 85,
    blockchainVerified: true,
    hash: "0x8f2a3c9b7e1d5f4a6b2c8e9d1f3a5b7c9e2d4f6a8b0c1d3e5f7a9b2c4e6d8f0",
  };

  const signals = {
    positive: [
      { label: "Valid Job Title format", desc: "Title structure matches standard industry conventions." }
    ],
    negative: [
      { label: "No direct company website linked", desc: "Application goes through a generic 3rd party form." },
      { label: "Missing tech stack details", desc: "Requirements are extremely vague for a 'Senior' role." }
    ],
    scamIndicators: [
      { label: "Advance Fee Request", desc: "Mentions 'purchasing your own equipment initially'." },
      { label: "Urgency Marker", desc: "'Urgent hire for a secret project' is a known social engineering tactic." }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Back & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
         <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2">{mockJob.title}</h1>
               <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5"><Building className="w-4 h-4" /> {mockJob.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {mockJob.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {mockJob.salary}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {mockJob.postedAt}</span>
               </div>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/10 whitespace-nowrap">
               View Original Post
               <ExternalLink className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Main Analysis) */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <AIFindings />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <SignalsList
              positive={signals.positive}
              negative={signals.negative}
              scamIndicators={signals.scamIndicators}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <SalaryAnalysis
                listedSalary="$150k - $200k"
                marketAverage="$110k - $140k"
                deviation={45}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <EmailAnalysis
                email="hr-globalremote@gmail.com"
                domain="gmail.com"
                isDomainVerified={false}
                isFreeProvider={true}
                mxRecordsValid={true}
              />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <AnalysisTimeline />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
             <Card className="p-6 bg-white/[0.02] border-white/5">
                <h3 className="text-lg font-medium text-white mb-4">Original Job Description Snippet</h3>
                <div className="prose prose-invert max-w-none text-zinc-400 text-sm p-4 bg-black/50 rounded-lg border border-white/5 font-mono">
                   <p>We are looking for a highly motivated and experienced Senior React Developer to join our team immediately. This is an urgent hire for a secret project.</p>
                   <p className="bg-rose-500/10 text-rose-200 p-1 -mx-1 rounded my-2">You will be required to purchase your own equipment initially, but we will reimburse you in your first paycheck.</p>
                   <p>Requirements:</p>
                   <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>Must have at least 1 year of experience but willing to learn.</li>
                      <li>Work from anywhere in the world.</li>
                      <li>Provide bank details upon acceptance for fast onboarding.</li>
                   </ul>
                </div>
             </Card>
          </motion.div>
        </div>

        {/* Right Column (Score & Meta) */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <RiskScoreBadge score={mockJob.score} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <VerificationStatus verified={mockJob.blockchainVerified} hash={mockJob.hash} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
