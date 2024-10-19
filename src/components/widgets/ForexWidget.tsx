import React, { useState } from "react";
import CurrencyCard from "./CurrencyCard";

const currencyData = [
  { currency: "USD", buyRate: 0.9, sellRate: 1.1 },
  { currency: "GBP", buyRate: 1.2, sellRate: 1.4 },
  { currency: "PLN", buyRate: 0.2, sellRate: 0.3 },
  // Add more currencies as needed
];

const ForexWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currencyData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currencyData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentCurrency = currencyData[currentIndex];

  return (
    <div className="flex items-center w-full">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full"
        aria-label="Previous Currency"
      >
        &#8592;
      </button>

      {/* Currency Card */}
      <div className="flex-1 mx-2">
        <CurrencyCard
          currency={currentCurrency.currency}
          buyRate={currentCurrency.buyRate}
          sellRate={currentCurrency.sellRate}
        />
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full"
        aria-label="Next Currency"
      >
        &#8594;
      </button>
    </div>
  );
};

export default ForexWidget;
