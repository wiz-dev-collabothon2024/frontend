// Sidebar.js
import React from "react";
import { useDrag } from "react-dnd";

// Draggable item types
const ItemTypes = {
  WIDGET: "widget",
};

const SidebarWidget = ({ id, title, content, footer }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WIDGET,
    item: { id, title, content, footer },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "10px",
        border: "1px solid #ccc",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {title}
    </div>
  );
};

const Sidebar = ({ availableWidgets }) => {
  return (
    <div className="w-1/4 p-4 bg-card" style={{ borderRight: "1px solid #ccc" }}>
      <h3 className="mb-4">Available Widgets</h3>
      {availableWidgets.map((widget) => (
        <SidebarWidget
          key={widget.id}
          id={widget.id}
          title={widget.title}
          content={widget.content}
          footer={widget.footer}
        />
      ))}
    </div>
  );
};

export default Sidebar;
