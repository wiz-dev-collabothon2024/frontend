import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartWidgetProps {
  title: string;
  data: { name: string; value: number }[];
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ title, data }) => {
  return (
    <div className="flex-grow flex-shrink basis-1 p-6 m-4 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <div
        className="chart-container"
        style={{ width: "100%", height: "200px" }}
      >
        <LineChart
          width={400}
          height={200}
          data={data}
          style={{ width: "100%", height: "100%" }}
        >
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartWidget;
