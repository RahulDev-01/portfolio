import React, { useEffect, useState, useCallback } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const Demogorgon = ({
    appearanceChance = 0.08,
    minInterval = 30000,
    maxInterval = 60000,
    soundEnabled = true,
}) => {
    const { isUpsideDown } = useUpsideDown();
    const [isVisible, setIsVisible] = useState(false);
    const [animationDirection, setAnimationDirection] = useState('left-to-right');
    const [demogorgonSize, setDemogorgonSize] = useState('medium');

    const triggerDemogorgon = useCallback(() => {
        if (!isUpsideDown) return;

        // Random chance check
        if (Math.random() > appearanceChance) return;

        // Random direction
        const directions = ['left-to-right', 'right-to-left', 'top-to-bottom'];
        setAnimationDirection(directions[Math.floor(Math.random() * directions.length)]);

        // Random size
        const sizes = ['small', 'medium', 'large'];
        setDemogorgonSize(sizes[Math.floor(Math.random() * sizes.length)]);

        setIsVisible(true);

        // Play sound effect
        if (soundEnabled) {
            const audio = new Audio('/sounds/demogorgon-growl.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => console.log('Demogorgon sound not available'));
        }

        // Hide after animation completes
        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, [isUpsideDown, appearanceChance, soundEnabled]);

    // Random appearance timer
    useEffect(() => {
        if (!isUpsideDown) {
            setIsVisible(false);
            return;
        }

        const scheduleNextAppearance = () => {
            const delay = Math.random() * (maxInterval - minInterval) + minInterval;
            return setTimeout(triggerDemogorgon, delay);
        };

        const timer = scheduleNextAppearance();

        return () => clearTimeout(timer);
    }, [isUpsideDown, triggerDemogorgon, minInterval, maxInterval]);

    // Trigger on rapid scrolling
    useEffect(() => {
        if (!isUpsideDown) return;

        let scrollCount = 0;
        let scrollTimer = null;

        const handleScroll = () => {
            scrollCount++;

            if (scrollTimer) clearTimeout(scrollTimer);

            // If user scrolls rapidly (5+ times in 1 second), trigger Demogorgon
            if (scrollCount >= 5) {
                triggerDemogorgon();
                scrollCount = 0;
            }

            scrollTimer = setTimeout(() => {
                scrollCount = 0;
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimer) clearTimeout(scrollTimer);
        };
    }, [isUpsideDown, triggerDemogorgon]);

    if (!isVisible) return null;

    const getSizeStyles = () => {
        switch (demogorgonSize) {
            case 'small':
                return { width: '150px', height: '200px' };
            case 'large':
                return { width: '350px', height: '450px' };
            default:
                return { width: '250px', height: '350px' };
        }
    };

    const getAnimationStyles = () => {
        const baseStyles = {
            position: 'fixed',
            zIndex: 9997,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))',
            opacity: 0.9,
            ...getSizeStyles(),
        };

        switch (animationDirection) {
            case 'left-to-right':
                return {
                    ...baseStyles,
                    top: `${Math.random() * 60 + 20}%`,
                    animation: 'slideLeftToRight 3s ease-in-out',
                };
            case 'right-to-left':
                return {
                    ...baseStyles,
                    top: `${Math.random() * 60 + 20}%`,
                    animation: 'slideRightToLeft 3s ease-in-out',
                };
            case 'top-to-bottom':
                return {
                    ...baseStyles,
                    left: `${Math.random() * 60 + 20}%`,
                    animation: 'slideTopToBottom 3s ease-in-out',
                };
            default:
                return baseStyles;
        }
    };

    return (
        <>
            <div className="demogorgon-shadow" style={getAnimationStyles()}>
                {/* Demogorgon SVG Shadow */}
                <svg
                    viewBox="0 0 200 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Main body silhouette */}
                    <ellipse cx="100" cy="250" rx="60" ry="30" fill="rgba(139, 0, 0, 0.9)" />

                    {/* Torso */}
                    <path
                        d="M 70 250 Q 60 200 65 150 Q 70 100 100 80 Q 130 100 135 150 Q 140 200 130 250 Z"
                        fill="rgba(139, 0, 0, 0.9)"
                    />

                    {/* Head/Flower shape */}
                    <circle cx="100" cy="70" r="45" fill="rgba(139, 0, 0, 0.9)" />

                    {/* Petal-like protrusions */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = 100 + Math.cos(rad) * 45;
                        const y = 70 + Math.sin(rad) * 45;
                        const tipX = 100 + Math.cos(rad) * 65;
                        const tipY = 70 + Math.sin(rad) * 65;

                        return (
                            <path
                                key={i}
                                d={`M ${x} ${y} Q ${tipX} ${tipY} ${x} ${y}`}
                                stroke="rgba(139, 0, 0, 0.9)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                            />
                        );
                    })}

                    {/* Arms */}
                    <path
                        d="M 65 150 Q 30 160 20 180"
                        stroke="rgba(139, 0, 0, 0.9)"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 135 150 Q 170 160 180 180"
                        stroke="rgba(139, 0, 0, 0.9)"
                        strokeWidth="15"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Claws */}
                    <path
                        d="M 20 180 L 10 190 M 20 180 L 15 195 M 20 180 L 25 192"
                        stroke="rgba(139, 0, 0, 0.9)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 180 180 L 190 190 M 180 180 L 185 195 M 180 180 L 175 192"
                        stroke="rgba(139, 0, 0, 0.9)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Animations */}
            <style>{`
        @keyframes slideLeftToRight {
          0% {
            left: -20%;
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            left: 120%;
            opacity: 0;
          }
        }

        @keyframes slideRightToLeft {
          0% {
            right: -20%;
            left: auto;
            opacity: 0;
            transform: scaleX(-1);
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            right: 120%;
            left: auto;
            opacity: 0;
            transform: scaleX(-1);
          }
        }

        @keyframes slideTopToBottom {
          0% {
            top: -20%;
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            top: 120%;
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
};

export default Demogorgon;
