import React, { useMemo, useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { getWidgetById } from "@/types/widgetRegistry";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardProps {
  widgets: { id: string; layout: Layout; component: React.FC }[];
  onWidgetRemove: (id: string) => void;
  onWidgetAdd: (id: string, layout: Layout, component: React.FC) => void;
  onLayoutChange: (layout: Layout[]) => void;
  isMenuVisible: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  widgets,
  onWidgetRemove,
  onWidgetAdd,
  onLayoutChange,
  isMenuVisible,
}) => {
  const [layout, setLayout] = useState<Layout[]>(
    widgets.map((widget) => ({ ...widget.layout, i: widget.id }))
  );
  const [draggingWidget, setDraggingWidget] = useState<null | string>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",
    hover: (item: { id: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const containerBounds = document
        .querySelector(".layout")
        ?.getBoundingClientRect();

      if (clientOffset && containerBounds) {
        const gridX = Math.floor(
          (clientOffset.x - containerBounds.left) / (containerBounds.width / 14)
        );
        const gridY = Math.floor((clientOffset.y - containerBounds.top) / 30);

        const ghostLayout = {
          i: item.id,
          x: Math.max(0, gridX),
          y: Math.max(0, gridY),
          w: 5,
          h: 3,
        };

        setDraggingWidget(item.id);
        setLayout((prevLayout) => [
          ...prevLayout.filter((l) => l.i !== item.id),
          ghostLayout,
        ]);
      }
    },
    drop: (item: { id: string }, monitor) => {
      const widgetData = getWidgetById(item.id);
      if (widgetData && !widgets.find((widget) => widget.id === item.id)) {
        const clientOffset = monitor.getClientOffset();
        const containerBounds = document
          .querySelector(".layout")
          ?.getBoundingClientRect();

        if (clientOffset && containerBounds) {
          const gridX = Math.floor(
            (clientOffset.x - containerBounds.left) /
              (containerBounds.width / 14)
          );
          const gridY = Math.floor((clientOffset.y - containerBounds.top) / 30);

          onWidgetAdd(
            item.id,
            {
              ...widgetData.defaultLayout,
              x: Math.max(0, gridX),
              y: Math.max(0, gridY),
            },
            widgetData.component
          );
        }
      }
      setDraggingWidget(null);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  const memoizedGridLayout = useMemo(() => {
    return (
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 14, md: 12, sm: 8, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={{ lg: layout }}
        onLayoutChange={handleLayoutChange}
        useCSSTransforms={true}
        preventCollision={false}
      >
        {widgets.map(({ id, layout, component: WidgetComponent }) => (
          <div key={id} data-grid={layout} className="relative">
            <WidgetComponent />
            {isMenuVisible && (
              <button
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onWidgetRemove(id);
                }}
                data-no-drag
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Render the ghost widget only if it's being dragged over the dashboard */}
        {draggingWidget && isOver && (
          <div
            key={draggingWidget}
            data-grid={layout.find((l) => l.i === draggingWidget)}
            className="relative opacity-50"
          >
            <div className="bg-gray-300 p-4">Dragging Widget...</div>
          </div>
        )}
      </ResponsiveGridLayout>
    );
  }, [
    layout,
    widgets,
    isMenuVisible,
    onWidgetRemove,
    onLayoutChange,
    draggingWidget,
    isOver,
  ]);

  return (
    <div
      ref={drop}
      className={`p-8 bg-gray-100 min-h-screen lg:w-[1300px] md:w-[1096px] sm:w-[868px] xs-[580px] m-auto ${
        isOver ? "border-2 border-dashed border-blue-500" : ""
      }`}
    >
      {memoizedGridLayout}
    </div>
  );
};

export default Dashboard;
