import React, { useEffect, useRef } from 'react';

const UpsideDownAudio = () => {
    const audioRef = useRef(null);
    const fadeIntervalRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Start playing when component mounts
        audio.volume = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.log('Audio autoplay prevented:', err);
            });
        }

        // Fade in
        let volume = 0;
        fadeIntervalRef.current = setInterval(() => {
            if (volume < 0.3 && audio) {
                volume += 0.02;
                audio.volume = Math.min(volume, 0.3);
            } else {
                if (fadeIntervalRef.current) {
                    clearInterval(fadeIntervalRef.current);
                    fadeIntervalRef.current = null;
                }
            }
        }, 50);

        // Cleanup on unmount - IMMEDIATE STOP
        return () => {
            // Clear any existing fade interval
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
                fadeIntervalRef.current = null;
            }

            // Immediate pause and reset
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 0;
            }
        };
    }, []);

    return (
        <audio
            ref={audioRef}
            loop
            preload="auto"
            className="hidden"
            style={{ display: 'none', position: 'absolute', visibility: 'hidden' }}
        >
            {/* Using a free ambient dark sound from a public source */}
            {/* You'll need to add your audio file to the public folder */}
            <source src="/upside-down-ambient.mp3" type="audio/mpeg" />
            <source src="/upside-down-ambient.ogg" type="audio/ogg" />
        </audio>
    );
};

export default UpsideDownAudio;
