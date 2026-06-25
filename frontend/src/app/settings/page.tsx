"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Configure your system preferences.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Connect to your custom backend or blockchain nodes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Backend API URL</Label>
              <Input defaultValue="http://localhost:8000" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>RPC Provider URL (Optional)</Label>
              <Input placeholder="https://sepolia.infura.io/v3/..." className="bg-white/5 border-white/10" />
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 mt-4">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-white/10 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Detection Thresholds</CardTitle>
            <CardDescription>Adjust the strictness of the ML model.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Minimum SCAM Confidence</Label>
              <Input type="number" defaultValue="0.80" step="0.05" min="0.5" max="0.99" className="bg-white/5 border-white/10 w-32" />
              <p className="text-xs text-gray-500">Scores below this are marked as UNCERTAIN.</p>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 mt-4">Update Thresholds</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
