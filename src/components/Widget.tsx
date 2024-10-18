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
    <div className="flex-grow flex-shrink basis-1 p-6 m-4 w-auto h-full rounded-lg border bg-card text-card-foreground shadow-sm relative">
      {isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop the drag event from triggering
            if (deleteWidget) deleteWidget(); // Call delete if defined
          }}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
        >
          ✖️
        </button>
      )}
      <div className="flex items-center space-x-4 mb-4">
        {icon && <div className="text-4xl">{icon}</div>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className=" mb-4">{content}</div>
      {footer && <div className="text-sm text-primary">{footer}</div>}
    </div>
  );
};

export default Widget;
