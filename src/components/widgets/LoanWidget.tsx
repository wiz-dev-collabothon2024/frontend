import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LoanWidget: React.FC = () => {
   // State to manage fetched data
   //const [answer, setAnswer] = useState<{ short_answer: string; detailed_answer: string } | null>(null);
   const [showDetails, setShowDetails] = useState(false); // State for dynamic loading detailed answer
   const [loading, setLoading] = useState(true); // State for loading status
   const [error, setError] = useState<string | null>(null); // State for error handling
 
   const endpoint = "http://localhost:8000/api/loan-predict/";
   const token = "jvkhgfjvjbj";
  // Mocked data
  const answer = {
    short_answer: "Your loan application was likely approved because your credit duration is favorable and your income is adequate compared to your expenses. Focus on maintaining a stable income and improving your credit duration.",
    detailed_answer: "The model predicted that you are not likely to default on your loan primarily because your savings account balance is high, which indicates financial stability. Additionally, your credit duration is below 40 months, which is viewed positively. To improve your chances for future applications, ensure you maintain or increase your income levels, reduce any high expenses, and consider building a longer credit history. Also, being mindful of your spending habits can help reinforce your creditworthiness.",
    status: true
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(endpoint, {
  //         method: "GET", // Specify the request method
  //         headers: {
  //           "Authorization": `Bearer ${token}`, // Add Bearer token to the headers
  //           "Content-Type": "application/json", // Optional: Specify content type if needed
  //         },
  //       }); // Fetch data from the API
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok"); // Handle HTTP errors
  //       }
  //       const data = await response.json(); // Parse JSON data
  //       // Since the data comes under the 'message' object, we need to access it properly
  //       if (data.message && data.message.short_answer && data.message.detailed_answer) {
  //         setAnswer({
  //           short_answer: data.message.short_answer,
  //           detailed_answer: data.message.detailed_answer,
  //         }); // Update state with the fetched data
  //       } else {
  //         throw new Error("Data format incorrect. Missing required fields.");
  //       }
  //     } catch (err) {
  //       console.error("Fetch error:", err.message || err); // Log the error in console
  //       setError(err.message || "Failed to fetch data."); // Handle error
  //     } finally {
  //       setLoading(false); // Reset loading state
  //     }
  //   };

  //   fetchData();
  // }, [endpoint, token]); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchData = async () => {
      console.log('Starting data fetch...');
      
      await sleep(5000); // Sleep for 5 seconds

      console.log('Delay is being processed');
      
      // You can fetch data here after the sleep
      // Simulating a fetch with a timeout
      setTimeout(() => {
        setLoading(false); // After data is fetched
      }, 1000);
    };

    fetchData();
  }, []);

   // Toggle details when 'See details' is clicked
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="pulsating-logo"><img src={logo}></img></div> {/* Pulsating logo during loading */}
      </div>
    ); // Display loading state
  }

  if (error) {
    return <h2 className="text-2xl font-bold mb-2 text-[#274340]">{error}</h2>; // Display error message
  }

  if (!answer) {
    return <h2 className="text-2xl font-bold mb-2 text-[#274340]">No answer available.</h2>; // Handle case where no answer is returned
  }


  return (
    <div className="flex items-center w-full">
      {/* Answer Card */}
      <div className="flex-1 mx-2 max-h-60 overflow-y-auto">
        <h2 className="text-lg font-semibold">Prediction</h2>
        {/* One word short answer approve or not */}
        <p style={{ color: answer.status ? 'green' : 'red' }}>
          {answer.status ? "High chance of approval": "Low chance of approval"}
        </p>
        
        {/* <p>{answer.short_answer}</p> */}
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
