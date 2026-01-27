import React, { useEffect, useState } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const CustomCursor = ({ enabled = true, glowIntensity = 0.8 }) => {
    const { isUpsideDown } = useUpsideDown();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [enabled]);

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
                    width: isUpsideDown ? '24px' : '16px',
                    height: isUpsideDown ? '24px' : '16px',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.2s ease, height 0.2s ease',
                }}
            >
                {/* Main cursor dot */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: isUpsideDown
                            ? `radial-gradient(circle, rgba(220, 38, 38, ${glowIntensity}) 0%, rgba(220, 38, 38, 0.3) 50%, transparent 100%)`
                            : `radial-gradient(circle, rgba(59, 130, 246, ${glowIntensity * 0.6}) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)`,
                        boxShadow: isUpsideDown
                            ? `0 0 20px rgba(220, 38, 38, 0.7), 0 0 10px rgba(220, 38, 38, 0.5)`
                            : `0 0 15px rgba(59, 130, 246, 0.5), 0 0 8px rgba(59, 130, 246, 0.3)`,
                        transition: 'all 0.2s ease',
                    }}
                />

                {/* Outer ring */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isUpsideDown ? '40px' : '32px',
                        height: isUpsideDown ? '40px' : '32px',
                        borderRadius: '50%',
                        border: isUpsideDown
                            ? '1px solid rgba(220, 38, 38, 0.4)'
                            : '1px solid rgba(59, 130, 246, 0.4)',
                        transition: 'all 0.2s ease',
                    }}
                />
            </div>
        </>
    );
};

export default CustomCursor;
