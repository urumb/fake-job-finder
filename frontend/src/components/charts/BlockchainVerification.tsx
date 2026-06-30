"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: 'Jan', success: 90, failed: 10 },
  { name: 'Feb', success: 92, failed: 8 },
  { name: 'Mar', success: 95, failed: 5 },
  { name: 'Apr', success: 94, failed: 6 },
  { name: 'May', success: 98, failed: 2 },
  { name: 'Jun', success: 99, failed: 1 },
];

export default function BlockchainVerification() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Area type="monotone" dataKey="success" name="Success Rate (%)" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
