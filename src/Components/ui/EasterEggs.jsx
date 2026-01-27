import React, { useEffect, useState, useCallback } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

const EasterEggs = () => {
    const { isUpsideDown } = useUpsideDown();
    const [secretMessages, setSecretMessages] = useState([]);
    const [konamiActivated, setKonamiActivated] = useState(false);
    const [konamiSequence, setKonamiSequence] = useState([]);
    const [timeInUpsideDown, setTimeInUpsideDown] = useState(0);

    // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
    const KONAMI_CODE = [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
    ];

    // Stranger Things quotes and references
    const STRANGER_THINGS_QUOTES = [
        { text: "Friends don't lie.", author: "Eleven" },
        { text: "She's our friend and she's crazy!", author: "Dustin" },
        { text: "Mornings are for coffee and contemplation.", author: "Hopper" },
        { text: "I dump your ass.", author: "Eleven" },
        { text: "I may be a pretty shitty boyfriend, but turns out I'm actually a pretty damn good babysitter.", author: "Steve" },
        { text: "If anyone asks where I am, I've left the country.", author: "Murray" },
        { text: "You can't spell America without Erica.", author: "Erica" },
        { text: "Bitchin'", author: "Eleven" },
        { text: "She's our friend and she's crazy!", author: "Dustin" },
        { text: "I'm going to my friends. I'm going home.", author: "Eleven" },
    ];

    // Track time in Upside Down mode
    useEffect(() => {
        if (!isUpsideDown) {
            setTimeInUpsideDown(0);
            setSecretMessages([]);
            return;
        }

        const timer = setInterval(() => {
            setTimeInUpsideDown((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isUpsideDown]);

    // Show random messages after certain time intervals
    useEffect(() => {
        if (!isUpsideDown) return;

        // Show first message after 10 seconds
        if (timeInUpsideDown === 10) {
            addSecretMessage();
        }

        // Show additional messages every 30 seconds
        if (timeInUpsideDown > 10 && timeInUpsideDown % 30 === 0) {
            addSecretMessage();
        }
    }, [timeInUpsideDown, isUpsideDown]);

    const addSecretMessage = () => {
        const randomQuote = STRANGER_THINGS_QUOTES[Math.floor(Math.random() * STRANGER_THINGS_QUOTES.length)];
        const randomPosition = {
            top: `${Math.random() * 70 + 10}%`,
            left: `${Math.random() * 70 + 10}%`,
        };

        const newMessage = {
            id: Date.now(),
            ...randomQuote,
            ...randomPosition,
        };

        setSecretMessages((prev) => [...prev, newMessage]);

        // Remove message after 8 seconds
        setTimeout(() => {
            setSecretMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
        }, 8000);
    };

    // Konami code detection
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKonamiSequence((prev) => {
                const newSequence = [...prev, e.key];
                const relevantSequence = newSequence.slice(-KONAMI_CODE.length);

                // Check if sequence matches Konami code
                const matches = relevantSequence.every((key, index) => key === KONAMI_CODE[index]);

                if (matches && !konamiActivated) {
                    triggerKonamiEffect();
                    return [];
                }

                return relevantSequence;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiActivated]);

    const triggerKonamiEffect = () => {
        setKonamiActivated(true);

        // Play success sound if available
        const audio = new Audio('/sounds/konami-success.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => console.log('Konami sound not available'));

        // Reset after animation
        setTimeout(() => {
            setKonamiActivated(false);
        }, 5000);
    };

    return (
        <>
            {/* Secret Messages */}
            {isUpsideDown &&
                secretMessages.map((message) => (
                    <div
                        key={message.id}
                        className="secret-message"
                        style={{
                            position: 'fixed',
                            top: message.top,
                            left: message.left,
                            zIndex: 9998,
                            pointerEvents: 'none',
                            animation: 'fadeInOut 8s ease-in-out',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(10, 0, 0, 0.9)',
                                border: '2px solid rgba(220, 38, 38, 0.6)',
                                borderRadius: '8px',
                                padding: '16px 24px',
                                boxShadow: '0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 10px rgba(220, 38, 38, 0.2)',
                                maxWidth: '300px',
                            }}
                        >
                            <p
                                style={{
                                    color: '#ef4444',
                                    fontSize: '16px',
                                    fontStyle: 'italic',
                                    marginBottom: '8px',
                                    textShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                                }}
                            >
                                "{message.text}"
                            </p>
                            <p
                                style={{
                                    color: '#dc2626',
                                    fontSize: '12px',
                                    textAlign: 'right',
                                    opacity: 0.8,
                                }}
                            >
                                - {message.author}
                            </p>
                        </div>
                    </div>
                ))}

            {/* Konami Code Activation Effect */}
            {konamiActivated && (
                <div
                    className="konami-effect"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        pointerEvents: 'none',
                        animation: 'konamiFlash 5s ease-in-out',
                    }}
                >
                    {/* Portal vortex effect */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.8) 0%, rgba(220, 38, 38, 0.4) 30%, transparent 70%)',
                            animation: 'portalSpin 5s linear',
                            boxShadow: '0 0 100px rgba(220, 38, 38, 0.8), inset 0 0 50px rgba(220, 38, 38, 0.6)',
                        }}
                    />

                    {/* Success message */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            animation: 'scaleIn 1s ease-out',
                        }}
                    >
                        <h1
                            style={{
                                color: '#ef4444',
                                fontSize: '48px',
                                fontWeight: 'bold',
                                textShadow: '0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.6)',
                                marginBottom: '16px',
                            }}
                        >
                            KONAMI CODE ACTIVATED
                        </h1>
                        <p
                            style={{
                                color: '#dc2626',
                                fontSize: '24px',
                                textShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
                            }}
                        >
                            Welcome to the Upside Down...
                        </p>
                    </div>

                    {/* Particle burst */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#dc2626',
                                boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)',
                                animation: `particleBurst 2s ease-out ${i * 0.05}s`,
                                transform: `rotate(${i * 18}deg) translateY(-50px)`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Animations */}
            <style>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @keyframes konamiFlash {
          0%, 100% {
            background: transparent;
          }
          10%, 30%, 50% {
            background: rgba(220, 38, 38, 0.2);
          }
          20%, 40%, 60% {
            background: transparent;
          }
        }

        @keyframes portalSpin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(720deg) scale(3);
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes particleBurst {
          0% {
            transform: rotate(var(--rotation, 0deg)) translateY(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--rotation, 0deg)) translateY(-200px);
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
};

export default EasterEggs;
