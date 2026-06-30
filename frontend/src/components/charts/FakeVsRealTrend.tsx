"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', fake: 10, real: 120 },
  { name: 'Tue', fake: 15, real: 132 },
  { name: 'Wed', fake: 8, real: 101 },
  { name: 'Thu', fake: 25, real: 145 },
  { name: 'Fri', fake: 18, real: 160 },
  { name: 'Sat', fake: 5, real: 40 },
  { name: 'Sun', fake: 12, real: 55 },
];

export default function FakeVsRealTrend() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
             contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
             itemStyle={{ color: '#e4e4e7' }}
          />
          <Area type="monotone" dataKey="real" stroke="#10b981" fillOpacity={1} fill="url(#colorReal)" />
          <Area type="monotone" dataKey="fake" stroke="#f43f5e" fillOpacity={1} fill="url(#colorFake)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
