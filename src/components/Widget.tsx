// Widget.js
import React from "react";

interface WidgetProps {
  title: string;
  content: React.ReactNode;
  footer?: string;
  icon?: React.ReactNode;
  isEditing: boolean;
  deleteWidget: () => void; // Add delete function
}

const Widget: React.FC<WidgetProps> = ({ title, content, footer, icon, isEditing, deleteWidget }) => {
  return (
    <div className="flex-grow flex-shrink basis-1 p-6 m-4 w-auto h-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center space-x-4 mb-4">
        {icon && <div className="text-4xl">{icon}</div>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className=" mb-4">{content}</div>

      {footer && <div className="text-sm text-primary">{footer}</div>}

      {/* Show delete button if in editing mode */}
      {isEditing && (
        <button 
          onClick={deleteWidget} 
          className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Widget;
