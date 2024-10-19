import React, { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Widget from "../Widget";

const data = [
  { name: "Jan", inflow: 4048916, outflow: 3541021 },
  { name: "Feb", inflow: 4539844, outflow: 4388736 },
  { name: "Mar", inflow: 4839006, outflow: 4436615 },
  { name: "Apr", inflow: 5336000, outflow: 5306615 },
  { name: "May", inflow: 6305000, outflow: 4836705 },
  { name: "Jun", inflow: 4836705, outflow: 4836705 },
];

const tableData = [
  {
    category: "Cash balance at the beginning of the month",
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
    jan: "0",
    feb: "0",
    mar: "0",
    apr: "0",
    may: "0",
    jun: "0",
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
          <div style={{ flex: 1 }}></div>
          {/* Right Column (BarChart) */}
          <div style={{ flex: 5 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} barSize={20}>
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
                <Legend />
                <Bar dataKey="inflow" name="Cash Inflow">
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
                <Bar dataKey="outflow" name="Cash Outflow">
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
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{ display: "flex", flex: "1 1 auto", overflow: "hidden" }}
        >
          {/* Left Column ("Category" column) */}
          <div
            style={{ flex: 1, overflowY: "auto" }}
            ref={leftTableRef}
            onScroll={handleScroll}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 sticky top-0 bg-white">Category</th>
                </tr>
              </thead>
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
              overflowX: "auto",
              overflowY: "auto",
              paddingLeft: "76px", // Adjust the value as needed
            }}
            ref={rightTableRef}
            onScroll={handleScroll}
          >
            <table className="w-full border-collapse text-left">
              <thead>
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
              </thead>
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
