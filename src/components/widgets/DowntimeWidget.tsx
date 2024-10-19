import React from "react";

const StatusWidget: React.FC = () => {
  // Mocked data for the status message and ETA
  const statusMessage = "The service is down";
  const etaMessage = "ETA: approx. 2h";

  return (
    <div className="flex flex-col items-center p-6 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="flex items-center mb-4">
        <div
          className="w-10 h-10 rounded-full bg-orange-500 mr-4"
          style={{
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div className="text-center flex-grow">
          <p className="text-lg font-bold">{statusMessage}</p>
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-auto">
        <p>{etaMessage}</p>
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
