import React, { useEffect, useState } from 'react';

const PortalTransition = ({ isActive, onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Stage progression
    const timers = [
      setTimeout(() => setStage(1), 100),    // Portal energy builds
      setTimeout(() => setStage(2), 600),    // Page starts tearing
      setTimeout(() => setStage(3), 1500),   // Tear expands
      setTimeout(() => setStage(4), 2500),   // Full transformation
      setTimeout(() => {
        onComplete();
        setStage(0);
      }, 3000)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="portal-transition-container">
      {/* Portal Energy Center */}
      <div className={`portal-energy stage-${stage}`}>
        <img src="/portal_transparent.png" alt="" />
      </div>

      {/* Torn Paper Edges */}
      <div className={`tear-top stage-${stage}`}>
        <div className="tear-edge" />
      </div>
      <div className={`tear-bottom stage-${stage}`}>
        <div className="tear-edge" />
      </div>

      {/* Red Energy Flash */}
      <div className={`energy-flash stage-${stage}`} />

      <style>{`
        .portal-transition-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        /* Portal Energy */
        .portal-energy {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 400px;
          height: 400px;
          opacity: 0;
          transition: all 0.5s ease-out;
        }

        .portal-energy.stage-1 {
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0.5;
        }

        .portal-energy.stage-2 {
          transform: translate(-50%, -50%) scale(0.8) rotate(180deg);
          opacity: 0.8;
        }

        .portal-energy.stage-3 {
          transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
          opacity: 1;
        }

        .portal-energy.stage-4 {
          transform: translate(-50%, -50%) scale(3) rotate(540deg);
          opacity: 0;
        }

        .portal-energy img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(0.5) contrast(2) drop-shadow(0 0 40px rgba(220, 38, 38, 0.8));
          mix-blend-mode: screen;
        }

        /* Torn Paper Effects */
        .tear-top,
        .tear-bottom {
          position: absolute;
          left: 0;
          right: 0;
          height: 50%;
          background: #000;
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .tear-top {
          top: 0;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 90% 98%, 80% 100%, 70% 97%, 60% 99%, 50% 96%, 40% 98%, 30% 97%, 20% 99%, 10% 98%, 0 100%);
        }

        .tear-bottom {
          bottom: 0;
          clip-path: polygon(0 0, 10% 2%, 20% 0, 30% 3%, 40% 1%, 50% 4%, 60% 1%, 70% 3%, 80% 0, 90% 2%, 100% 0, 100% 100%, 0 100%);
        }

        .tear-top.stage-2,
        .tear-top.stage-3,
        .tear-top.stage-4 {
          transform: translateY(-100%);
        }

        .tear-bottom.stage-2,
        .tear-bottom.stage-3,
        .tear-bottom.stage-4 {
          transform: translateY(100%);
        }

        .tear-edge {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(220, 38, 38, 0.3), transparent);
          filter: blur(2px);
        }

        /* Energy Flash */
        .energy-flash {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.8) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .energy-flash.stage-2 {
          opacity: 0.3;
          animation: flash-pulse 0.5s infinite;
        }

        .energy-flash.stage-3 {
          opacity: 0.5;
        }

        @keyframes flash-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default PortalTransition;
