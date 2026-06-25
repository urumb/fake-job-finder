"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Database, Lock } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy load Three.js component to improve performance
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <ThreeScene />
      </div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_50%)]" />

      <div className="z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-sm font-medium text-white/80">Blockchain-Secured AI Detection v2.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Protect your career from <span className="text-indigo-400">job scams</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          Aegis AI uses advanced machine learning to detect fraudulent job postings and secures high-confidence scams immutably on the Ethereum blockchain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            href="/scanner"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            Start Scanning
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/blockchain"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white border border-white/10 font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            View Evidence Ledger
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="z-10 container mx-auto px-4 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { icon: Shield, title: "ML-Powered Detection", desc: "NLP models trained on thousands of real-world job scams with strict confidence thresholds." },
          { icon: Database, title: "Immutable Evidence", desc: "High-confidence scams are hashed and permanently recorded on the Ethereum blockchain." },
          { icon: Lock, title: "Zero False Positives", desc: "Uncertain predictions trigger human review. Our system never automates irreversible actions blindly." }
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <div className="p-3 bg-indigo-500/10 rounded-xl mb-4">
              <feature.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white/90">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
