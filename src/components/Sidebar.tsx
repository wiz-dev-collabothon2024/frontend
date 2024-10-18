import React from "react";
import { useDrag } from "react-dnd";

const Sidebar = () => {
  const availableWidgets = [
    { id: "chart", title: "Chart Widget" },
    { id: "table", title: "Table Widget" },
    { id: "map", title: "Map Widget" },
  ];

  return (
    <div className="p-8 bg-gray-200 min-h-screen w-1/4">
      <h2 className="text-xl font-bold mb-4">Available Widgets</h2>
      {availableWidgets.map((widget) => (
        <SidebarWidget key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

const SidebarWidget = ({ widget }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "WIDGET",
    item: { id: widget.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 mb-2 bg-white shadow-sm rounded-lg ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {widget.title}
    </div>
  );
};

export default Sidebar;
