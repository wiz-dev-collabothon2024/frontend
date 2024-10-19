import ChartWidget from "@/components/widgets/ChartWidget";
import DiagramWidget from "@/components/widgets/DiagramWidget";

export const widgetRegistry = {
  chart: {
    component: ChartWidget,
    defaultLayout: {
      i: "chart",
      x: 0,
      y: 0,
      w: 5,
      h: 7,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  diagram: {
    component: DiagramWidget,
    defaultLayout: {
      i: "diagram",
      x: 0,
      y: 0,
      w: 5,
      h: 7,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
};

type WidgetKey = keyof typeof widgetRegistry;

export const getWidgetById = (id: WidgetKey) => widgetRegistry[id];
