"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

const history = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  title: ["Senior Developer", "Data Entry Clerk", "Marketing Pro", "Crypto Analyst"][i % 4],
  prediction: ["SCAM", "LEGIT", "UNCERTAIN"][i % 3],
  confidence: Math.random() * (0.99 - 0.60) + 0.60,
  date: new Date(Date.now() - i * 86400000).toLocaleDateString()
}));

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Scan History</h1>
        <p className="text-gray-400">Review your past job posting analyses.</p>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-white/10">
            {history.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    item.prediction === 'SCAM' ? 'bg-red-500/20 text-red-500' :
                    item.prediction === 'LEGIT' ? 'bg-green-500/20 text-green-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {item.prediction === 'SCAM' && <ShieldAlert className="w-5 h-5" />}
                    {item.prediction === 'LEGIT' && <ShieldCheck className="w-5 h-5" />}
                    {item.prediction === 'UNCERTAIN' && <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${
                    item.prediction === 'SCAM' ? 'text-red-400' :
                    item.prediction === 'LEGIT' ? 'text-green-400' :
                    'text-yellow-400'
                  }`}>
                    {item.prediction}
                  </div>
                  <div className="text-xs text-gray-500">{(item.confidence * 100).toFixed(1)}% Conf</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
