"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: 'Jan', scans: 4000 },
  { name: 'Feb', scans: 3000 },
  { name: 'Mar', scans: 5000 },
  { name: 'Apr', scans: 4500 },
  { name: 'May', scans: 6000 },
  { name: 'Jun', scans: 5500 },
  { name: 'Jul', scans: 7000 },
  { name: 'Aug', scans: 6800 },
  { name: 'Sep', scans: 8000 },
  { name: 'Oct', scans: 7500 },
  { name: 'Nov', scans: 9000 },
  { name: 'Dec', scans: 8500 },
];

export default function MonthlyScanTrend() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="scans" name="Monthly Scans" stroke="#a855f7" strokeWidth={3} dot={{ r: 4, fill: '#a855f7' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
