import React from "react";
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
import Widget from "../Widget";

const data = [
  { name: "Jan 23", inflow: 4048916, outflow: 3541021, balance: 4724787 },
  { name: "Feb 23", inflow: 4539844, outflow: 4388736, balance: 4015790 },
  { name: "Mar 23", inflow: 4839006, outflow: 4436615, balance: 4116898 },
  { name: "Apr 23", inflow: 5336000, outflow: 5306615, balance: 4524764 },
  { name: "May 23", inflow: 6305000, outflow: 4836705, balance: 3010059 },
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

const FinanceWidget: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold">Cash Flow Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="inflow" fill="#4CAF50" name="Cash Inflow" />
          <Bar dataKey="outflow" fill="#F44336" name="Cash Outflow" />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            name="Balance"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 overflow-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">%</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={row.subCategory ? "text-sm" : "font-bold"}
              >
                <td className={`border p-2 ${row.subCategory ? "pl-6" : ""}`}>
                  {row.category || row.subCategory}
                </td>
                <td className="border p-2">{row.value}</td>
                <td className="border p-2">{row.percentage || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FinanceWidget;
