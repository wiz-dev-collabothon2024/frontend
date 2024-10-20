import React, { useState } from "react";
import CurrencyCard from "./CurrencyCard";
import arrowLeft from "@/assets/arrow.png"; // Adjusted path for the left arrow
import arrowRight from "@/assets/arrow.png"; // Adjusted path for the right arrow

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
        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full flex items-center justify-center"
        aria-label="Previous Currency"
      >
        <div className="flex items-end">
          <img
            src={arrowLeft}
            alt="Previous"
            className="w-10 h-10 transform rotate-180"
          />
        </div>
      </button>

      {/* Currency Card */}
      <div className="flex-1 mx-2 font-semibold text-[#274340]">
        <CurrencyCard
          currency={currentCurrency.currency}
          buyRate={currentCurrency.buyRate}
          sellRate={currentCurrency.sellRate}
        />
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="p-2 focus:outline-none hover:bg-gray-200 rounded-full flex items-center justify-center"
        aria-label="Next Currency"
      >
        <div className="flex items-end">
          <img
            src={arrowRight}
            alt="Next"
            className="w-10 h-10"
          />
        </div>
      </button>
    </div>
  );
};

export default ForexWidget;
