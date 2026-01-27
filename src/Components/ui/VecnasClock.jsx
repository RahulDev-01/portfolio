import React, { useEffect, useState, useRef } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const VecnasClock = ({
    showInterval = 180000, // 3 minutes
    enableChimes = true,
    countdownTarget = null,
}) => {
    const { isUpsideDown } = useUpsideDown();
    const [isVisible, setIsVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [shouldChime, setShouldChime] = useState(false);
    const tickAudioRef = useRef(null);
    const chimeAudioRef = useRef(null);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // Check if it's the top of the hour
            if (enableChimes && now.getMinutes() === 0 && now.getSeconds() === 0) {
                setShouldChime(true);
                setTimeout(() => setShouldChime(false), 3000);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [enableChimes]);

    // Show/hide clock periodically
    useEffect(() => {
        if (!isUpsideDown) {
            setIsVisible(false);
            return;
        }

        // Show clock after initial delay
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 10000); // Show after 10 seconds in Upside Down

        // Hide after duration
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 10000 + 15000); // Show for 15 seconds

        // Schedule next appearance
        const cycleTimer = setInterval(() => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 15000);
        }, showInterval);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            clearInterval(cycleTimer);
        };
    }, [isUpsideDown, showInterval]);

    // Handle ticking sound
    useEffect(() => {
        if (!isVisible) {
            if (tickAudioRef.current) {
                tickAudioRef.current.pause();
                tickAudioRef.current.currentTime = 0;
            }
            return;
        }

        if (tickAudioRef.current) {
            tickAudioRef.current.volume = 0.2;
            tickAudioRef.current.play().catch(() => console.log('Clock tick sound not available'));
        }

        return () => {
            if (tickAudioRef.current) {
                tickAudioRef.current.pause();
            }
        };
    }, [isVisible]);

    // Handle chime effect
    useEffect(() => {
        if (!shouldChime) return;

        if (chimeAudioRef.current) {
            chimeAudioRef.current.volume = 0.4;
            chimeAudioRef.current.play().catch(() => console.log('Clock chime sound not available'));
        }
    }, [shouldChime]);

    if (!isVisible) return null;

    return (
        <>
            {/* Audio elements */}
            <audio ref={tickAudioRef} loop>
                <source src="/sounds/clock-ticking.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={chimeAudioRef}>
                <source src="/sounds/clock-chime.mp3" type="audio/mpeg" />
            </audio>

            {/* Clock container */}
            <div
                className="vecnas-clock"
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    zIndex: 9996,
                    animation: 'clockAppear 1s ease-out, clockFloat 3s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.6))',
                }}
            >
                {/* Chime flash effect */}
                {shouldChime && (
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(220, 38, 38, 0.3)',
                            animation: 'chimeFlash 1s ease-out',
                            zIndex: 9995,
                            pointerEvents: 'none',
                        }}
                    />
                )}

                {/* Clock SVG */}
                <svg
                    width="200"
                    height="280"
                    viewBox="0 0 200 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: shouldChime ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    {/* Clock body */}
                    <rect x="50" y="80" width="100" height="180" rx="10" fill="#1a0000" stroke="#8b0000" strokeWidth="3" />

                    {/* Ornate top */}
                    <path
                        d="M 60 80 L 60 40 Q 60 20 80 20 L 120 20 Q 140 20 140 40 L 140 80"
                        fill="#1a0000"
                        stroke="#8b0000"
                        strokeWidth="3"
                    />

                    {/* Clock face */}
                    <circle cx="100" cy="140" r="45" fill="#0a0000" stroke="#8b0000" strokeWidth="3" />

                    {/* Roman numerals */}
                    {['XII', 'III', 'VI', 'IX'].map((numeral, i) => {
                        const angle = (i * 90 - 90) * (Math.PI / 180);
                        const x = 100 + Math.cos(angle) * 32;
                        const y = 140 + Math.sin(angle) * 32;
                        return (
                            <text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#dc2626"
                                fontSize="12"
                                fontFamily="serif"
                                fontWeight="bold"
                            >
                                {numeral}
                            </text>
                        );
                    })}

                    {/* Hour hand */}
                    <line
                        x1="100"
                        y1="140"
                        x2={100 + Math.cos((currentTime.getHours() % 12) * 30 - 90) * 20}
                        y2={140 + Math.sin((currentTime.getHours() % 12) * 30 - 90) * 20}
                        stroke="#dc2626"
                        strokeWidth="4"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: '100px 140px',
                            transition: 'all 0.5s ease',
                        }}
                    />

                    {/* Minute hand */}
                    <line
                        x1="100"
                        y1="140"
                        x2={100 + Math.cos(currentTime.getMinutes() * 6 - 90) * 30}
                        y2={140 + Math.sin(currentTime.getMinutes() * 6 - 90) * 30}
                        stroke="#dc2626"
                        strokeWidth="3"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: '100px 140px',
                            transition: 'all 0.5s ease',
                        }}
                    />

                    {/* Second hand */}
                    <line
                        x1="100"
                        y1="140"
                        x2={100 + Math.cos(currentTime.getSeconds() * 6 - 90) * 35}
                        y2={140 + Math.sin(currentTime.getSeconds() * 6 - 90) * 35}
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: '100px 140px',
                        }}
                    />

                    {/* Center dot */}
                    <circle cx="100" cy="140" r="4" fill="#dc2626" />

                    {/* Pendulum */}
                    <line
                        x1="100"
                        y1="200"
                        x2="100"
                        y2="240"
                        stroke="#8b0000"
                        strokeWidth="2"
                    />
                    <circle
                        cx="100"
                        cy="245"
                        r="8"
                        fill="#1a0000"
                        stroke="#8b0000"
                        strokeWidth="2"
                        style={{
                            animation: 'pendulumSwing 2s ease-in-out infinite',
                            transformOrigin: '100px 200px',
                        }}
                    />

                    {/* Decorative elements */}
                    <circle cx="70" cy="100" r="3" fill="#8b0000" />
                    <circle cx="130" cy="100" r="3" fill="#8b0000" />
                </svg>

                {/* Countdown display (if enabled) */}
                {countdownTarget && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(10, 0, 0, 0.9)',
                            border: '2px solid #8b0000',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#dc2626',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Time Remaining: {Math.max(0, Math.floor((countdownTarget - Date.now()) / 1000))}s
                    </div>
                )}
            </div>

            {/* Animations */}
            <style>{`
        @keyframes clockAppear {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes clockFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pendulumSwing {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }

        @keyframes chimeFlash {
          0%, 100% {
            opacity: 0;
          }
          10%, 30%, 50% {
            opacity: 1;
          }
          20%, 40%, 60% {
            opacity: 0;
          }
        }

        ${shouldChime ? `
          @keyframes screenShake {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5px, 2px); }
            20% { transform: translate(5px, -2px); }
            30% { transform: translate(-3px, 3px); }
            40% { transform: translate(3px, -3px); }
            50% { transform: translate(-2px, 2px); }
            60% { transform: translate(2px, -2px); }
            70% { transform: translate(-1px, 1px); }
            80% { transform: translate(1px, -1px); }
            90% { transform: translate(0, 0); }
          }

          body {
            animation: screenShake 0.5s ease-in-out;
          }
        ` : ''}
      `}</style>
        </>
    );
};

export default VecnasClock;
