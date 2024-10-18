import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const layout = [
    { i: "users", x: 0, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "revenue", x: 2, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "notifications", x: 4, y: 0, w: 2, h: 4, minW: 2, minH: 4 },
    { i: "performance", x: 0, y: 2, w: 4, h: 4, minW: 2, minH: 4 },
  ];

  const layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xs: layout,
    xxs: layout,
  };

  return (
    <div className="p-8 bg-background min-h-screen w-1/2 m-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
        rowHeight={30}
        isDraggable={true}
        isResizable={true}
      >
        <div key="users">
          <Widget
            title="Users"
            content="1,234 Users"
            footer="Updated 10 mins ago"
          />
        </div>
        <div key="revenue" style={{ width: "100%", height: "100%" }}>
          <Widget
            title="Revenue"
            content="$12,345"
            footer="Updated 5 mins ago"
          />
        </div>
        <div key="notifications" style={{ width: "100%", height: "100%" }}>
          <Widget
            title="Notifications"
            content="3 new notifications"
            footer="Updated 20 mins ago"
          />
        </div>
        <div key="performance" style={{ width: "100%", height: "100%" }}>
          <Widget
            title="Performance"
            content="Good Performance"
            footer="Last updated: 1 hour ago"
          />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
