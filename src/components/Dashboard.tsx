import React, { useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { getWidgetById } from "@/types/widgetRegistry";
import "@/globals.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<
    { id: string; layout: Layout; component: React.FC }[]
  >([]);

  const [, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item: { id: string }) => {
      const widgetData = getWidgetById(item.id);
      if (widgetData && !widgets.find((widget) => widget.id === item.id)) {
        setWidgets((prev) => [
          ...prev,
          {
            id: item.id,
            layout: {
              ...widgetData.defaultLayout,
              x: 0,
              y: 0,
            },
            component: widgetData.component,
          },
        ]);
      }
    },
  }));

  // Capture layout changes during drag and resize
  const handleLayoutChange = (newLayout: Layout[]) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const updatedLayout = newLayout.find(
          (layout) => layout.i === widget.id
        );
        return updatedLayout ? { ...widget, layout: updatedLayout } : widget;
      })
    );
  };

  // Capture final position after drag stops
  const handleDragStop = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout
  ) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === newItem.i ? { ...widget, layout: newItem } : widget
      )
    );
  };

  return (
    <div ref={drop} className="p-8 bg-gray-100 min-h-screen w-3/4 m-auto">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 14, md: 12, sm: 8, xs: 4, xxs: 2 }}
        rowHeight={30}
        isDraggable
        layouts={{ lg: widgets.map((widget) => widget.layout) }}
        onLayoutChange={handleLayoutChange}
        onDragStop={handleDragStop}
      >
        {widgets.map(({ id, layout, component: WidgetComponent }) => (
          <div key={id} data-grid={layout}>
            <WidgetComponent />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
