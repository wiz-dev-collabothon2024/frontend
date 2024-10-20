import React, { useState, useEffect } from "react";

const LoanWidget: React.FC = () => {
  // Define state for toggling the detailed answer
  const [showDetails, setShowDetails] = useState(false);
  
  // Mocked data from the ML
  const answer = {
    short_answer: "Your loan application was likely approved because your credit duration is favorable and your income is adequate compared to your expenses. Focus on maintaining a stable income and improving your credit duration.",
    detailed_answer: "The model predicted that you are not likely to default on your loan primarily because your savings account balance is high, which indicates financial stability. Additionally, your credit duration is below 40 months, which is viewed positively. To improve your chances for future applications, ensure you maintain or increase your income levels, reduce any high expenses, and consider building a longer credit history. Also, being mindful of your spending habits can help reinforce your creditworthiness."
  };

   // Toggle details when 'See details' is clicked
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex items-center w-full">
      {/* Answer Card */}
      <div className="flex-1 mx-2 max-h-60 overflow-y-auto">
        <h2 className="text-lg font-semibold">Prediction</h2>
        <p>{answer.short_answer}</p>
        {/* "See details" link */}
        <a
          className="text-blue-500 cursor-pointer"
          onClick={handleToggleDetails}
        >
          {showDetails ? "Hide details" : "See details"}
        </a>

        {/* Conditional rendering of the detailed answer */}
        {showDetails && (
          <div className="mt-4 transition-all ease-in-out duration-300">
            <h2 className="text-lg font-semibold">Detailed Answer:</h2>
            <p>{answer.detailed_answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanWidget;
