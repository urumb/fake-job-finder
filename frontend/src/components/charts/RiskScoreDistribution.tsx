"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: '0-20', safe: 400, risk: 10 },
  { name: '21-40', safe: 300, risk: 30 },
  { name: '41-60', safe: 200, risk: 80 },
  { name: '61-80', safe: 50, risk: 150 },
  { name: '81-100', safe: 10, risk: 200 },
];

export default function RiskScoreDistribution() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Bar dataKey="safe" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
          <Bar dataKey="risk" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
