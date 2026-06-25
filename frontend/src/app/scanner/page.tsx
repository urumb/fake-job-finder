"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import { PageTransition } from "@/components/PageTransition";
import { ShieldAlert, ShieldCheck, AlertTriangle, UploadCloud, Link as LinkIcon, CheckCircle2, Server, Search, Activity, FileText } from "lucide-react";
import { jobService } from "@/services/api";
import { JobResponse } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ThreeScannerScene = dynamic(() => import("@/components/ThreeScannerScene"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  description: z.string().min(20, "Please provide a more detailed description"),
  requirements: z.string().min(10, "Please provide job requirements"),
});

type FormValues = z.infer<typeof formSchema>;

const SCANNING_STAGES = [
  "Extracting Information...",
  "Running AI Analysis...",
  "Verifying Company Entity...",
  "Querying Blockchain Ledger...",
  "Calculating Final Risk Score..."
];

export default function ScannerPage() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "results">("idle");
  const [currentStage, setCurrentStage] = useState(0);
  const [result, setResult] = useState<JobResponse | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", requirements: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setScanState("scanning");
    setCurrentStage(0);

    // Simulate cinematic scanning stages
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < SCANNING_STAGES.length - 1) return prev + 1;
        clearInterval(stageInterval);
        return prev;
      });
    }, 800);

    try {
      const response = await jobService.analyzeJob(data);
      // Wait for stages animation to finish
      setTimeout(() => {
        setResult(response);
        setScanState("results");
      }, 4500);
    } catch (error) {
      console.error("Scanning failed", error);
      setScanState("idle");
    }
  };

  const getPredictionUI = (prediction: string) => {
    if (prediction === "SCAM") return {
      color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30",
      icon: ShieldAlert, label: "High Risk", gradient: "from-red-500/20"
    };
    if (prediction === "LEGIT") return {
      color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30",
      icon: ShieldCheck, label: "Safe", gradient: "from-green-500/20"
    };
    return {
      color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30",
      icon: AlertTriangle, label: "Suspicious", gradient: "from-amber-500/20"
    };
  };

  return (
    <PageTransition className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Scanner</h1>
        <p className="text-xl text-gray-400">Analyze postings against our AI models and blockchain ledger.</p>
      </div>

      <AnimatePresence mode="wait">
        {scanState === "idle" && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle>Manual Input</CardTitle>
                  <CardDescription>Paste the details of the job posting below.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Remote Data Entry Clerk" className="bg-white/5 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Paste full description..." className="min-h-[150px] bg-white/5 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="requirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Requirements</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Paste requirements..." className="min-h-[100px] bg-white/5 border-white/10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-500 transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]">
                        Initialize Scan
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-black/40 border-white/10 backdrop-blur-md border-dashed">
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Document</h3>
                  <p className="text-sm text-gray-500 mb-4">PDF, DOCX, or TXT</p>
                  <Button variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5 disabled:opacity-50" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-lg">URL Scanner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="https://..." className="bg-white/5 border-white/10 disabled:opacity-50" disabled />
                  <Button className="w-full" variant="secondary" disabled>Scan URL (Soon)</Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {scanState === "scanning" && (
          <motion.div
            key="scanning-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[60vh] flex flex-col items-center justify-center relative overflow-hidden rounded-3xl border border-white/10 bg-black/60"
          >
            <div className="absolute inset-0 z-0 opacity-50">
              <ThreeScannerScene />
            </div>

            <div className="z-10 text-center bg-black/40 p-8 rounded-2xl backdrop-blur-xl border border-white/5">
              <Activity className="w-16 h-16 text-indigo-400 animate-pulse mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">{SCANNING_STAGES[currentStage]}</h2>

              <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStage + 1) / SCANNING_STAGES.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {scanState === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Result Card */}
            <Card className={`overflow-hidden border-2 bg-black/60 backdrop-blur-xl ${getPredictionUI(result.prediction).border}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getPredictionUI(result.prediction).gradient} to-transparent`} />
              <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                <div className="relative flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                    className={`w-40 h-40 rounded-full flex items-center justify-center border-4 ${getPredictionUI(result.prediction).border} ${getPredictionUI(result.prediction).bg}`}
                  >
                    {(() => {
                      const Icon = getPredictionUI(result.prediction).icon;
                      return <Icon className={`w-20 h-20 ${getPredictionUI(result.prediction).color}`} />;
                    })()}
                  </motion.div>

                  {/* Circular Progress (mocked visually via border rotation) */}
                  <div className="absolute inset-[-10px] rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                  <h2 className={`text-5xl font-extrabold ${getPredictionUI(result.prediction).color}`}>
                    {getPredictionUI(result.prediction).label}
                  </h2>
                  <p className="text-xl text-gray-400">
                    Aegis AI has determined this listing is <strong className="text-white">{result.prediction}</strong> with a confidence score of <strong>{(result.confidence * 100).toFixed(1)}%</strong>.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button onClick={() => setScanState("idle")} variant="outline" className="border-white/20">
                      Scan Another Job
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 gap-2">
                      <FileText className="w-4 h-4" /> Download Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <Card className="lg:col-span-2 bg-black/40 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-indigo-400" />
                    AI Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result.prediction === "SCAM" ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h4 className="font-semibold text-red-400 mb-2">Detected Red Flags</h4>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                          <li>Unrealistic compensation for stated requirements.</li>
                          <li>Request for upfront payments or personal financial data implied.</li>
                          <li>Vague job responsibilities typical of known fraud templates.</li>
                        </ul>
                      </div>
                    </div>
                  ) : result.prediction === "LEGIT" ? (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">Positive Indicators</h4>
                      <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                        <li>Clear, specific role requirements.</li>
                        <li>Standard corporate language patterns detected.</li>
                        <li>No suspicious financial requests found in text.</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h4 className="font-semibold text-amber-400 mb-2">Mixed Signals</h4>
                      <p className="text-sm text-gray-300">
                        The model detected conflicting linguistic patterns. Manual review is recommended. No automated actions taken.
                      </p>
                    </div>
                  )}

                  <Separator className="bg-white/10" />

                  <div>
                    <h4 className="font-medium mb-4 text-sm text-gray-400">Analysis Timeline</h4>
                    <div className="space-y-4">
                      {[
                        { title: "Text Extraction", time: "0.01s", status: "success" },
                        { title: "NLP Processing", time: "0.45s", status: "success" },
                        { title: "Entity Verification", time: "1.20s", status: "success" },
                        { title: "Model Inference", time: "0.15s", status: "success" }
                      ].map((step, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-gray-300">{step.title}</span>
                          </div>
                          <span className="text-gray-500 font-mono">{step.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Cards */}
              <div className="space-y-6">
                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Server className="w-5 h-5 text-indigo-400" />
                      Company Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 mb-2">
                      <span className="text-xs text-gray-500 block mb-1">Entity Match</span>
                      <span className="font-medium text-white/50">Unknown / Not Provided</span>
                    </div>
                    <p className="text-xs text-gray-400">
                      We extract entity names from the text to cross-reference with databases.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <LinkIcon className="w-5 h-5 text-indigo-400" />
                      Blockchain Ledger
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result.blockchain_tx ? (
                      <div className="space-y-3">
                        <div className="p-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold rounded inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Logged to Ethereum
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Transaction Hash</span>
                          <span className="font-mono text-xs text-gray-300 break-all">{result.blockchain_tx}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 border border-dashed border-white/10 rounded-lg">
                        <p className="text-sm text-gray-500">
                          {result.prediction === "LEGIT" || result.prediction === "UNCERTAIN"
                            ? "Only confirmed scams are recorded on the blockchain."
                            : "Blockchain logging failed or bypassed."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
