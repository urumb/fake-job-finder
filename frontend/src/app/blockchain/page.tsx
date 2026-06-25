"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LinkIcon, Shield } from "lucide-react";

export default function BlockchainPage() {
  const logs = [
    { tx: "0x123abc456def7890", cid: "QmYwAPJzv5CZsnA625s3Xf2sm5D35...", date: "2024-01-15 14:32" },
    { tx: "0xdef7890123abc456", cid: "QmXzAPJzv5CZsnA625s3Xf2sm5D35...", date: "2024-01-14 09:12" },
    { tx: "0xabc123456def7890", cid: "QmQwAPJzv5CZsnA625s3Xf2sm5D35...", date: "2024-01-12 18:45" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Blockchain Evidence</h1>
        <p className="text-gray-400">Immutable ledger of high-confidence scams recorded on Ethereum.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-indigo-500/10 border-indigo-500/20 backdrop-blur-md">
          <CardHeader className="pb-2">
            <Shield className="w-8 h-8 text-indigo-400 mb-2" />
            <CardTitle>Smart Contract</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm text-gray-400 break-all">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle>Total Evidences</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,840</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle>Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-green-400">Ethereum Sepolia</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
          <CardDescription>Latest scams permanently recorded.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/10 bg-white/5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <LinkIcon className="w-4 h-4" />
                    <span className="font-mono text-sm">{log.tx}</span>
                  </div>
                  <span className="text-xs text-gray-500">{log.date}</span>
                </div>
                <div className="text-sm text-gray-400">
                  <span className="font-semibold text-white/70">IPFS CID: </span>
                  {log.cid}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
