import React, { useEffect, useRef } from 'react';

const EnhancedVineOverlay = () => {
    return (
        <div className="enhanced-vine-overlay">
            {/* Left side vine image */}
            <div className="vine-image vine-left" />

            {/* Right side vine image */}
            <div className="vine-image vine-right" />

            {/* Additional creeping tendrils */}
            <svg className="vine-svg vine-svg-left" viewBox="0 0 400 1000" xmlns="http://www.w3.org/2000/svg">
                {/* Thick main branch */}
                <path d="M0,200 Q100,220 120,320 T140,500 Q150,650 160,800"
                    stroke="#0a0000" strokeWidth="12" fill="none" opacity="0.9"
                    strokeLinecap="round" />
                <path d="M0,200 Q100,220 120,320 T140,500 Q150,650 160,800"
                    stroke="#1a0000" strokeWidth="8" fill="none" opacity="0.7"
                    strokeLinecap="round" />

                {/* Tendrils with organic curves */}
                <path d="M120,320 Q180,340 220,380 Q250,410 280,450"
                    stroke="#1a0a0a" strokeWidth="6" fill="none" opacity="0.8"
                    strokeLinecap="round" />
                <path d="M140,500 Q190,520 230,560 Q260,590 290,630"
                    stroke="#1a0a0a" strokeWidth="5" fill="none" opacity="0.7"
                    strokeLinecap="round" />

                {/* Small creeping vines */}
                <path d="M100,250 Q130,270 150,300"
                    stroke="#2a1515" strokeWidth="3" fill="none" opacity="0.6"
                    strokeLinecap="round" />
                <path d="M130,420 Q160,440 180,470"
                    stroke="#2a1515" strokeWidth="3" fill="none" opacity="0.6"
                    strokeLinecap="round" />
            </svg>

            <svg className="vine-svg vine-svg-right" viewBox="0 0 400 1000" xmlns="http://www.w3.org/2000/svg">
                {/* Thick main branch */}
                <path d="M400,250 Q300,270 280,370 T260,550 Q250,700 240,850"
                    stroke="#0a0000" strokeWidth="12" fill="none" opacity="0.9"
                    strokeLinecap="round" />
                <path d="M400,250 Q300,270 280,370 T260,550 Q250,700 240,850"
                    stroke="#1a0000" strokeWidth="8" fill="none" opacity="0.7"
                    strokeLinecap="round" />

                {/* Tendrils */}
                <path d="M280,370 Q220,390 180,430 Q150,460 120,500"
                    stroke="#1a0a0a" strokeWidth="6" fill="none" opacity="0.8"
                    strokeLinecap="round" />
                <path d="M260,550 Q210,570 170,610 Q140,640 110,680"
                    stroke="#1a0a0a" strokeWidth="5" fill="none" opacity="0.7"
                    strokeLinecap="round" />
            </svg>

            <style>{`
        .enhanced-vine-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 12;
          overflow: hidden;
        }
        
        .vine-image {
          position: absolute;
          width: 400px;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.8;
          filter: drop-shadow(0 0 20px rgba(139, 0, 0, 0.5))
                  brightness(0.6)
                  contrast(1.3);
        }
        
        .vine-left {
          top: 0;
          left: -100px;
          background-image: url('/upside_down_vines_1767331443152.png');
          animation: vine-creep-left 15s ease-in-out infinite;
        }
        
        .vine-right {
          top: 0;
          right: -100px;
          background-image: url('/upside_down_vines_1767331443152.png');
          transform: scaleX(-1);
          animation: vine-creep-right 18s ease-in-out infinite;
        }
        
        .vine-svg {
          position: absolute;
          filter: drop-shadow(0 0 15px rgba(139, 0, 0, 0.6));
        }
        
        .vine-svg-left {
          top: 0;
          left: -50px;
          width: 400px;
          height: 100%;
          animation: vine-sway-left 12s ease-in-out infinite;
        }
        
        .vine-svg-right {
          top: 0;
          right: -50px;
          width: 400px;
          height: 100%;
          animation: vine-sway-right 14s ease-in-out infinite;
        }
        
        @keyframes vine-creep-left {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(15px) translateY(-10px);
          }
        }
        
        @keyframes vine-creep-right {
          0%, 100% {
            transform: scaleX(-1) translateX(0) translateY(0);
          }
          50% {
            transform: scaleX(-1) translateX(-15px) translateY(-10px);
          }
        }
        
        @keyframes vine-sway-left {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(10px) rotate(2deg);
          }
        }
        
        @keyframes vine-sway-right {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(-10px) rotate(-2deg);
          }
        }
      `}</style>
        </div>
    );
};

export default EnhancedVineOverlay;
