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
    <div>
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

  return (
    <div
      ref={drag}
      className={`p-2 cursor-move ${isDragging ? "bg-gray-400" : ""} ${
        isVibrating ? "vibrate" : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <p>{title}</p>
    </div>
  );
};

export default WidgetMenu;
