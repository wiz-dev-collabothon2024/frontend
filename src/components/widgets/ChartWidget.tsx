import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Widget from "../Widget";

const ChartWidget: React.FC = () => {
  const [isVibrating, setIsVibrating] = useState(false);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0) { // Check if the left mouse button is pressed
      setIsVibrating(true);
    }
  };

  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  const handleMouseLeave = () => {
  };

  const data = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ];

  return (
    <>
      <h2 className="text-lg font-bold">Sales Chart</h2>
      <LineChart width={400} height={200} data={data}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default ChartWidget;
