import React from 'react';

const StrangerVines = () => {
  return (
    <>
      <style>{`
        @keyframes vineSwayLeft {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(5px) rotate(0.5deg); }
          50% { transform: translateX(-3px) rotate(-0.3deg); }
          75% { transform: translateX(4px) rotate(0.4deg); }
        }
        @keyframes vineSwayRight {
          0%, 100% { transform: scaleX(-1) translateX(0) rotate(0deg); }
          25% { transform: scaleX(-1) translateX(-5px) rotate(-0.5deg); }
          50% { transform: scaleX(-1) translateX(3px) rotate(0.3deg); }
          75% { transform: scaleX(-1) translateX(-4px) rotate(-0.4deg); }
        }
        @keyframes vineGrow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .vine-left {
          animation: vineSwayLeft 8s ease-in-out infinite;
        }
        .vine-right {
          animation: vineSwayRight 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        .vine-corner {
          animation: vineGrow 6s ease-in-out infinite;
        }
        .vine-corner-left {
          animation: vineGrow 6s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>

      {/* Left side vines - BIGGER */}
      <div
        className="vine-left absolute left-0 top-0 bottom-0 w-64 md:w-96 z-[15] pointer-events-none"
        style={{
          backgroundImage: 'url(/vine_left.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'left center',
          backgroundRepeat: 'repeat',
          opacity: 1.0,
          filter: 'brightness(1.5) contrast(1.2)'
        }}
      />

      {/* Right side vines (mirrored) - BIGGER */}
      <div
        className="absolute right-0 top-0 bottom-0 w-64 md:w-96 z-[15] pointer-events-none"
        style={{
          backgroundImage: 'url(/vine_left.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          backgroundRepeat: 'repeat',
          opacity: 1.0,
          transform: 'scaleX(-1)',
          filter: 'brightness(1.5) contrast(1.2)'
        }}
      />


    </>
  );
};

// Circular vine ring around profile photo
export const VineRing = () => {
  return (
    <div
      className="absolute inset-[-15px] md:inset-[-25px] z-20 pointer-events-none"
      style={{
        backgroundImage: 'url(/vine_ring.png)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1.0,
        scale: 1.3,
        filter: 'brightness(1.5) contrast(1.2)',
        animation: 'vineGrow 5s ease-in-out infinite',
      }}
    />
  );
};

export default StrangerVines;
