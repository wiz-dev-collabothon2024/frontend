// Dashboard.js
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import Sidebar from "./Sidebar"; // Import Sidebar
import { useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Draggable item types
const ItemTypes = {
  WIDGET: "widget",
};

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { i: "users", x: 0, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "revenue", x: 2, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "notifications", x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "performance", x: 0, y: 2, w: 4, h: 4, minW: 2, minH: 4 },
  ]);

  const [availableWidgets, setAvailableWidgets] = useState([
    { id: "sales", title: "Sales", content: "$10,000", footer: "Updated 1 hr ago" },
    { id: "traffic", title: "Traffic", content: "1,234 Visitors", footer: "Updated 15 mins ago" },
  ]);

  const layouts = {
    lg: widgets,
    md: widgets,
    sm: widgets,
    xs: widgets,
    xxs: widgets,
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop: (item) => {
      const newWidget = {
        i: item.id,
        x: 0,
        y: Infinity, // places it at the bottom
        w: 2,
        h: 4,
        minW: 2,
        minH: 4,
      };
      setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
      setAvailableWidgets((prev) =>
        prev.filter((widget) => widget.id !== item.id)
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="p-8 bg-background min-h-screen w-full flex">
      {/* Sidebar */}
      <Sidebar availableWidgets={availableWidgets} />

      {/* Dashboard */}
      <div className="w-3/4 p-4" ref={drop} style={{ border: "1px solid #ccc" }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
          rowHeight={30}
          isDraggable={true}
          isResizable={true}
        >
          {widgets.map((widget) => (
            <div key={widget.i} style={{ width: "100%", height: "100%" }}>
              <Widget
                title={widget.i.charAt(0).toUpperCase() + widget.i.slice(1)}
                content={widget.i === "users" ? "1,234 Users" : widget.i === "revenue" ? "$12,345" : "Good Performance"}
                footer={widget.i === "users" ? "Updated 10 mins ago" : "Updated 1 hour ago"}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default Dashboard;
