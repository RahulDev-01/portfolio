import React, { useEffect, useState } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const StrangerThingsLoader = () => {
    const { isUpsideDown } = useUpsideDown();
    const [dots, setDots] = useState('');
    const [lights, setLights] = useState([]);

    useEffect(() => {
        // Animated dots
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 400);

        // Generate random Christmas lights - all red in Upside Down mode
        const colors = isUpsideDown ? ['red'] : ['red', 'yellow', 'blue', 'green'];
        const generatedLights = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setLights(generatedLights);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ${isUpsideDown ? 'bg-gradient-to-br from-red-950 via-red-900 to-black' : 'bg-gradient-to-br from-blue-950 via-blue-900 to-black'}`}>
            {/* Intense static/noise overlay */}
            <div
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    animation: 'noise 0.1s infinite'
                }}
            />

            {/* Flickering Christmas lights */}
            {lights.map(light => (
                <div
                    key={light.id}
                    className="absolute w-3 h-3 rounded-full pointer-events-none"
                    style={{
                        left: light.left,
                        top: light.top,
                        backgroundColor: light.color === 'red' ? '#dc2626' :
                            light.color === 'yellow' ? '#fbbf24' :
                                light.color === 'blue' ? '#3b82f6' : '#10b981',
                        boxShadow: `0 0 10px ${light.color === 'red' ? '#dc2626' :
                            light.color === 'yellow' ? '#fbbf24' :
                                light.color === 'blue' ? '#3b82f6' : '#10b981'}`,
                        animation: `bulbFlicker ${1 + Math.random()}s infinite`,
                        animationDelay: `${light.delay}s`
                    }}
                />
            ))}

            {/* Intensive Circular Portal Transition - Multiple expanding rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* 5 Expanding concentric rings */}
                {[0, 0.5, 1, 1.5, 2].map((delay, idx) => (
                    <div key={`ring-${idx}`} className="absolute w-full h-full flex items-center justify-center">
                        <div
                            className={`w-32 h-32 rounded-full border-4 ${idx % 2 === 0 ? 'border-blue-400/50' : 'border-cyan-400/40'
                                }`}
                            style={{ animation: `expandRing 3s ease-out infinite ${delay}s` }}
                        />
                    </div>
                ))}

                {/* Rotating circular particles */}
                <div className="absolute w-96 h-96" style={{ animation: 'spin 20s linear infinite' }}>
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="absolute w-3 h-3 bg-cyan-400 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 30}deg) translateY(-200px)`,
                                boxShadow: '0 0 15px #22d3ee',
                                animation: 'particlePulse 2s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>

                {/* Central blue portal glow - pulsing intensely */}
                <div className="w-64 h-64 bg-blue-500/40 rounded-full blur-3xl absolute"
                    style={{ animation: 'intensePulse 1.5s ease-in-out infinite' }} />
                <div className="w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl absolute"
                    style={{ animation: 'intensePulse 2s ease-in-out infinite reverse' }} />
                <div className="w-48 h-48 bg-blue-600/50 rounded-full blur-2xl absolute"
                    style={{ animation: 'intensePulse 1s ease-in-out infinite' }} />
            </div>

            {/* Tentacle silhouettes */}
            <div className="absolute bottom-0 left-10 w-32 h-64 opacity-20 pointer-events-none"
                style={{ animation: 'tentacleWave 3s ease-in-out infinite' }}>
                <svg viewBox="0 0 100 200" className="w-full h-full">
                    <path d="M 50 200 Q 30 150 40 100 T 50 0" stroke="#8b0000" strokeWidth="20" fill="none" />
                </svg>
            </div>
            <div className="absolute bottom-0 right-10 w-32 h-64 opacity-20 pointer-events-none"
                style={{ animation: 'tentacleWave 2.5s ease-in-out infinite reverse' }}>
                <svg viewBox="0 0 100 200" className="w-full h-full">
                    <path d="M 50 200 Q 70 150 60 100 T 50 0" stroke="#8b0000" strokeWidth="20" fill="none" />
                </svg>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center">
                {/* Chromatic aberration effect */}
                <div className="relative">
                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-widest mb-4 relative"
                        style={{ fontFamily: 'Benguiat, Impact, serif' }}
                    >
                        {/* Red layer */}
                        <span className="absolute inset-0 text-red-600"
                            style={{
                                transform: 'translate(-2px, 0)',
                                animation: 'flicker 0.15s infinite',
                                textShadow: '0 0 20px rgba(220, 38, 38, 0.8)'
                            }}>
                            OPENING PORTAL
                        </span>
                        {/* Blue layer */}
                        <span className="absolute inset-0 text-cyan-500"
                            style={{
                                transform: 'translate(2px, 0)',
                                animation: 'flicker 0.2s infinite',
                                opacity: 0.5
                            }}>
                            OPENING PORTAL
                        </span>
                        {/* Main layer */}
                        <span className="relative text-red-500"
                            style={{
                                textShadow: `
                      0 0 10px rgba(220, 38, 38, 0.9),
                      0 0 20px rgba(220, 38, 38, 0.7),
                      0 0 30px rgba(220, 38, 38, 0.5),
                      0 0 40px rgba(220, 38, 38, 0.3)
                    `,
                                animation: 'glitch 0.3s infinite'
                            }}>
                            OPENING PORTAL
                        </span>
                    </h1>

                    {/* Loading dots */}
                    <p className="text-3xl md:text-4xl text-red-400 font-mono tracking-wider animate-pulse">
                        {dots}
                    </p>

                    {/* Warning message */}
                    <p className="text-sm md:text-base text-red-500/70 mt-4 tracking-wide"
                        style={{ animation: 'flicker 0.5s infinite' }}>
                        DO NOT TURN BACK
                    </p>
                </div>

                {/* Horizontal line with sparks */}
                <div className="mt-8 relative">
                    <div className="w-80 mx-auto h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        style={{ animation: 'lineGlow 1s ease-in-out infinite' }} />
                    <div className="absolute left-1/2 top-0 w-2 h-2 bg-red-400 rounded-full -translate-x-1/2"
                        style={{ animation: 'spark 2s linear infinite' }} />
                </div>
            </div>

            <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          41% { opacity: 0.8; }
          43% { opacity: 1; }
          45% { opacity: 0.85; }
          47% { opacity: 1; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 1px); }
          66% { transform: translate(2px, -1px); }
        }
        
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }

        @keyframes bulbFlicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        @keyframes tentacleWave {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(10px) rotate(5deg); }
        }

        @keyframes lineGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; box-shadow: 0 0 20px #dc2626; }
        }

        @keyframes spark {
          0% { left: 0%; }
          100% { left: 100%; }
        }

        @keyframes expandRing {
          0% { transform: scale(0.2); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes particlePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes intensePulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
      `}</style>
        </div>
    );
};

export default StrangerThingsLoader;
