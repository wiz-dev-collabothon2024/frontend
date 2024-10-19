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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await new Promise((resolve) =>
  //       setTimeout(
  //         () =>
  //           resolve([
  //             { account: "First account", balance: 5836482 },
  //             { account: "Second account", balance: 15104856 },
  //             { account: "Third account", balance: 55536433 },
  //             { account: "Fourth account", balance: 1536433 },
  //             { account: "Fifth account", balance: 32957611 },
  //             { account: "Sixth account", balance: 13954414 },
  //             { account: "Seventh account", balance: 55957001 },
  //           ]),
  //         1000
  //       )
  //     );
  //     setData(response as { account: string; balance: number }[]);
  //   };

  //   fetchData();
  // }, []);

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

  const CHART_OUTER_RADIUS = 150;
  const CHART_INNER_RADIUS = 120;

  return (
    <div className="flex-grow flex-shrink basis-1 p-6 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold">{title}</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="balance"
            nameKey="account"
            cx="50%"
            cy="50%"
            outerRadius={CHART_OUTER_RADIUS}
            innerRadius={CHART_INNER_RADIUS} // Set inner radius for the hole
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default DiagramWidget;
