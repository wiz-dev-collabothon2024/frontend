import React, { useState } from "react";
import { useDrag } from "react-dnd";

// Import images directly
import chartImg from "@/assets/menu/chart.png";
import financeImg from "@/assets/menu/finance.png";
import serverDowntimeImg from "@/assets/menu/server_downtime.png";
import emailsImg from "@/assets/mail.png";
import stocksImg from "@/assets/graph.png";
import forexImg from "@/assets/exchange.png";
import loanImg from "@/assets/personal.png";
import gameImg from "@/assets/console.png";

interface WidgetMenuProps {
  availableWidgets: { id: string; name: string }[];
  onWidgetRemove: (id: string) => void;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({
  availableWidgets,
  onWidgetRemove,
}) => {
  return (
    <div className="bg-gradient-to-t from-[#d6ecef] to-[#dbf3df] p-4 rounded-xl shadow-lg w-auto space-y-3">
      {availableWidgets.length === 0 ? (
        <p>No available widgets</p>
      ) : (
        availableWidgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            title={widget.name}
            onWidgetRemove={onWidgetRemove}
          />
        ))
      )}
    </div>
  );
};

interface DraggableWidgetProps {
  id: string;
  title: string;
  onWidgetRemove: (id: string) => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  title,
  onWidgetRemove,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        onWidgetRemove(item.id); // Remove from menu after drop
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [isVibrating, setIsVibrating] = useState(false);

  const handleMouseDown = () => {
    setIsVibrating(true);
  };

  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  // Map images based on widget title
  const getImageForWidget = (title: string) => {
    switch (title) {
      case "Diagram Widget":
        return chartImg;
      case "Downtime Widget":
        return serverDowntimeImg;
      case "Chart Widget":
        return chartImg;
      case "Forex Widget":
        return forexImg;
      case "Loan Widget":
        return loanImg;
      case "Emails Widget":
        return emailsImg;
      case "Stocks Chart Widget":
        return stocksImg;
      case "Game Widget":
        return gameImg;
      default:
        return financeImg; // Fallback image if any
    }
  };

  return (
    <div
      ref={drag}
      className={`flex items-center space-x-4 p-4 cursor-move bg-white rounded-lg shadow-md hover:shadow-lg transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src={getImageForWidget(title)} alt={title} className="w-8 h-8" />

      <p className="text-primary font-semibold">{title}</p>
    </div>
  );
};

export default WidgetMenu;
