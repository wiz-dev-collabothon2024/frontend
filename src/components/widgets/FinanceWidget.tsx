import React, { useState, useRef } from "react";
import {
  ComposedChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Line,
} from "recharts";
import Widget from "../Widget";
import "./FinanceWidget.css";

const startBalance = 4856898;
const data = [
  { name: "Jan", inflow: 4048916, outflow: 3541021, balance: startBalance},  // Add balance
  { name: "Feb", inflow: 5539844, outflow: 4388736, balance: startBalance + 1500000},  // Add balance
  { name: "Mar", inflow: 5390060, outflow: 4036615, balance: startBalance + 2500000},  // Add balance
  { name: "Apr", inflow: 4236000, outflow: 6306615, balance: 2932285 },   
  { name: "May", inflow: 6305000, outflow: 4836705, balance: startBalance + 1000000 },       // Add balance
  { name: "Jun", inflow: 4836705, outflow: 4836705, balance: startBalance + 1000000 },       // Add balance
];

const tableData = [
  {
    category: "Balance  ",
    jan: "4,116,898",
    feb: "4,015,790",
    mar: "4,724,787",
    apr: "4,116,898",
    may: "4,116,898",
    jun: "4,116,898",
  },
  {
    category: "Cash inflow",
    jan: "4,048,916",
    feb: "4,539,844",
    mar: "4,839,006",
    apr: "5,336,000",
    may: "6,305,000",
    jun: "4,836,705",
  },
  {
    subCategory: "Sales",
    jan: "4,048,916",
    feb: "4,539,844",
    mar: "4,839,006",
    apr: "5,336,000",
    may: "6,305,000",
    jun: "4,836,705",
  },
  {
    subCategory: "Loans",
    jan: "2,668,542",
    feb: "4,53 9,844",
    mar: "4,811,006",
    apr: "3,336,000",
    may: "6,305,123",
    jun: "4,821,705",
  },
  {
    category: "Cash outflow",
    jan: "3,541,021",
    feb: "4,388,736",
    mar: "4,436,615",
    apr: "5,306,615",
    may: "4,836,705",
    jun: "4,836,705",
  },
  {
    subCategory: "Suppliers",
    jan: "1,500,000",
    feb: "2,000,000",
    mar: "2,500,000",
    apr: "3,000,000",
    may: "3,500,000",
    jun: "4,000,000",
  },
  {
    subCategory: "ACME Inc.",
    jan: "2,041,021",
    feb: "2,388,736",
    mar: "1,936,615",
    apr: "2,306,615",
    may: "1,336,705",
    jun: "836,705",
  },
];

  // Calculate the current balance (using the last balance value)
  const currentBalance = 5856898;
  const euroSign = "€";

const FinanceWidget: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const months = ["jan", "feb", "mar", "apr", "may", "jun"];

  // Refs for synchronizing scroll
  const leftTableRef = useRef<HTMLDivElement>(null);
  const rightTableRef = useRef<HTMLDivElement>(null);

  // Synchronize vertical scrolling
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target === leftTableRef.current && rightTableRef.current) {
      rightTableRef.current.scrollTop = target.scrollTop;
    } else if (target === rightTableRef.current && leftTableRef.current) {
      leftTableRef.current.scrollTop = target.scrollTop;
    }
  };

  return (
    <Widget>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top Row */}
        <div style={{ display: "flex", flex: "0 0 auto" }}>
          {/* Left Column (Empty) */}
           {/* Left Column (New Content) */}
           <div
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* First Line: Smaller Text */}
            <div style={{ fontSize: "14px", color: "#555" }}>Current Balance</div>
            {/* Second Line: Larger, Green Text */}
            <div style={{ fontSize: "24px", color: "#4CAF50", fontWeight: "bold" }}>
              +{euroSign}
              {new Intl.NumberFormat().format(currentBalance)}
            </div>
          </div>
          {/* Right Column (BarChart) */}
          <div style={{ flex: 5 }}>
            <ResponsiveContainer 
            width="100%" 
            height={200}
            domain={[0, "auto"]}
            >
              <ComposedChart data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value / 1e6).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value) =>
                    new Intl.NumberFormat().format(value as number)
                  }
                />
                <Legend 
                
                />
                <Bar dataKey="inflow" name="Cash Inflow" fill="#4CAF50">
                  {data.map((entry, index) => {
                    const month = months[index];
                    return (
                      <Cell
                        key={`cell-inflow-${index}`}
                        fill={selectedMonth === month ? "#82ca9d" : "#4CAF50"}
                        onClick={() => setSelectedMonth(month)}
                        style={{ cursor: "pointer" }}
                      />
                    );
                  })}
                </Bar>
                <Bar dataKey="outflow" name="Cash Outflow" fill="#F44336">
                  {data.map((entry, index) => {
                    const month = months[index];
                    return (
                      <Cell
                        key={`cell-outflow-${index}`}
                        fill={selectedMonth === month ? "#FF6347" : "#F44336"}
                        onClick={() => setSelectedMonth(month)}
                        style={{ cursor: "pointer" }}
                      />
                    );
                  })}
                </Bar>
                <Line
                  type="linear"
                  dataKey="balance"
                  name="Balance"
                  stroke="#0000FF"
                  strokeDasharray="14 14"
                  strokeWidth={2}
                  dot={{ fill: "#0000FF", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{ display: "flex", flex: "1 1 auto"}}
        >
          {/* Left Column ("Category" column) */}
          <div
            style={{ flex: 1 }}
            ref={leftTableRef}
            onScroll={handleScroll}
          >
            <table className="w-full border-collapse">
              {/* <thead>
                <tr>
                  <th className="border p-2 sticky top-0 bg-white">Category</th>
                </tr>
              </thead> */}
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={row.subCategory ? "text-sm" : "font-bold"}
                  >
                    <td
                      className={`border p-2 ${row.subCategory ? "pl-6" : ""}`}
                    >
                      {row.category || row.subCategory}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Right Column (Months data columns) */}
          <div
            style={{
              flex: 5,
              paddingLeft: "76px", // Hardcoded to align, don't touch
            }}
            ref={rightTableRef}
            onScroll={handleScroll}
          >
            <table className="w-full border-collapse text-left">
              {/* <thead>
                <tr>
                  {months.map((month) => (
                    <th
                      key={month}
                      className="border p-2 capitalize sticky top-0 bg-white"
                    >
                      {month}
                    </th>
                  ))}
                </tr>
              </thead> */}
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={row.subCategory ? "text-sm" : "font-bold"}
                  >
                    {months.map((month) => (
                      <td
                        key={month}
                        className="border p-2 cursor-pointer"
                        onClick={() => setSelectedMonth(month)}
                        style={{
                          backgroundColor:
                            selectedMonth === month
                              ? "rgba(173, 216, 230, 0.5)"
                              : "white",
                        }}
                      >
                        {row[month] || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceWidget;
