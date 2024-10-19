import React, { useState } from "react";
import "./CoinWidget.css";

const coinImagePath = "src/assets/tempCoin.jpg";

const CoinWidget: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 500); // Duration matches the CSS animation
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div className="widget-container flex justify-center items-center border rounded-lg">
      <div
        className={`coin-container ${isSpinning ? "spin-vertical" : ""}`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label="Clickable coin"
      >
        <img
          src={coinImagePath}
          alt="Clickable coin"
          className="coin-image"
        />
      </div>
    </div>
  );
};

export default CoinWidget;
