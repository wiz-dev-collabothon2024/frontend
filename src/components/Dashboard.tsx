import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useDrop } from "react-dnd";
import Widget from "./Widget";
import ChartWidget from "./widgets/ChartWidget";
import DiagramWidget from "./widgets/DiagramWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

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
        x: layout.length % 12,
        y: Math.floor(layout.length / 12),
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
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => {
          if (item.i === "chart") {
            return (
              <div key={item.i}>
                <ChartWidget
                  title="Sales Chart"
                  data={[
                    { name: "Jan", value: 4000 },
                    { name: "Feb", value: 3000 },
                    { name: "Mar", value: 2000 },
                    { name: "Apr", value: 2780 },
                    { name: "May", value: 1890 },
                    { name: "Jun", value: 2390 },
                    { name: "Jul", value: 3490 },
                  ]}
                />
              </div>
            );
          } else if (item.i === "diagram") {
            return (
              <div key={item.i}>
                <DiagramWidget
                  title="Account Balances"
                  data={[
                    { account: "First account", balance: 5836482 },
                    { account: "Second account", balance: 15104856 },
                    { account: "Third account", balance: 55536433 },
                    { account: "Fourth account", balance: 1536433 },
                    { account: "Fifth account", balance: 32957611 },
                    { account: "Sixth account", balance: 13954414 },
                    { account: "Seventh account", balance: 55957001 },
                  ]}
                />
              </div>
            );
          }
          return (
            <div key={item.i}>
              <Widget title={item.i} content={`Content for ${item.i}`} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
