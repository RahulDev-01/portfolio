import React, { useEffect, useState } from 'react';

// Global audio instance so it persists after component unmounts


const VShapedPortalTransition = ({ isActive, onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Start the looping audio - store on window for global access
    if (!window.strangerThingsAudio) {
      window.strangerThingsAudio = new Audio('/sounds/Kids_48kbps.mp4');
      window.strangerThingsAudio.loop = true;
      window.strangerThingsAudio.volume = 0.5;
    }
    window.strangerThingsAudio.currentTime = 0;
    window.strangerThingsAudio.play().catch(() => { });

    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 2200),
      setTimeout(() => setStage(4), 3400),
      setTimeout(() => {
        onComplete();
        setStage(0);
        // Audio continues playing - do NOT stop it
      }, 4200)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${Math.random() * 4 + 2}px`
  }));

  return (
    <div className={`portal-transition stage-${stage}`}>
      <div className="flicker-overlay" />
      <div className="dark-bg" />
      <div className="particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>
      <div className="light-bulbs">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
          <div key={i} className={`bulb bulb-${i % 5}`}>
            <span>{letter}</span>
          </div>
        ))}
      </div>
      <div className="main-text">
        <div className="text-line text-1">THE</div>
        <div className="text-line text-2">UPSIDE</div>
        <div className="text-line text-3">DOWN</div>
      </div>
      <div className="subtitle">
        {'ENTERING...'.split('').map((char, i) => (
          <span key={i} className="char" style={{ animationDelay: `${i * 0.05}s` }}>{char}</span>
        ))}
      </div>
      <div className="final-darkness" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap');

        .portal-transition {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
        }

        .flicker-overlay {
          position: absolute;
          inset: 0;
          background: #000;
          opacity: 0;
          z-index: 200;
        }

        .portal-transition.stage-1 .flicker-overlay,
        .portal-transition.stage-2 .flicker-overlay {
          animation: intense-flicker 0.1s infinite;
        }

        @keyframes intense-flicker {
          0% { opacity: 0; }
          10% { opacity: 0.95; }
          20% { opacity: 0.1; }
          30% { opacity: 0.9; }
          40% { opacity: 0; }
          50% { opacity: 0.85; }
          60% { opacity: 0.2; }
          70% { opacity: 0.95; }
          80% { opacity: 0; }
          100% { opacity: 0; }
        }

        .dark-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%);
          z-index: 10;
        }

        .particles {
          position: absolute;
          inset: 0;
          z-index: 15;
          opacity: 0;
        }

        .portal-transition.stage-2 .particles,
        .portal-transition.stage-3 .particles {
          opacity: 1;
        }

        .particle {
          position: absolute;
          background: rgba(255, 50, 50, 0.6);
          border-radius: 50%;
          animation: float-particle 3s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
        }

        .light-bulbs {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          max-width: 80%;
          z-index: 50;
          opacity: 0;
        }

        .portal-transition.stage-1 .light-bulbs,
        .portal-transition.stage-2 .light-bulbs {
          opacity: 1;
        }

        .bulb {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Libre Baskerville', serif;
          font-size: 18px;
          font-weight: bold;
          color: #000;
          background: #333;
          animation: bulb-flicker 0.3s infinite;
        }

        .bulb-0 { animation-delay: 0s; --bulb-color: #ff4444; }
        .bulb-1 { animation-delay: 0.1s; --bulb-color: #ffaa00; }
        .bulb-2 { animation-delay: 0.2s; --bulb-color: #44ff44; }
        .bulb-3 { animation-delay: 0.15s; --bulb-color: #4444ff; }
        .bulb-4 { animation-delay: 0.25s; --bulb-color: #ff44ff; }

        @keyframes bulb-flicker {
          0%, 40%, 100% { 
            background: #222;
            color: #444;
            box-shadow: none;
          }
          50%, 70% { 
            background: var(--bulb-color);
            color: #000;
            box-shadow: 0 0 20px var(--bulb-color), 0 0 40px var(--bulb-color);
          }
        }

        .main-text {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 100;
          opacity: 0;
        }

        .portal-transition.stage-2 .main-text,
        .portal-transition.stage-3 .main-text {
          opacity: 1;
        }

        .text-line {
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          color: #dc2626;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          text-shadow: 
            0 0 10px rgba(220, 38, 38, 0.8),
            0 0 20px rgba(220, 38, 38, 0.6),
            0 0 40px rgba(220, 38, 38, 0.4);
          animation: text-glow 0.5s infinite alternate;
        }

        .text-1 { font-size: 2rem; opacity: 0; animation: text-appear 0.3s 0.2s forwards; }
        .text-2 { font-size: 4rem; opacity: 0; animation: text-appear 0.3s 0.4s forwards; }
        .text-3 { font-size: 4rem; opacity: 0; animation: text-appear 0.3s 0.6s forwards; }

        @keyframes text-appear {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes text-glow {
          0% { text-shadow: 0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.6); }
          100% { text-shadow: 0 0 20px rgba(220, 38, 38, 1), 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.6); }
        }

        .portal-transition.stage-3 .text-line {
          animation: glitch-text 0.1s infinite;
        }

        @keyframes glitch-text {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0); }
        }

        .subtitle {
          position: absolute;
          bottom: 25%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 100;
          opacity: 0;
        }

        .portal-transition.stage-2 .subtitle,
        .portal-transition.stage-3 .subtitle {
          opacity: 1;
        }

        .char {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.5rem;
          color: #888;
          animation: char-flicker 0.2s infinite;
        }

        @keyframes char-flicker {
          0%, 60%, 100% { color: #444; }
          30%, 80% { color: #dc2626; text-shadow: 0 0 10px #dc2626; }
        }

        .final-darkness {
          position: absolute;
          inset: 0;
          background: #000;
          opacity: 0;
          z-index: 300;
          transition: opacity 0.8s;
        }

        .portal-transition.stage-4 .final-darkness {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .text-1 { font-size: 1.5rem; }
          .text-2, .text-3 { font-size: 2.5rem; }
          .bulb { width: 30px; height: 30px; font-size: 14px; }
          .char { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default VShapedPortalTransition;
