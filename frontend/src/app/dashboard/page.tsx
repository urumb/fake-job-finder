"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Activity, Link as LinkIcon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Scans", value: "12,450", icon: Activity, trend: "+12%" },
  { title: "Scams Detected", value: "3,210", icon: ShieldAlert, trend: "+4%" },
  { title: "Blockchain Logs", value: "1,840", icon: LinkIcon, trend: "+8%" },
  { title: "Legit Jobs", value: "7,400", icon: ShieldCheck, trend: "+15%" },
];

const recentScans = [
  { id: 1, title: "Data Entry Remote", prediction: "SCAM", confidence: 0.98, time: "2 mins ago" },
  { id: 2, title: "Senior React Developer", prediction: "LEGIT", confidence: 0.92, time: "15 mins ago" },
  { id: 3, title: "Crypto Trader", prediction: "SCAM", confidence: 0.89, time: "1 hour ago" },
  { id: 4, title: "Marketing Manager", prediction: "UNCERTAIN", confidence: 0.65, time: "2 hours ago" },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">System overview and recent activity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-black/40 border-white/10 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-4 h-4 text-indigo-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-green-400 mt-1">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      scan.prediction === 'SCAM' ? 'bg-red-500/20 text-red-500' :
                      scan.prediction === 'LEGIT' ? 'bg-green-500/20 text-green-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {scan.prediction === 'SCAM' && <ShieldAlert className="w-4 h-4" />}
                      {scan.prediction === 'LEGIT' && <ShieldCheck className="w-4 h-4" />}
                      {scan.prediction === 'UNCERTAIN' && <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-white">{scan.title}</p>
                      <p className="text-xs text-gray-400">{scan.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      scan.prediction === 'SCAM' ? 'bg-red-500/20 text-red-400' :
                      scan.prediction === 'LEGIT' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {scan.prediction}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {(scan.confidence * 100).toFixed(0)}% Confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">API Status</span>
                <span className="text-green-400">Operational</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">ML Inference Engine</span>
                <span className="text-green-400">99.9% Uptime</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[99.9%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-gray-400">Ethereum Testnet</span>
                <span className="text-yellow-400">Synced (12s delay)</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[95%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
