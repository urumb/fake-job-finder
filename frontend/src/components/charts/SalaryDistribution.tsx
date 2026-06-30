"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: '<$50k', jobs: 120 },
  { name: '$50k-$80k', jobs: 350 },
  { name: '$80k-$120k', jobs: 480 },
  { name: '$120k-$160k', jobs: 250 },
  { name: '$160k-$200k', jobs: 110 },
  { name: '>$200k', jobs: 45 },
];

export default function SalaryDistribution() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
          <XAxis type="number" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} width={80} />
          <Tooltip
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="jobs" name="Number of Jobs" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
