import React, { useEffect, useState, useRef } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const CustomCursor = ({ enabled = true, particleCount = 8, glowIntensity = 0.8 }) => {
    const { isUpsideDown } = useUpsideDown();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [isMoving, setIsMoving] = useState(false);
    const particleIdRef = useRef(0);
    const movementTimerRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsMoving(true);

            if (movementTimerRef.current) {
                clearTimeout(movementTimerRef.current);
            }

            movementTimerRef.current = setTimeout(() => {
                setIsMoving(false);
            }, 100);

            // REDUCED particle generation - 15% chance instead of 30%
            if (isUpsideDown && Math.random() > 0.85) {
                const newParticle = {
                    id: particleIdRef.current++,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 3 + 2,
                    opacity: 1,
                    velocityX: (Math.random() - 0.5) * 1.5,
                    velocityY: (Math.random() - 0.5) * 1.5,
                };

                setParticles((prev) => [...prev.slice(-particleCount), newParticle]);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (movementTimerRef.current) {
                clearTimeout(movementTimerRef.current);
            }
        };
    }, [enabled, isUpsideDown, particleCount]);

    // OPTIMIZED particle animation
    useEffect(() => {
        if (particles.length === 0) return;

        const animate = () => {
            setParticles((prev) => {
                const updated = prev
                    .map((particle) => ({
                        ...particle,
                        x: particle.x + particle.velocityX,
                        y: particle.y + particle.velocityY,
                        opacity: particle.opacity - 0.03,
                    }))
                    .filter((particle) => particle.opacity > 0);

                if (updated.length > 0) {
                    rafRef.current = requestAnimationFrame(animate);
                }
                return updated;
            });
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [particles.length > 0]);

    if (!enabled) return null;

    return (
        <>
            <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

            <div
                className="custom-cursor"
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isUpsideDown ? '28px' : '18px',
                    height: isUpsideDown ? '28px' : '18px',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    transform: 'translate(-50%, -50%)',
                    willChange: 'transform',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: isUpsideDown
                            ? `radial-gradient(circle, rgba(220, 38, 38, ${glowIntensity}) 0%, rgba(220, 38, 38, 0.4) 50%, transparent 100%)`
                            : `radial-gradient(circle, rgba(59, 130, 246, ${glowIntensity * 0.6}) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)`,
                        boxShadow: isUpsideDown
                            ? `0 0 15px rgba(220, 38, 38, 0.6)`
                            : `0 0 10px rgba(59, 130, 246, 0.4)`,
                    }}
                />

                {isMoving && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: isUpsideDown
                                ? '2px solid rgba(220, 38, 38, 0.3)'
                                : '2px solid rgba(59, 130, 246, 0.3)',
                        }}
                    />
                )}
            </div>

            {isUpsideDown &&
                particles.map((particle) => (
                    <div
                        key={particle.id}
                        style={{
                            position: 'fixed',
                            left: particle.x,
                            top: particle.y,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            borderRadius: '50%',
                            background: `rgba(220, 38, 38, ${particle.opacity})`,
                            boxShadow: `0 0 ${particle.size * 1.5}px rgba(220, 38, 38, ${particle.opacity * 0.6})`,
                            pointerEvents: 'none',
                            zIndex: 99998,
                            transform: 'translate(-50%, -50%)',
                            willChange: 'transform, opacity',
                        }}
                    />
                ))}
        </>
    );
};

export default CustomCursor;
