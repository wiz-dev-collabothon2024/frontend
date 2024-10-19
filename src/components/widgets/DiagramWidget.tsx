import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface DiagramWidgetProps {
  title: string;
  data: { account: string; balance: number }[];
}

const DiagramWidget: React.FC<DiagramWidgetProps> = ({ title, data }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <div
        className="chart-container"
        style={{ width: "100%", height: "300px" }}
      >
        <BarChart
          width={400}
          height={300}
          data={data}
          style={{ width: "100%", height: "100%" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="account" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="balance" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default DiagramWidget;
