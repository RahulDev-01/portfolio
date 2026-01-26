import React, { useState, useEffect } from 'react';
import { useUpsideDown } from '../../contexts/UpsideDownContext';

// Access the global audio from VShapedPortalTransition
const MuteButton = () => {
    const { isUpsideDown } = useUpsideDown();
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Reset muted state when entering upside down mode
        if (isUpsideDown) {
            const audio = window.strangerThingsAudio;
            if (audio) {
                setIsMuted(audio.muted);
            }
        }
    }, [isUpsideDown]);

    const toggleMute = () => {
        const audio = window.strangerThingsAudio;
        if (audio) {
            audio.muted = !audio.muted;
            setIsMuted(!isMuted);
        }
    };

    // Only show when in upside down mode
    if (!isUpsideDown) return null;

    return (
        <>
            <button
                onClick={toggleMute}
                className="mute-button"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    // Muted icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                ) : (
                    // Sound icon
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                )}
            </button>

            <style>{`
        .mute-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10000;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #dc2626;
          background: rgba(0, 0, 0, 0.8);
          color: #dc2626;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.5);
        }

        .mute-button:hover {
          background: rgba(220, 38, 38, 0.2);
          transform: scale(1.1);
          box-shadow: 0 0 25px rgba(220, 38, 38, 0.8);
        }

        @media (max-width: 768px) {
          .mute-button {
            width: 40px;
            height: 40px;
            bottom: 15px;
            right: 15px;
          }
        }
      `}</style>
        </>
    );
};

export default MuteButton;
