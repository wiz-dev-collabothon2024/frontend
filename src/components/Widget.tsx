import React from "react";
import "../globals.css"; // Adjust the path according to your project structure

interface WidgetProps {
  className: string;

  title: string;

  content: string;

  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, content }) => {
  return (
    <div className="m-2 rounded-xl w-auto overflow-hidden shadow-lg p-4">
      <h1 className="font-bold text-xl mb-2">{title}</h1>
      <p className="text-gray-700 text-base">{content}</p>
    </div>
  );
};

export default Widget;
