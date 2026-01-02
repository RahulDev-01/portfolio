import React from 'react';

const GlitchText = ({ children, className = '' }) => {
    return (
        <div className={`glitch-wrapper ${className}`}>
            <div className="glitch" data-text={typeof children === 'string' ? children : ''}>
                {children}
            </div>
            <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .glitch {
          position: relative;
          animation: glitch-skew 3s infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff0000;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00ff00, 2px 2px #ff0000;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% {
            clip: rect(61px, 9999px, 28px, 0);
          }
          5% {
            clip: rect(33px, 9999px, 84px, 0);
          }
          10% {
            clip: rect(63px, 9999px, 47px, 0);
          }
          15% {
            clip: rect(39px, 9999px, 38px, 0);
          }
          20% {
            clip: rect(26px, 9999px, 96px, 0);
          }
          25% {
            clip: rect(72px, 9999px, 14px, 0);
          }
          30% {
            clip: rect(2px, 9999px, 95px, 0);
          }
          35% {
            clip: rect(58px, 9999px, 61px, 0);
          }
          40% {
            clip: rect(84px, 9999px, 5px, 0);
          }
          45% {
            clip: rect(11px, 9999px, 73px, 0);
          }
          50% {
            clip: rect(46px, 9999px, 32px, 0);
          }
          55% {
            clip: rect(91px, 9999px, 19px, 0);
          }
          60% {
            clip: rect(7px, 9999px, 88px, 0);
          }
          65% {
            clip: rect(53px, 9999px, 42px, 0);
          }
          70% {
            clip: rect(29px, 9999px, 67px, 0);
          }
          75% {
            clip: rect(76px, 9999px, 23px, 0);
          }
          80% {
            clip: rect(15px, 9999px, 79px, 0);
          }
          85% {
            clip: rect(68px, 9999px, 36px, 0);
          }
          90% {
            clip: rect(4px, 9999px, 92px, 0);
          }
          95% {
            clip: rect(81px, 9999px, 51px, 0);
          }
          100% {
            clip: rect(37px, 9999px, 64px, 0);
          }
        }
        
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          10% {
            transform: skew(0deg);
          }
          11% {
            transform: skew(2deg);
          }
          12% {
            transform: skew(0deg);
          }
          13% {
            transform: skew(-2deg);
          }
          14% {
            transform: skew(0deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
      `}</style>
        </div>
    );
};

export default GlitchText;
