"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Database, Zap, CheckCircle, Brain, Activity } from "lucide-react";
import dynamic from "next/dynamic";
import { PageTransition } from "@/components/PageTransition";
import { Variants } from "framer-motion";

const ThreeHeroScene = dynamic(() => import("@/components/ThreeHeroScene"), {
  ssr: false,
});

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <PageTransition className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <ThreeHeroScene />
        </div>

        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,rgba(0,0,0,1)_70%)]" />

        <div className="z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">Aegis AI Enterprise v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40"
          >
            Securing careers with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">intelligent validation</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 font-light leading-relaxed"
          >
            Advanced NLP models detecting fraudulent job postings in milliseconds. High-confidence threats are immutably secured on the Ethereum blockchain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center"
          >
            <Link
              href="/scanner"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              Analyze Job Posting
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white border border-white/10 font-medium rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section (Placeholder) */}
      <section className="py-20 border-t border-white/5 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">Trusted by forward-thinking security teams</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Logos mocked with text for now */}
            <h2 className="text-2xl font-bold font-serif">Acme Corp</h2>
            <h2 className="text-2xl font-bold tracking-tighter">GLOBALTECH</h2>
            <h2 className="text-2xl font-bold italic">CyberShield</h2>
            <h2 className="text-2xl font-bold">NEXUS</h2>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Uncompromising Security Architecture</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Our platform combines state-of-the-art machine learning with the immutability of blockchain technology.</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Brain, title: "Explainable AI", desc: "Transparent neural networks that provide exact reasoning for every risk score generated." },
              { icon: Database, title: "Blockchain Verification", desc: "Immutable cryptographic evidence of high-confidence scams stored on Ethereum." },
              { icon: Activity, title: "Real-time Processing", desc: "Analyze complex job descriptions and requirements in under 50 milliseconds." },
              { icon: Shield, title: "Zero False Positives", desc: "Strict gating prevents irreversible automated actions on uncertain predictions." },
              { icon: CheckCircle, title: "Company Verification", desc: "Cross-referencing entity data against known malicious actor databases." },
              { icon: Zap, title: "API-First Design", desc: "Seamlessly integrate our scanning engine into your existing ATS workflows." }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white/90">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">How Aegis Operates</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                A seamless pipeline designed to protect users from sophisticated employment fraud without adding friction.
              </p>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Data Ingestion", desc: "Paste text, URLs, or documents into our secure portal." },
                  { step: "02", title: "NLP Extraction", desc: "Models extract intent, requirements, and subtle linguistic red flags." },
                  { step: "03", title: "Confidence Gating", desc: "Predictions are strictly gated. Only high-confidence signals trigger alerts." },
                  { step: "04", title: "Ledger Commitment", desc: "Confirmed threats are hashed and logged to the blockchain forever." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-2xl font-bold text-indigo-500/50">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-full border border-white/10 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]"
            >
              {/* Abstract Representation of the pipeline */}
              <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl absolute" />
              <Shield className="w-24 h-24 text-indigo-400 relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to secure your hiring?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals using Aegis AI to navigate the modern job market safely.
          </p>
          <Link
            href="/scanner"
            className="inline-flex items-center justify-center px-10 py-5 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors text-lg"
          >
            Start Scanning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-500">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-white tracking-wider">AEGIS AI</span>
          </div>
          <p>© 2026 Aegis Security Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">API Docs</Link>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
}
