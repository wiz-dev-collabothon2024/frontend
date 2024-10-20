import React from "react";
import arrowImg from "@/assets/arrow.png"; // Adjust the path as necessary

const EmailsWidget: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-[#274340]">Email Box</h2>
      <p className="text-sm text-[#6d8683] mt-1">2 Notifications</p>
      <div className="flex items-center mt-10">
        <span className="text-[#274340] font-semibold">Check Email Box</span>
        <img src={arrowImg} alt="Arrow" className="ml-2 w-4 h-4" />
      </div>
    </>
  );
};

export default EmailsWidget;
