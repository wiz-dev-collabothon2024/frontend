import React from "react";

interface CurrencyCardProps {
  currency: string;
  buyRate: number;
  sellRate: number;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({
  currency,
  buyRate,
  sellRate,
}) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-2 text-[#274340]">{currency} Exchange Rates</h2>
      <div className="flex justify-between items-start space-x-2">
        {/* Buy Box */}
        <div className="bg-[#98a596] rounded-l-3xl flex flex-col items-center flex-1 p-1">
          <span className="text-[25px] font-semibold text-white">Buy</span>
          <span className="mt-2 text-[20px] font-normal text-white">{buyRate.toFixed(4)}</span>
        </div>
        {/* Sell Box */}
        <div className="bg-[#8d9d9d] rounded-r-3xl flex flex-col items-center flex-1 p-1">
          <span className="text-[25px] font-semibold text-white">Sell</span>
          <span className="mt-2 text-[20px] font-normal text-white">{sellRate.toFixed(4)}</span>
        </div>
      </div>
    </>
  );
};

export default CurrencyCard;
