import React from "react";

interface WidgetProps {
  title: string;
  content: React.ReactNode;
  footer?: string;
  icon?: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, content, footer, icon }) => {
  return (
    <div className="flex-grow flex-shrink basis-1 p-6 m-4 w-auto h-full rounded-lg border bg-card text-card-foreground shadow-sm">
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
