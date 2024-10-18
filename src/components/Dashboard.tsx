import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useDrop } from "react-dnd";
import Widget from "./Widget";
import Sidebar from "./Sidebar";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { i: "users", x: 0, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "revenue", x: 2, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "notifications", x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "performance", x: 0, y: 2, w: 4, h: 4, minW: 2, minH: 4 },
  ]);

  const layout = widgets.map((widget) => ({
    i: widget.i,
    x: widget.x,
    y: widget.y,
    w: widget.w,
    h: widget.h,
    minW: widget.minW,
    minH: widget.minH,
  }));

  const layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout,
  };

  // Handle drop from sidebar to dashboard
  const [, drop] = useDrop({
    accept: "WIDGET",
    drop: (item) => {
      // Add new widget to dashboard
      const newWidget = {
        i: item.id,
        x: (widgets.length % 6) * 2, // simple logic to place the new widget
        y: Infinity, // place at the bottom
        w: 2,
        h: 4,
        minW: 2,
        minH: 4,
      };
      setWidgets([...widgets, newWidget]);
    },
  });

  return (
    <div className="flex">
      <Sidebar />
      <div ref={drop} className="p-8 bg-background min-h-screen w-3/4">
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
            <div key={widget.i}>
              <Widget
                title={widget.i}
                content={`Content for ${widget.i}`}
                footer="Updated just now"
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default Dashboard;
