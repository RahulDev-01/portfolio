import React from 'react';

const CreepyVinesCSS = () => {
    return (
        <div className="creepy-vines-container">
            {/* Left Side Multiple Vines */}
            <svg className="vines-left" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
                {/* Main thick creeping vine */}
                <path d="M10,50 Q30,100 25,150 T30,250 Q35,320 40,400 T45,550 Q50,650 55,750"
                    stroke="rgba(20, 5, 5, 0.9)" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M10,50 Q30,100 25,150 T30,250 Q35,320 40,400 T45,550 Q50,650 55,750"
                    stroke="rgba(40, 10, 10, 0.7)" strokeWidth="10" fill="none" strokeLinecap="round" />

                {/* Thick branches spreading out */}
                <path d="M25,150 Q60,180 90,220 Q110,250 130,290"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M30,250 Q70,280 110,320 Q140,350 170,390"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M40,400 Q75,430 105,470 Q130,505 155,550"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="9" fill="none" strokeLinecap="round" />
                <path d="M45,550 Q80,580 115,620 Q145,655 175,700"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* Smaller tendrils */}
                <path d="M50,200 Q70,220 85,245" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M60,350 Q80,370 95,395" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M55,500 Q75,520 90,545" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M65,650 Q85,670 100,695" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Decorative nodes/joints */}
                <circle cx="25" cy="150" r="8" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="30" cy="250" r="7" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="40" cy="400" r="9" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="45" cy="550" r="7" fill="rgba(60, 20, 20, 0.5)" />
            </svg>

            {/* Right Side Multiple Vines (mirrored) */}
            <svg className="vines-right" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
                {/* Main thick creeping vine */}
                <path d="M190,80 Q170,130 175,180 T170,280 Q165,350 160,430 T155,580 Q150,680 145,780"
                    stroke="rgba(20, 5, 5, 0.9)" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M190,80 Q170,130 175,180 T170,280 Q165,350 160,430 T155,580 Q150,680 145,780"
                    stroke="rgba(40, 10, 10, 0.7)" strokeWidth="10" fill="none" strokeLinecap="round" />

                {/* Thick branches spreading out */}
                <path d="M175,180 Q140,210 110,250 Q90,280 70,320"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M170,280 Q130,310 90,350 Q60,380 30,420"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="7" fill="none" strokeLinecap="round" />
                <path d="M160,430 Q125,460 95,500 Q70,535 45,580"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="9" fill="none" strokeLinecap="round" />
                <path d="M155,580 Q120,610 85,650 Q55,685 25,730"
                    stroke="rgba(30, 8, 8, 0.8)" strokeWidth="8" fill="none" strokeLinecap="round" />

                {/* Smaller tendrils */}
                <path d="M150,230 Q130,250 115,275" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M140,380 Q120,400 105,425" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M145,530 Q125,550 110,575" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M135,680 Q115,700 100,725" stroke="rgba(50, 15, 15, 0.6)" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Decorative nodes/joints */}
                <circle cx="175" cy="180" r="8" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="170" cy="280" r="7" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="160" cy="430" r="9" fill="rgba(60, 20, 20, 0.5)" />
                <circle cx="155" cy="580" r="7" fill="rgba(60, 20, 20, 0.5)" />
            </svg>

            <style>{`
        .creepy-vines-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          overflow: hidden;
        }

        .vines-left,
        .vines-right {
          position: absolute;
          top: 0;
          height: 100%;
          width: 200px;
          opacity: 0;
          animation: vine-creep-in 2s ease-out forwards;
          filter: drop-shadow(0 0 15px rgba(139, 0, 0, 0.7))
                  drop-shadow(0 0 8px rgba(80, 0, 0, 0.9));
        }

        .vines-left {
          left: -20px;
          animation-delay: 0.5s;
        }

        .vines-right {
          right: -20px;
          animation-delay: 0.7s;
        }

        .vines-left path,
        .vines-right path {
          animation: vine-sway 8s ease-in-out infinite;
          transform-origin: center;
        }

        .vines-left circle,
        .vines-right circle {
          animation: node-pulse 3s ease-in-out infinite;
        }

        @keyframes vine-creep-in {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vine-sway {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-8px) translateX(3px);
          }
        }

        @keyframes node-pulse {
          0%, 100% {
            opacity: 0.5;
            r: 7;
          }
          50% {
            opacity: 0.8;
            r: 9;
          }
        }

        /* Responsive sizing */
        @media (max-width: 768px) {
          .vines-left,
          .vines-right {
            width: 150px;
          }
        }

        @media (max-width: 480px) {
          .vines-left,
          .vines-right {
            width: 100px;
          }
        }
      `}</style>
        </div>
    );
};

export default CreepyVinesCSS;
