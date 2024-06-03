"use client";
/* Components */
import { ResponsiveContainer, PieChart, Pie } from "recharts";

function GradeChart() {
  const data = [
    { name: "16 / 20", value: 16 },
    { name: "", value: 4 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default GradeChart;
