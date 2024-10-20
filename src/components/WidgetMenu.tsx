import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface WidgetMenuProps {
  availableWidgets: { id: string; name: string }[];
  onWidgetRemove: (id: string) => void;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({
  availableWidgets,
  onWidgetRemove,
}) => {
  return (
    <div className="flex flex-col space-y-3 bg-gradient-to-t from-[#d6ecef] to-[#dbf3df] p-4 rounded-xl shadow-lg">
      {availableWidgets.length === 0 ? (
        <p>No available widgets</p>
      ) : (
        availableWidgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            title={widget.name}
            onWidgetRemove={onWidgetRemove}
          />
        ))
      )}
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

  const [isVibrating, setIsVibrating] = useState(false);

  const handleMouseDown = () => {
    setIsVibrating(true);
  };

  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  // Map images based on widget title
  const getImageForWidget = (title: string) => {
    switch (title) {
      case "Servers State":
        return "server.png";
      case "DownTime":
        return "downtime.png";
      case "Diagram":
        return "chart.png";
      case "Finance":
        return "finance.png";
      case "Prediction":
        return "prediction.png";
      default:
        return "default.png"; // Fallback image
    }
  };

  return (
    <div
      ref={drag}
      className={`flex items-center space-x-4 p-4 cursor-move bg-white rounded-lg shadow-md hover:shadow-lg transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img
        src={`/menu/${getImageForWidget(title)}`}
        alt={title}
        className="w-8 h-8"
      />
      <p className="text-primary font-semibold">{title}</p>
    </div>
  );
};

export default WidgetMenu;
