import React, { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 50 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const particles = [];
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'upside-down-particle';

            // Random positioning
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;

            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            containerRef.current.appendChild(particle);
            particles.push(particle);
        }

        return () => {
            particles.forEach(p => p.remove());
        };
    }, [count]);

    return (
        <div ref={containerRef} className="upside-down-particles-container">
            <style>{`
        .upside-down-particles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 5;
        }
        
        .upside-down-particle {
          position: absolute;
          bottom: -10px;
          background: rgba(200, 200, 200, 0.6);
          border-radius: 50%;
          animation: float-up linear infinite;
          opacity: 0;
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default FloatingParticles;
