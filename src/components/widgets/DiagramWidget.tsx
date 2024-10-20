import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Widget from "../Widget";

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

const dataMock = [
  {
    account: "First account",
    balance: 5836482,
  },
  {
    account: "Second account",
    balance: 15104856,
  },
  {
    account: "Third account",
    balance: 55536433,
  },
  {
    account: "Fourth account",
    balance: 1536433,
  },
  {
    account: "Fifth account",
    balance: 32957611,
  },
  {
    account: "Sixth account",
    balance: 13954414,
  },
  {
    account: "Seventh account",
    balance: 55957001,
  },
];

const DiagramWidget: React.FC = () => {
  const [data, setData] = useState<{ account: string; balance: number }[]>([]);
  const [title, setTitle] = useState("Account Balances");

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const endpoint: string = "http://127.0.0.1:8000/api/main-balance-get";
      //   const token: string = "accessToken";
      //   const response = await fetch(endpoint, {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`, // Add Bearer token here
      //       "Content-Type": "application/json", // Optional, depending on your backend requirements
      //     },
      //     mode: "cors",
      //   });
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch data");
      //   }
      //   const result = await response.json();
      //   setData(result); // Ensure your backend data matches the expected format
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
      setData(dataMock);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="balance"
            nameKey="account"
            cx="40%"
            cy="50%"
            outerRadius="80%"
            innerRadius="60%"
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
            iconType="circle"
            align="right"
            verticalAlign="middle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default DiagramWidget;
