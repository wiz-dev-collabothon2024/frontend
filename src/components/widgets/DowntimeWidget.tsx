import React, { useState } from "react";

const StatusWidget: React.FC = () => {
  // Mocked data for the ETA and service state
  const etaMessage = "ETA: approx. 2h";

  // State to control the service status
  const [serviceState, setServiceState] = useState<"up" | "issues" | "fatal">(
    "issues"
  );

  // Function to get the color of the circles based on the service state
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

  // Determine the status message based on the service state
  const statusMessage =
    serviceState === "up"
      ? "The service is up"
      : serviceState === "issues"
      ? "The service is down"
      : "Service error: fatal";

  const circleColors = getCircleColors();

  return (
    <div className="flex items-center justify-between p-6 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="text-center flex-grow">
        <p className="text-lg font-bold">{statusMessage}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-2">
          {circleColors.map((color, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${color}`}
              style={{
                animation: "pulse 3s ease-in-out infinite",
              }}
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
    </div>
  );
};

export default StatusWidget;
