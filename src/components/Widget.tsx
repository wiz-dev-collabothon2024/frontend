import React, { useState } from "react";

interface WidgetProps {
  children: React.ReactNode;
  onRemove?: () => void; // Add a prop for handling widget removal
}

const Widget: React.FC<WidgetProps> = ({ children, onRemove }) => {
  const [isVibrating, setIsVibrating] = useState(false);

  // Trigger vibration when the left mouse button is pressed
  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 0) {
      // 0 means the left mouse button
      setIsVibrating(true);
    }
  };

  // Stop vibration when the mouse button is released
  const handleMouseUp = () => {
    setIsVibrating(false);
  };

  // Stop vibration when the mouse leaves the widget
  const handleMouseLeave = () => {
    // setIsVibrating(false);
  };

  return (
    <div
      className={`flex-grow shadow-xl text-primary select-none flex-shrink basis-1 p-6 w-auto h-full rounded-lg border bg-card font-sans rounded-[40px]${
        isVibrating ? "vibrate_small" : ""
      }`} // Removed scale and hover effects
      onMouseDown={handleMouseDown} // Start vibrating when LMB is pressed
      onMouseUp={handleMouseUp} // Stop vibrating on mouse up
      onMouseLeave={handleMouseLeave} // Stop vibrating on mouse leave
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
