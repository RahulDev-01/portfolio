import React from 'react';

const RealisticVineOverlay = () => {
  return (
    <div className="realistic-vine-overlay">
      {/* Left Vines */}
      <div className="vine-container vine-left">
        <img src="/vines_left_transparent.png" alt="" />
      </div>

      {/* Right Vines */}
      <div className="vine-container vine-right">
        <img src="/vines_right_transparent.png" alt="" />
      </div>

      <style>{`
        .realistic-vine-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          overflow: hidden;
        }

        .vine-container {
          position: absolute;
          top: 0;
          height: 100%;
          width: 300px;
          opacity: 0;
          animation: vine-creep-in 2s ease-out forwards;
        }

        .vine-left {
          left: -50px;
          animation-delay: 0.5s;
        }

        .vine-right {
          right: -50px;
          transform: scaleX(-1);
          animation-delay: 0.7s;
        }

        .vine-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.4) contrast(2) drop-shadow(0 0 20px rgba(139, 0, 0, 0.6));
          mix-blend-mode: screen;
          animation: vine-sway 8s ease-in-out infinite;
        }

        @keyframes vine-creep-in {
          from {
            opacity: 0;
            transform: translateX(0);
          }
          to {
            opacity: 0.9;
            transform: translateX(0);
          }
        }

        @keyframes vine-sway {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }

        /* Responsive sizing */
        @media (max-width: 768px) {
          .vine-container {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .vine-container {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default RealisticVineOverlay;
