import React, { useEffect, useRef } from 'react';
import useDeviceCapability from '../../hooks/useDeviceCapability';

const FloatingParticles = ({ count = 50 }) => {
  const containerRef = useRef(null);
  const { tier, reducedMotion } = useDeviceCapability();

  // Adjust count based on device capability
  const adjustedCount = reducedMotion
    ? 0
    : tier === 'low'
      ? 0
      : tier === 'medium'
        ? Math.min(count, 15)
        : count;

  useEffect(() => {
    if (!containerRef.current || adjustedCount === 0) return;

    const particles = [];
    for (let i = 0; i < adjustedCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'upside-down-particle';

      // Random positioning
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${15 + Math.random() * 15}s`;

      // Random size with variety
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Some particles glow more
      const glowIntensity = Math.random();
      if (glowIntensity > 0.8) {
        particle.classList.add('glow-particle');
      }

      containerRef.current.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, [adjustedCount]);

  // Skip rendering entirely on low tier
  if (adjustedCount === 0) return null;

  return (
    <div ref={containerRef} className="upside-down-particles-container">
      <style>{`
        .upside-down-particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 6;
        }
        
        .upside-down-particle {
          position: absolute;
          bottom: -10px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.8) 0%, rgba(139, 0, 0, 0.4) 50%, transparent 100%);
          border-radius: 50%;
          animation: float-up linear infinite;
          opacity: 0;
          will-change: transform, opacity;
        }
        
        .glow-particle {
          background: radial-gradient(circle, rgba(255, 100, 100, 0.9) 0%, rgba(220, 38, 38, 0.6) 50%, transparent 100%);
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
