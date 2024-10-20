import React, { useState } from "react";
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
  const [coinShake, setCoinShake] = useState(false); // For triggering main coin animation

  const getRandomAnimationType = () => {
    return animationTypes[Math.floor(Math.random() * animationTypes.length)];
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Increment the score
    setScore((prevScore) => prevScore + 1);

    // Trigger main coin shake animation
    setCoinShake(true);
    setTimeout(() => setCoinShake(false), 500); // Shake animation duration

    // Get the coin's bounding box relative to its parent container
    const coinRect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.offsetParent!.getBoundingClientRect();

    // Calculate the position of the coin relative to the container
    const coinCenterX = coinRect.left + coinRect.width / 2 - containerRect.left;
    const coinCenterY = coinRect.top + coinRect.height / 2 - containerRect.top;

    // Randomize positions near the coin for different animations
    const randomOffsetX = (Math.random() - 0.5) * 150;
    const randomOffsetY = (Math.random() - 0.5) * 150;

    // Add new animations with random types
    const newAnimations: Animation[] = [
      {
        id: Date.now(),
        type: getRandomAnimationType(), // Random animation for +1
        top: coinCenterY + randomOffsetY,
        left: coinCenterX + randomOffsetX,
      },
      {
        id: Date.now() + 1,
        type: getRandomAnimationType(), // Random animation for small coins
        top: coinCenterY + randomOffsetY,
        left: coinCenterX + randomOffsetX,
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
    }, 1500);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-t">
      {/* Score Counter */}
      <div className="absolute top-5 left-5 font-bold text-md p-4 rounded-md shadow-lg">
        {score}
      </div>

      {/* Main Coin in the center */}
      <div
        className={`relative cursor-pointer w-40 h-40 rounded-full flex items-center justify-center transform transition-transform duration-200 ${
          coinShake ? "animate-coin-pop" : "" // Add shake/pop animation on click
        }`}
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
        <img src={smallCoin} alt="Small Coin" className="w-6 h-6" />
      ) : (
        "+1"
      )}
    </div>
  );
};

export default CoinTapGame;
