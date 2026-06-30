"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Unrealistic Salary', value: 450 },
  { name: 'Urgent Hiring', value: 320 },
  { name: 'Vague Details', value: 280 },
  { name: 'Payment Request', value: 150 },
  { name: 'Bad Domain', value: 100 },
];

const COLORS = ['#f43f5e', '#f97316', '#f59e0b', '#eab308', '#6366f1'];

export default function TopScamIndicators() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#18181b', borderColor: '#ffffff10', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
