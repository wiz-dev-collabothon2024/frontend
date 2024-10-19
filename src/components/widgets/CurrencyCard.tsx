import React from "react";

interface CurrencyCardProps {
  currency: string;
  buyRate: number;
  sellRate: number;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currency, buyRate, sellRate }) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-2">{currency} Exchange Rates</h2>
      <div className="flex justify-between items-start">
        {/* Buy Box */}
        <div className="bg-green-100 rounded-lg flex flex-col items-center flex-1">
          <span className="text-lg font-semibold">Buy</span>
          <span className="mt-2 text-xl font-bold">
            {buyRate.toFixed(4)}
          </span>
        </div>
        {/* Sell Box */}
        <div className="bg-red-100 rounded-lg flex flex-col items-center flex-1">
          <span className="text-lg font-semibold">Sell</span>
          <span className="mt-2 text-xl font-bold">
            {sellRate.toFixed(4)}
          </span>
        </div>
      </div>
    </>
  );
};

export default CurrencyCard;