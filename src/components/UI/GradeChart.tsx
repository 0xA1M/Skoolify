"use client";
/* Utils */
import { useState } from "react";
import { useTheme } from "next-themes";

/* Components */
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
} from "recharts";

const RenderShape = (props: any) => {
  const { theme } = useTheme();

  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={theme === "light" ? "black" : "white"}
      >
        Attendance
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-lg"
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        className="drop-shadow-lg"
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
        className="drop-shadow-lg"
      />

      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke="none"
        className="drop-shadow-lg"
      />

      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        className="drop-shadow-lg"
      >{`${(percent * 100).toFixed(1)}%`}</text>
    </g>
  );
};

function GradeChart() {
  const data = [
    { name: "Present", value: 7 },
    { name: "Absent", value: 3 },
  ];

  const colors = ["#4169E1", "#FF4719"];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={0}
            activeShape={RenderShape}
            inactiveShape={RenderShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={450}
            endAngle={90}
            paddingAngle={4}
            stroke="none"
            dataKey="value"
            className="mb-4"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]}></Cell>
            ))}
          </Pie>

          <Legend iconSize={6} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default GradeChart;
