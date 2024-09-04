import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const ChartComponent = ({ data }) => {
  const formattedData = data.map((entry) => ({
    ...entry,
    value: entry.value,
  }));

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={formattedData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Legend />
      </div>
    </div>
  );
};

export default ChartComponent;
