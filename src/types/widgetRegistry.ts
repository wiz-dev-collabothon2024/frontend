import ChartWidget from "@/components/widgets/ChartWidget";
import DiagramWidget from "@/components/widgets/DiagramWidget";
import FinanceWidget from "@/components/widgets/FinanceWidget";
import DowntimeWidget  from "@/components/widgets/DowntimeWidget";
import ForexWidget from "@/components/widgets/ForexWidget";

export const widgetRegistry = {
  chart: {
    name: "Chart Widget", // Add names here
    component: ChartWidget,
    defaultLayout: {
      i: "chart",
      x: 0,
      y: 0,
      w: 7,
      h: 7,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  diagram: {
    name: "Diagram Widget", // Add names here
    component: DiagramWidget,
    defaultLayout: {
      i: "diagram",
      x: 0,
      y: 0,
      w: 5,
      h: 8,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  overview: {
    name: "Finance Widget", // Add names here
    component: FinanceWidget,
    defaultLayout: {
      i: "overview",
      x: 0,
      y: 0,
      w: 5,
      h: 20,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  status: {
    name: "Downtime Widget", // Add names here
    component: DowntimeWidget,
    defaultLayout: {
      i: "status",
      x: 0,
      y: 0,
      w: 5,
      h: 3,
    },
  },
  forex: {
    name: "Forex Widget", // Add names here
    component: ForexWidget,
    defaultLayout: {
      i: "overview",
      x: 0,
      y: 0,
      w: 4,
      h: 5,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
};

type WidgetKey = keyof typeof widgetRegistry;

export const getWidgetById = (id: WidgetKey) => widgetRegistry[id];
export const getAllWidgets = () =>
  Object.entries(widgetRegistry).map(([id, { name }]) => ({ id, name }));
