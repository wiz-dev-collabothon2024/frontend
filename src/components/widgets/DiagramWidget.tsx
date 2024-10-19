import React, { useState, useEffect } from "react";
import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
  "#FF69B4",
  "#20B2AA",
];

const DiagramWidget: React.FC = () => {
  const [data, setData] = useState<{ account: string; balance: number }[]>([]);
  const [title, setTitle] = useState("Account Balances");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint: string = "http://127.0.0.1:8000/api/main-balance-get";
        const token: string = "accessToken";
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token here
            "Content-Type": "application/json", // Optional, depending on your backend requirements
          },
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result as { account: string; balance: number }[]);
        setData(result); // Ensure your backend data matches the expected format
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const CHART_OUTER_RADIUS = "80%";
  const CHART_INNER_RADIUS = "60%"

  return (
    <div className="widget-container p-6 w-full h-full rounded-lg border bg-white text-gray-800 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold flex-shrink-0">{title}</h2>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="balance"
              nameKey="account"
              cx="40%"
              cy="50%"
              outerRadius= {CHART_OUTER_RADIUS} // Adjust as needed
              innerRadius= {CHART_INNER_RADIUS} // Adjust as needed
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle"
              iconSize={6}
              wrapperStyle={
                { fontSize: '14px',
                  lineHeight: '22px',
                }} // Adjusts font size and line spacing
              />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiagramWidget;
