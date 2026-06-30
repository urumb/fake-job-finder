"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: '01', scans: 142 },
  { name: '02', scans: 180 },
  { name: '03', scans: 155 },
  { name: '04', scans: 210 },
  { name: '05', scans: 245 },
  { name: '06', scans: 190 },
  { name: '07', scans: 165 },
  { name: '08', scans: 200 },
  { name: '09', scans: 220 },
  { name: '10', scans: 280 },
  { name: '11', scans: 250 },
  { name: '12', scans: 215 },
  { name: '13', scans: 185 },
  { name: '14', scans: 160 },
];

export default function DailyScanTrend() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="scans" name="Daily Scans" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
