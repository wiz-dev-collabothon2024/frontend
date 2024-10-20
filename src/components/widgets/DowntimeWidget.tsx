import React, { useState } from "react";

const StatusWidget: React.FC = () => {
  // Mocked data for the ETA and service state for each service
  const services = [
    { name: "Corporate-payments", status: "up" },
    { name: "Securities", status: "fatal", eta: "6h" },
    { name: "Customers", status: "issues", eta: "2h" },
    { name: "Swift GPI Transactions", status: "up" },
  ];

  // State to control the visibility of the question mark tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to get the color of the circles based on the service state
  const getCircleColors = (serviceState: "up" | "issues" | "fatal") => {
    switch (serviceState) {
      case "up":
        return ["bg-green-500", "bg-green-500", "bg-green-500"];
      case "issues":
        return ["bg-orange-500", "bg-orange-500", "border border-gray-400"];
      case "fatal":
        return [
          "bg-red-500",
          "border border-gray-400",
          "border border-gray-400",
        ];
      default:
        return [
          "border border-gray-400",
          "border border-gray-400",
          "border border-gray-400",
        ];
    }
  };

  // Calculate the sum of the times from services with ETA
  const totalEstimatedTime = services
    .filter((service) => service.eta)
    .reduce((sum, service) => sum + parseInt(service.eta || "0"), 0);

  return (
    <div className="relative">
      {/* Header with Servers State and question mark */}
      <div className="flex items-center mb-1 space-x-5">
        <h2 className="text-3xl font-semibold text-[#274340] py-1">Servers State</h2>
        <div
          className="bg-[#274340] w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer ml-1"
          onClick={() => setShowTooltip(!showTooltip)}
        >
          <span className="text-white font-bold">?</span>
        </div>
      </div>

      {/* Tooltip showing total time */}
      {showTooltip && (
        <div className="absolute top-0 left-0 mt-8 p-4 bg-gray-800 text-white rounded-md shadow-lg opacity-90 z-10">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-[#55706d]">Service is working properly</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span>Service has some minor issues</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span>Service has a critical error</span>
          </div>
          <br></br>
          <div className="flex items-center">
            <span className="text-[#55706d]">
              ~h* Estimated time to fix an incident
            </span>
          </div>
        </div>
      )}

      {services.map((service, index) => {
        const circleColors = getCircleColors(
          service.status as "up" | "issues" | "fatal"
        );

        return (
          <div
            key={index}
            className="flex items-center justify-between py-0.6" // Added margin-left for indentation
          >
            <p className="text-lg font-normal text-[#55706d]">{service.name}</p>
            <div className="flex items-center space-x-2">
              {service.eta && (
                <span className="text-sm text-[#8b9392] mr-2 text-[#55706d]">
                  ~{service.eta}
                </span>
              )}
              {circleColors.map((color, idx) => (
                <div key={idx} className={`w-4 h-4 rounded-full ${color}`} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusWidget;
