"use client";

import { Fingerprint, Check, ExternalLink, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function VerificationStatus({ verified, hash }: { verified: boolean, hash?: string }) {
  if (!verified) {
    return (
      <Card className="p-6 bg-white/[0.02] border-white/5 flex flex-col items-center justify-center text-center text-zinc-500 py-12">
        <Fingerprint className="w-12 h-12 mb-4 opacity-50" />
        <p>No blockchain verification record found for this job.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/[0.02] border-indigo-500/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
            <Fingerprint className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              Blockchain Verified
              <Check className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-sm text-zinc-400">Immutable record stored on Ethereum.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> Transaction Hash
            </div>
            <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg border border-white/5 font-mono text-xs text-zinc-300">
              <span className="truncate mr-4">{hash || "0x8f2a...391e"}</span>
              <Link href="#" className="text-indigo-400 hover:text-indigo-300 shrink-0">
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Timestamp</div>
              <div className="text-sm text-white">Oct 24, 2023</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">Network</div>
              <div className="text-sm text-white">Ethereum Mainnet</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
