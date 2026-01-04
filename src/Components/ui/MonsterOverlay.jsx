import React, { useEffect, useRef } from 'react';

const MonsterOverlay = () => {
    const leftMonsterRef = useRef(null);
    const rightMonsterRef = useRef(null);

    useEffect(() => {
        // Randomly show/hide monsters for creepy effect
        const interval = setInterval(() => {
            if (leftMonsterRef.current && Math.random() > 0.7) {
                leftMonsterRef.current.style.opacity = Math.random() > 0.5 ? '0.3' : '0';
            }
            if (rightMonsterRef.current && Math.random() > 0.7) {
                rightMonsterRef.current.style.opacity = Math.random() > 0.5 ? '0.2' : '0';
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="monster-overlay">
            {/* Left side monster silhouette */}
            <div
                ref={leftMonsterRef}
                className="monster monster-left"
                style={{
                    backgroundImage: `url('/demogorgon_silhouette_1767331423196.png')`,
                }}
            />

            {/* Right side monster silhouette */}
            <div
                ref={rightMonsterRef}
                className="monster monster-right"
                style={{
                    backgroundImage: `url('/demogorgon_silhouette_1767331423196.png')`,
                }}
            />

            <style>{`
        .monster-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 8;
          overflow: hidden;
        }
        
        .monster {
          position: absolute;
          width: 200px;
          height: 300px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0;
          transition: opacity 2s ease-in-out;
          filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))
                  brightness(0.3)
                  contrast(1.5);
        }
        
        .monster-left {
          bottom: 10%;
          left: 5%;
          animation: monster-lurk-left 20s ease-in-out infinite;
        }
        
        .monster-right {
          bottom: 15%;
          right: 8%;
          transform: scaleX(-1);
          animation: monster-lurk-right 25s ease-in-out infinite;
        }
        
        @keyframes monster-lurk-left {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes monster-lurk-right {
          0%, 100% {
            transform: scaleX(-1) translateY(0) scale(1);
          }
          50% {
            transform: scaleX(-1) translateY(-15px) scale(1.03);
          }
        }
      `}</style>
        </div>
    );
};

export default MonsterOverlay;
