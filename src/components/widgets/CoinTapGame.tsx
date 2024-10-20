import React, { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import coin from "@/assets/commerzkombat.png";
import smallCoin from "@/assets/commerzkombat.png";

interface Animation {
  id: number;
  type: string;
  top: number;
  left: number;
}

const animationTypes = ["float", "coin-bounce", "rotate", "fade", "zoom"];

const CoinTapGame: React.FC = () => {
  const [animations, setAnimations] = useState<Animation[]>([]); // For tracking animations
  const [score, setScore] = useState(0); // For tracking score
  const [showPrize, setShowPrize] = useState(false); // To show the prize form after 1000 clicks

  const getRandomAnimationType = () => {
    return animationTypes[Math.floor(Math.random() * animationTypes.length)];
  };

  const getRandomOffset = (maxOffset: number) => {
    return (Math.random() - 0.5) * maxOffset; // Random value between -maxOffset/2 and +maxOffset/2
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Increment the score
    setScore((prevScore) => {
      const newScore = prevScore + 1;

      // Check if the user reaches 1000 taps to show the prize
      if (newScore === 100) {
        setShowPrize(true);
      }

      return newScore;
    });

    // Get the coin's bounding box relative to its parent container
    const coinRect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.offsetParent!.getBoundingClientRect();

    // Calculate the position of the coin relative to the container
    const coinCenterX = coinRect.left + coinRect.width / 2 - containerRect.left;
    const coinCenterY = coinRect.top + coinRect.height / 2 - containerRect.top;

    // Randomize positions near the coin for different animations
    const randomOffsetX1 = getRandomOffset(250);
    const randomOffsetY1 = getRandomOffset(250);
    const randomOffsetX2 = getRandomOffset(150);
    const randomOffsetY2 = getRandomOffset(150);

    // Add new animations with random types
    const newAnimations: Animation[] = [
      {
        id: Date.now(),
        type: getRandomAnimationType(), // Random animation for +1
        top: coinCenterY + randomOffsetY1,
        left: coinCenterX + randomOffsetX1,
      },
      {
        id: Date.now() + 1,
        type: getRandomAnimationType(), // Random animation for small coins
        top: coinCenterY + randomOffsetY2,
        left: coinCenterX + randomOffsetX2,
      },
    ];

    setAnimations((prevAnimations) => [...prevAnimations, ...newAnimations]);

    // Remove animations after they finish
    setTimeout(() => {
      setAnimations((prevAnimations) =>
        prevAnimations.filter(
          (anim) => !newAnimations.some((newAnim) => newAnim.id === anim.id)
        )
      );
    }, 2000); // Extended duration for visibility
  };

  const claimPrize = () => {
    toast.success("🎉 Congratulations! You've claimed your platinum card!", {
      position: "top-center", // Set position here
      autoClose: 3000,
      transition: Slide,
    });
    setShowPrize(false); // Hide the form after claiming
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-t">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Score Counter */}
      <div className="absolute top-1 left-0 font-bold text-md p-4 rounded-md">
        Score: {score}
      </div>

      {/* Main Coin in the center */}
      <div
        className="relative cursor-pointer w-48 h-48 rounded-full flex items-center justify-center transform transition-transform duration-300"
        onClick={handleClick}
      >
        <img src={coin} alt="Coin" className="w-full h-full object-contain" />
      </div>

      {/* Render animations */}
      {animations.map((animation) => (
        <StandaloneAnimation
          key={animation.id}
          animationType={animation.type}
          top={animation.top}
          left={animation.left}
        />
      ))}

      {/* Show prize form when the player reaches 1000 clicks */}
      {showPrize && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg shadow-lg flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            You gained a platinum card in our bank!
          </h2>
          <button
            onClick={claimPrize}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Claim Card
          </button>
        </div>
      )}
    </div>
  );
};

// Component for independent animations
const StandaloneAnimation: React.FC<{
  animationType: string;
  top: number;
  left: number;
}> = ({ animationType, top, left }) => {
  return (
    <div
      className={`absolute animate-${animationType} pointer-events-none`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {animationType.includes("coin") ? (
        <img src={smallCoin} alt="Small Coin" className="w-8 h-8" />
      ) : (
        <span className="text-yellow-500 text-3xl font-extrabold">+1</span>
      )}
    </div>
  );
};

export default CoinTapGame;
