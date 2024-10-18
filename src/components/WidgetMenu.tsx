import React, { useState } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd"; // Import the correct type
import Widget from "./Widget";

interface WidgetData {
  id: string;
  title: string;
  content: string;
}

interface WidgetMenuProps {
  onWidgetDrop: (id: string) => void;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({ onWidgetDrop }) => {
  const initialWidgets: WidgetData[] = [
    { id: "users", title: "Users", content: "1,234 Users" },
    { id: "revenue", title: "Revenue", content: "$12,345" },
    {
      id: "notifications",
      title: "Notifications",
      content: "3 new notifications",
    },
    { id: "performance", title: "Performance", content: "Good Performance" },
  ];

  const [widgets, setWidgets] = useState<WidgetData[]>(initialWidgets);

  const handleDrop = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
    onWidgetDrop(id); // Notify the dashboard that a widget has been dropped
  };

  return (
    <div>
      {widgets.map((widget) => (
        <DraggableWidget key={widget.id} widget={widget} onDrop={handleDrop} />
      ))}
    </div>
  );
};

interface DraggableWidgetProps {
  widget: WidgetData;
  onDrop: (id: string) => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  widget,
  onDrop,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id: widget.id },
    end: (item: { id: string }, monitor: DragSourceMonitor) => {
      if (monitor.didDrop()) {
        onDrop(item.id);
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 cursor-move ${isDragging ? "bg-gray-400" : ""}`}
    >
      <Widget title={widget.title} content={widget.content} />
    </div>
  );
};

export default WidgetMenu;
