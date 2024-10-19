import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import ChartWidget from "./widgets/ChartWidget";
import DiagramWidget from "./widgets/DiagramWidget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<{ id: string; layout: Layout }[]>([]);

  const availableWidgets = {
    chart: {
      component: ChartWidget,
      layout: {
        i: "chart",
        x: 0,
        y: 0,
        w: 5,
        h: 7,
        minW: 4,
        minH: 3,
        isResizable: false,
        isDraggable: true,
        preventCollision: true,
      },
    },
    diagram: {
      component: DiagramWidget,
      layout: {
        i: "diagram",
        x: 0,
        y: 0,
        w: 5,
        h: 8,
        minW: 4,
        minH: 3,
        isDraggable: true,
        isResizable: false,
        preventCollision: true,
      },
    },
  };

  const [, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item: { id: string }) => {
      const widgetData = availableWidgets[item.id];
      if (widgetData) {
        setWidgets((prev) => [
          ...prev,
          { id: item.id, layout: widgetData.layout },
        ]);
      }
    },
  }));

  return (
    <div ref={drop} className="p-8 bg-gray-100 min-h-screen w-full">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
        isDraggable
      >
        {widgets.map(({ id, layout }) => {
          const WidgetComponent = availableWidgets[id].component;
          return (
            <div key={id} data-grid={layout}>
              <WidgetComponent /> {/* Render the widget */}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
