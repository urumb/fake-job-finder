"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, ShieldCheck, HelpCircle, Loader2, Link as LinkIcon } from "lucide-react";
import { jobService } from "@/services/api";
import { JobResponse, JobRequest } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<JobResponse | null>(null);
  const [formData, setFormData] = useState<JobRequest>({
    title: "",
    description: "",
    requirements: ""
  });

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.requirements) return;

    setIsScanning(true);
    setResult(null);

    try {
      const response = await jobService.analyzeJob(formData);
      setResult(response);
    } catch (error) {
      console.error("Scanning failed", error);
    } finally {
      setIsScanning(false);
    }
  };

  const getPredictionColor = (prediction: string) => {
    if (prediction === "SCAM") return "text-red-500 bg-red-500/10 border-red-500/20";
    if (prediction === "LEGIT") return "text-green-500 bg-green-500/10 border-green-500/20";
    return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  };

  const getPredictionIcon = (prediction: string) => {
    if (prediction === "SCAM") return <ShieldAlert className="w-12 h-12 text-red-500" />;
    if (prediction === "LEGIT") return <ShieldCheck className="w-12 h-12 text-green-500" />;
    return <HelpCircle className="w-12 h-12 text-yellow-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Job Scanner</h1>
        <p className="text-gray-400">Analyze job postings for signs of fraud using our AI models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter the job posting details to scan.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Remote Data Entry Clerk"
                  className="bg-white/5 border-white/10 focus:border-indigo-500"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <textarea
                  id="description"
                  className="w-full h-32 px-3 py-2 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Paste the full job description here..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <textarea
                  id="requirements"
                  className="w-full h-24 px-3 py-2 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Paste job requirements..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  "Run AI Analysis"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className={`bg-black/40 border backdrop-blur-md ${getPredictionColor(result.prediction)}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                      >
                        {getPredictionIcon(result.prediction)}
                      </motion.div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight">
                      {result.prediction}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Confidence Score: {(result.confidence * 100).toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-current"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>

                    {result.blockchain_tx && (
                      <div className="p-4 rounded-lg bg-black/30 border border-white/10">
                        <div className="flex items-center gap-2 mb-2 text-indigo-400">
                          <LinkIcon className="w-4 h-4" />
                          <span className="font-medium text-sm">Blockchain Evidence Logged</span>
                        </div>
                        <p className="text-xs font-mono text-gray-400 break-all">
                          TX: {result.blockchain_tx}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border border-white/5 rounded-xl bg-white/[0.02]"
              >
                <ShieldAlert className="w-16 h-16 text-white/10 mb-4" />
                <h3 className="text-xl font-medium text-white/50 mb-2">Awaiting Analysis</h3>
                <p className="text-sm text-white/30">Enter job details and run the scanner to see AI predictions and blockchain logs.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
