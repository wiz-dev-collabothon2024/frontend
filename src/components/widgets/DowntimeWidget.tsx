import React, { useState } from "react";
import Widget from "../Widget";

const StatusWidget: React.FC = () => {
  const etaMessage = "ETA: approx. 2h";
  const [serviceState, setServiceState] = useState<"up" | "issues" | "fatal">(
    "issues"
  );

  const getCircleColors = () => {
    switch (serviceState) {
      case "up":
        return ["bg-green-500", "bg-green-500", "bg-green-500"];
      case "issues":
        return ["bg-orange-500", "bg-orange-500", "bg-gray-400"];
      case "fatal":
        return ["bg-red-500", "bg-gray-400", "bg-gray-400"];
      default:
        return ["bg-gray-400", "bg-gray-400", "bg-gray-400"];
    }
  };

  const statusMessage =
    serviceState === "up"
      ? "The service is up"
      : serviceState === "issues"
      ? "The service is down"
      : "Service error: fatal";

  const circleColors = getCircleColors();

  return (
    <Widget>
      <div className="text-center">
        <p className="text-lg font-bold">{statusMessage}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-2">
          {circleColors.map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${color}`}
              style={{ animation: "pulse 3s ease-in-out infinite" }}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600">
          <p>{etaMessage}</p>
        </div>
      </div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.7); }
          }
        `}
      </style>
    </Widget>
  );
};

export default StatusWidget;
