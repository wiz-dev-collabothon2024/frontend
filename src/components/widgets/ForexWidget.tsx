import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { currency: "USD", buy: 0.9, sell: 1.1},
  { currency: "GBP", buy: 1.2, sell: 1.4},
  { currency: "PLN", buy: 0.2, sell: 0.3},
];

const tableData = [
  {
    category: "Cash balance at the beginning of the month",
    value: "4,116,898",
  },
  { category: "Cash inflow", value: "4,839,006", percentage: "67%" },
  {
    subCategory: "Cash Inflow from Sales",
    value: "3,939,006",
    percentage: "63%",
  },
  { subCategory: "Loans", value: "900,000", percentage: "45%" },
  { category: "Cash outflow", value: "4,436,615", percentage: "40%" },
  { subCategory: "Suppliers", value: "2,290,225", percentage: "17%" },
  { subCategory: "ACME Inc.", value: "296,432", percentage: "8%" },
];

// const [buyRate, setBuyRate] = useState<number | null>(null);
// const [sellRate, setSellRate] = useState<number | null>(null);
const buyRate = 0.9;
const sellRate = 1.1;

const ForexWidget: React.FC = () => {
  return (
    <div className="widget-container p-3 w-full  rounded-lg border bg-white text-gray-800 shadow-sm flex flex-col">
      <h2 className="text-lg font-bold mb-4">Currency Exchange Rates</h2>
      <div className="flex justify-between items-start">
        {/* Buy Box */}
        <div className="flex flex-col items-center flex-1 bg-green-100 rounded-lg">
          <span className="text-xl font-semibold">Buy</span>
          <span className="mt-auto text-2xl font-bold">
            {buyRate ? buyRate.toFixed(4) : "Loading..."}
          </span>
        </div>
        {/* Sell Box */}
        <div className="flex flex-col items-center flex-1 bg-red-100 rounded-lg">
          <span className="text-xl font-semibold">Sell</span>
          <span className="mt-auto text-2xl font-bold">
            {sellRate ? sellRate.toFixed(4) : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForexWidget;
