import React from 'react';

const VineOverlay = () => {
    return (
        <div className="vine-overlay">
            {/* Left Side Creeping Vines */}
            <svg className="vine vine-left" viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
                {/* Main thick branch */}
                <path d="M0,100 Q80,120 100,200 T120,350 Q130,450 140,550 T150,700"
                    stroke="#0a0000" strokeWidth="8" fill="none" opacity="0.9" />
                <path d="M0,100 Q80,120 100,200 T120,350 Q130,450 140,550 T150,700"
                    stroke="#1a0a0a" strokeWidth="6" fill="none" opacity="0.8" />

                {/* Branch tendrils */}
                <path d="M100,200 Q150,220 180,250 Q200,270 220,300"
                    stroke="#1a0a0a" strokeWidth="4" fill="none" opacity="0.7" />
                <path d="M120,350 Q160,360 190,380 Q210,390 230,410"
                    stroke="#1a0a0a" strokeWidth="3" fill="none" opacity="0.6" />
                <path d="M140,550 Q170,560 200,590 Q220,610 240,640"
                    stroke="#1a0a0a" strokeWidth="4" fill="none" opacity="0.7" />

                {/* Small offshoots */}
                <path d="M80,150 Q100,160 110,180"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M110,300 Q130,310 145,330"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M130,480 Q150,490 165,510"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>

            {/* Right Side Creeping Vines */}
            <svg className="vine vine-right" viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
                {/* Main thick branch */}
                <path d="M300,150 Q220,170 200,250 T180,400 Q170,500 160,600 T150,750"
                    stroke="#0a0000" strokeWidth="8" fill="none" opacity="0.9" />
                <path d="M300,150 Q220,170 200,250 T180,400 Q170,500 160,600 T150,750"
                    stroke="#1a0a0a" strokeWidth="6" fill="none" opacity="0.8" />

                {/* Branch tendrils */}
                <path d="M200,250 Q150,270 120,300 Q100,320 80,350"
                    stroke="#1a0a0a" strokeWidth="4" fill="none" opacity="0.7" />
                <path d="M180,400 Q140,410 110,430 Q90,440 70,460"
                    stroke="#1a0a0a" strokeWidth="3" fill="none" opacity="0.6" />
                <path d="M160,600 Q130,610 100,640 Q80,660 60,690"
                    stroke="#1a0a0a" strokeWidth="4" fill="none" opacity="0.7" />

                {/* Small offshoots */}
                <path d="M220,200 Q200,210 190,230"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M190,350 Q170,360 155,380"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M170,530 Q150,540 135,560"
                    stroke="#2a1515" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>

            <style>{`
        .vine-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 15;
          overflow: hidden;
        }
        
        .vine {
          position: absolute;
          filter: drop-shadow(0 0 15px rgba(139, 0, 0, 0.4)) 
                  drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
        }
        
        .vine-left {
          top: 0;
          left: -50px;
          width: 300px;
          height: 100%;
          animation: vine-sway-left 12s ease-in-out infinite;
        }
        
        .vine-right {
          top: 0;
          right: -50px;
          width: 300px;
          height: 100%;
          animation: vine-sway-right 10s ease-in-out infinite;
        }
        
        @keyframes vine-sway-left {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(8px) rotate(1deg);
          }
        }
        
        @keyframes vine-sway-right {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(-8px) rotate(-1deg);
          }
        }
      `}</style>
        </div>
    );
};

export default VineOverlay;
