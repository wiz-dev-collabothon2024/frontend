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
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div className="">
      {/* Sliding Menu */}
      <div
        className={
          "transition-all duration-500 overflow-hidden max-h-96 opacity-100"
        }
      >
        <div className="bg-gray-200 p-4 mt-2">
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
      </div>
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
