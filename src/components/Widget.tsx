import React, { useState } from "react";

interface WidgetProps {
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ children }) => {
  return (
    <div className="flex-grow select-none flex-shrink basis-1 p-6 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm transition-transform duration-500 ease-in-out hover:scale-105">
      {children}
    </div>
  );
};

export default Widget;
