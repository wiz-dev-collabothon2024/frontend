import React, { useMemo, useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { getWidgetById } from "@/types/widgetRegistry";
import Widget from "@/components/Widget"; // Implied import for Widget component

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
  const [draggingWidget, setDraggingWidget] = useState<null | string>(null); // To visualize dragging
  const cols: number = 12;
  // Use Drop to handle dropping widgets from the WidgetMenu
  const [{ isOver }, drop] = useDrop({
    accept: "WIDGET",
    hover: (item: { id: string }, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const containerBounds = document
        .querySelector(".layout")
        ?.getBoundingClientRect();

      if (clientOffset && containerBounds) {
        const gridX = Math.floor(
          (clientOffset.x - containerBounds.left) /
            (containerBounds.width / cols)
        );
        const gridY = Math.floor((clientOffset.y - containerBounds.top) / 30);

        const placeholderLayout = {
          i: item.id,
          x: Math.max(0, gridX),
          y: Math.max(0, gridY),
          w: 5,
          h: 3,
        };

        setDraggingWidget(item.id); // Set dragging widget to visualize it
        setLayout((prevLayout) => [
          ...prevLayout.filter((l) => l.i !== item.id),
          placeholderLayout,
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
              (containerBounds.width / cols)
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
      setDraggingWidget(null); // Reset dragging state on drop
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const disableDraggableOnHover = (id: string, disable: boolean) => {
    setLayout((prevLayout) =>
      prevLayout.map((widgetLayout) =>
        widgetLayout.i === id
          ? { ...widgetLayout, isDraggable: !disable }
          : widgetLayout
      )
    );
  };
  const handleWidgetRemove = (id: string) => {
    onWidgetRemove(id); // Remove the widget
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange(newLayout); // Update layout in the parent
  };

  // Dynamically update the draggable and resizable states based on `isMenuVisible`
  const updatedLayout = useMemo(
    () =>
      layout.map((widgetLayout) => ({
        ...widgetLayout,
        isDraggable: isMenuVisible, // Draggable only when the menu is visible
        isResizable: isMenuVisible, // Resizable only when the menu is visible
      })),
    [layout, isMenuVisible]
  );

  // Render the grid layout with draggable/resizable widgets
  const memoizedGridLayout = useMemo(() => {
    return (
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1400, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: cols, md: 12, sm: 8, xs: 4, xxs: 2 }}
        rowHeight={30}
        layouts={{ lg: updatedLayout }}
        onLayoutChange={handleLayoutChange}
        useCSSTransforms={true}
        preventCollision={false}
      >
        {widgets.map(({ id, layout, component: WidgetComponent }) => (
          <div
            key={id}
            data-grid={{
              ...layout,
              isDraggable: isMenuVisible,
            }}
            className="relative"
          >
            <Widget>
              <WidgetComponent />
              {isMenuVisible && (
                <button
                  className="absolute top-5 right-4 text-[#8b9392] hover:text-gray-700 p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWidgetRemove(id);
                  }}
                  onMouseEnter={() => disableDraggableOnHover(id, true)}
                  onMouseLeave={() => disableDraggableOnHover(id, false)}
                  data-no-drag
                >
                  <span className="text-[21px] font-bold">X</span>
                </button>
              )}
            </Widget>
          </div>
        ))}

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
    updatedLayout,
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
      className="m-auto w-full min-h-screen lg:w-[1400px] md:w-[1096px] sm:w-[868px] xs-[580px]"
    >
      {memoizedGridLayout}
    </div>
  );
};

export default Dashboard;
