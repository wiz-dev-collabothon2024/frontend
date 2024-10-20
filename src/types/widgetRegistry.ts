import ChartWidget from "@/components/widgets/ChartWidget";
import DiagramWidget from "@/components/widgets/DiagramWidget";
import FinanceWidget from "@/components/widgets/FinanceWidget";
import DowntimeWidget from "@/components/widgets/DowntimeWidget";
import ForexWidget from "@/components/widgets/ForexWidget";
import { min } from "lodash";
import LoanWidget from "@/components/widgets/LoanWidget";
import CoinTapGame from "@/components/widgets/CoinTapGame";
import EmailsWidget from "@/components/widgets/EmailsWidget"; // Import the new widget

export const widgetRegistry = {
  chart: {
    name: "Stocks Chart Widget", // Add names here
    component: ChartWidget,
    defaultLayout: {
      i: "chart",
      x: 0,
      y: 0,
      w: 5,
      h: 7,
      minW: 5,
      minH: 7,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  diagram: {
    name: "Account Balances Widget", // Add names here
    component: DiagramWidget,
    defaultLayout: {
      i: "diagram",
      x: 0,
      y: 0,
      w: 5,
      h: 8,
      minW: 5,
      minH: 8,
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
      w: 13,
      h: 13,
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
      w: 3.4,
      h: 5.3,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  forex: {
    name: "Forex Widget", // Add names here
    component: ForexWidget,
    defaultLayout: {
      i: "forex",
      x: 0,
      y: 0,
      w: 4,
      h: 5,
      minW: 4,
      minH: 5,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  loan: {
    name: "Loan Widget", // Add names here
    component: LoanWidget,
    defaultLayout: {
      i: "loan",
      x: 0,
      y: 0,
      w: 4,
      h: 7,
      isResizable: false,
      isDraggable: true,
      preventCollision: true,
    },
  },
  hamster: {
    name: "Game Widget", // Add names here
    component: CoinTapGame,
    defaultLayout: {
      i: "coin",
      x: 0,
      y: 0,
      w: 5,
      h: 7,
    },
    isResizable: false,
    isDraggable: true,
    preventCollision: true,
  },
  emails: {
    name: "Emails Widget", // Add names here
    component: EmailsWidget,
    defaultLayout: {
      i: "emails",
      x: 0,
      y: 0,
      w: 4,
      h: 4.5,
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
