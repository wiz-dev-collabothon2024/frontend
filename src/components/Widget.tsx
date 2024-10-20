import React, { useState } from "react";

interface WidgetProps {
  children: React.ReactNode;
  onRemove?: () => void;
}

const Widget: React.FC<WidgetProps> = ({ children, onRemove }) => {
  const [isVibrating, setIsVibrating] = useState(false);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0) {
      setIsVibrating(true);
    }
  };

  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  const handleMouseLeave = () => {
    // setIsVibrating(false); // Ensure vibration stops when the mouse leaves
  };

  return (
    <div
      className={`relative flex-grow shadow-xl text-primary select-none flex-shrink basis-1 p-6 w-auto h-full rounded-lg border bg-card font-sans rounded-[45px] ${
        isVibrating ? "vibrate_small" : ""
      }`} // Apply the vibration class when `isVibrating` is true
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {onRemove && (
        <button
          className="absolute top-0 right-0 text-primary p-1"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default Widget;
