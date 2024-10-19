import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DiagramWidget: React.FC = () => {
  const [data, setData] = useState<{ account: string; balance: number }[]>([]);
  const [title, setTitle] = useState("Account Balances");

  useEffect(() => {
    const fetchData = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { account: "First account", balance: 5836482 },
              { account: "Second account", balance: 15104856 },
              { account: "Third account", balance: 55536433 },
              { account: "Fourth account", balance: 1536433 },
              { account: "Fifth account", balance: 32957611 },
              { account: "Sixth account", balance: 13954414 },
              { account: "Seventh account", balance: 55957001 },
            ]),
          1000
        )
      );
      setData(response as { account: string; balance: number }[]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-grow flex-shrink basis-1 p-6 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <BarChart
        width={400}
        height={200}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="account" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default DiagramWidget;
