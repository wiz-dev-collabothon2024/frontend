import React from "react";
import { useDrag } from "react-dnd";

const initialWidgets = [
  { id: "chart", name: "Chart Widget" },
  { id: "diagram", name: "Diagram Widget" },
];

const WidgetMenu: React.FC = () => {
  return (
    <div>
      {initialWidgets.map((widget) => (
        <DraggableWidget key={widget.id} id={widget.id} title={widget.name} />
      ))}
    </div>
  );
};

interface DraggableWidgetProps {
  id: string;
  title: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ id, title }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id },
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
