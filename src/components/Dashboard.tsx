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

  // React DnD drop handler
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
              x: 0, // Reset position on drop
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
    <div ref={drop} className="p-8 bg-gray-100 min-h-screen w-full">
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
        isDraggable
        isResizable
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
