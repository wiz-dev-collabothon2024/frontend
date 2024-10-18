import React from "react";

interface WidgetProps {
  title: string;
  content: React.ReactNode;
  footer?: string;
  icon?: React.ReactNode;
  isEditing?: boolean; // Pass the editing mode state
  deleteWidget?: () => void; // Function to delete the widget
}

const Widget: React.FC<WidgetProps> = ({ title, content, footer, icon, isEditing, deleteWidget }) => {
  return (
    <div className="flex-grow flex-shrink basis-1 p-6 m-4 w-auto h-full rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        {icon && <div className="text-4xl">{icon}</div>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="mb-4">{content}</div>
      {footer && <div className="text-sm text-blue-500">{footer}</div>}
    </div>
  );
};

export default Widget;
