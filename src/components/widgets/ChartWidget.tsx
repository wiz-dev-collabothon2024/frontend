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
    if (event.button === 0) {
      // Check if the left mouse button is pressed
      setIsVibrating(true);
    }
  };

  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  const handleMouseLeave = () => {};

  const data = [
    { name: "Apr", value: 13.04 },
    { name: "May", value: 15.06 },
    { name: "Jun", value: 14.27 },
    { name: "Jul", value: 14.92 },
    { name: "Aug", value: 12.76 },
    { name: "Sep", value: 15.60 },
    { name: "Oct", value: 16.76 },
  ];

  return (
    <>
      <h2 className="ml-3 text-2xl font-bold">Stocks chart</h2>
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
