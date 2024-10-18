import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Widget from "./Widget";
import { useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Draggable item types
const ItemTypes = {
  WIDGET: "widget",
};

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const Dashboard: React.FC = () => {
  const [layout, setLayout] = useState<LayoutItem[]>([]);

  const [, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item: { id: string }) => {
      const newLayout: LayoutItem = {
        i: item.id,
        x: layout.length % 12, // Simple logic to place the widget
        y: Math.floor(layout.length / 12), // Move to the next row after 12 widgets
        w: 2,
        h: 4,
      };
      setLayout((prev) => [...prev, newLayout]);
    },
  }));

  const handleLayoutChange = (newLayout: LayoutItem[]) => {
    setLayout(newLayout);
  };

  return (
    <div ref={drop} className="p-8 bg-gray-100 min-h-screen w-full">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange} // Handle layout changes
      >
        {layout.map((item) => (
          <div key={item.i}>
            <Widget title={item.i} content={`Content for ${item.i}`} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
