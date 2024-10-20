import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ff0000",
  "#f78e1e",
  "#ffc000",
  "#d7f3ff",
  "#0070c0",
  "#7030a0",
  "#32b347",
  "#5eff1f",
];

const dataMock = [
  {
    account: "Deposits",
    balance: 1245,
  },
  {
    account: "Stocks",
    balance: 12005,
  },
  {
    account: "Investment Products",
    balance: 7890,
  },
  {
    account: "Loans",
    balance: 4567,
  },
  {
    account: "Other accounts",
    balance: 1234,
  },
  {
    account: "Accounts",
    balance: 13008,
  },
  {
    account: "Credit Cards",
    balance: 5678,
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
