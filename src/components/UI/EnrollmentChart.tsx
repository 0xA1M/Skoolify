"use client";
/* Utils */
import { useTheme } from "next-themes";

/* Components */
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const EnrollmentChart = () => {
  const { theme } = useTheme();

  const data = [
    { month: "Jan", students: 21, teachers: 6, staff: 3 },
    { month: "Feb", students: 33, teachers: 8, staff: 4 },
    { month: "Mar", students: 47, teachers: 11, staff: 6 },
    { month: "Apr", students: 58, teachers: 12, staff: 6 },
    { month: "May", students: 71, teachers: 15, staff: 7 },
    { month: "Jun", students: 21, teachers: 6, staff: 3 },
    { month: "Jul", students: 26, teachers: 7, staff: 4 },
    { month: "Aug", students: 110, teachers: 18, staff: 9 },
    { month: "Sep", students: 173, teachers: 29, staff: 14 },
    { month: "Oct", students: 192, teachers: 30, staff: 13 },
    { month: "Nov", students: 184, teachers: 31, staff: 12 },
    { month: "Dec", students: 172, teachers: 29, staff: 11 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 0, right: 30, left: 10, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorStudent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4169E1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4169E1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTeacher" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6E91EC" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6E91EC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorStaff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2F50C1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#2F50C1" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          type="category"
          tick={{ fill: theme === "dark" ? "#FFFFFFE0" : "#000000E0" }}
          dataKey="month"
          label={{
            fill: theme === "dark" ? "#FFFFFFE0" : "#000000E0",
            value: "Months",
            position: "bottom",
          }}
        />

        <YAxis
          tick={{ fill: theme === "dark" ? "#FFFFFFE0" : "#000000E0" }}
          label={{
            fill: theme === "dark" ? "#FFFFFFE0" : "#000000E0",
            value: "Population",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Legend verticalAlign="top" iconType="circle" iconSize={8} />

        <Tooltip
          contentStyle={{
            backgroundColor: theme === "light" ? "#ffffffE0" : "#222222E0",
            border: "none",
          }}
          labelStyle={{ color: theme === "light" ? "#000000" : "#FFFFFF" }}
        />

        <Area
          type="monotone"
          dataKey="students"
          stroke="#4169E1"
          fillOpacity={1}
          fill="url(#colorStudent)"
        />

        <Area
          type="monotone"
          dataKey="teachers"
          stroke="#6E91EC"
          fillOpacity={1}
          fill="url(#colorTeacher)"
        />

        <Area
          type="monotone"
          dataKey="staff"
          stroke="#2F50C1"
          fillOpacity={1}
          fill="url(#colorStaff)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EnrollmentChart;
