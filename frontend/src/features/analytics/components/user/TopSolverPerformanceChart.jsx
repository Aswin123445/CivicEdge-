import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

// --------------------------------------------------
// Dummy API Response (replace later with real API)
// --------------------------------------------------
const apiResponse = {
  top_solver_performance: [
    { id: 1, name: "Rahul", resolved: 42 },
    { id: 2, name: "Anoop", resolved: 38 },
    { id: 3, name: "Meera", resolved: 34 },
    { id: 4, name: "Arjun", resolved: 28 },
    { id: 5, name: "Nisha", resolved: 24 },
  ],
};

// --------------------------------------------------
// Chart Colors
// --------------------------------------------------
const barColors = [
  "#2563eb", // blue
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#bfdbfe",
];

// --------------------------------------------------
// COMPONENT: TopSolverPerformanceChart
// --------------------------------------------------
export default function TopSolverPerformanceChart({top_solver_performance}) {

  return (
    <div >

      {/* Chart */}
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top_solver_performance}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            barCategoryGap={18}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#244e85" />
            
            <XAxis
              type="number"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fill: "#cfdbec", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#1e1e1e" }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                fontSize: "14px",
              }}
              formatter={(value) => [`${value} Tasks`, "Resolved"]}
            />

            <Bar
              dataKey="resolved"
              radius={[0, 8, 8, 0]}
            >
              {top_solver_performance?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}