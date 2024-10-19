import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { getAllWidgets } from "@/types/widgetRegistry"; // Import widget data

const WidgetMenu: React.FC = () => {
  const [availableWidgets, setAvailableWidgets] = useState(getAllWidgets());

  const handleWidgetRemove = (id: string) => {
    setAvailableWidgets((prevWidgets) =>
      prevWidgets.filter((widget) => widget.id !== id)
    );
  };

  return (
    <div>
      {availableWidgets.map((widget) => (
        <DraggableWidget
          key={widget.id}
          id={widget.id}
          title={widget.name}
          onWidgetRemove={handleWidgetRemove}
        />
      ))}
    </div>
  );
};

interface DraggableWidgetProps {
  id: string;
  title: string;
  onWidgetRemove: (id: string) => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  onWidgetRemove,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        onWidgetRemove(item.id); // Remove from menu after drop
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 cursor-move ${isDragging ? "bg-gray-400" : ""}`}
    >
      <p>{title}</p>
    </div>
  );
};

export default WidgetMenu;
