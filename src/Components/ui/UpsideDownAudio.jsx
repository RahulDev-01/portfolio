import React, { useEffect, useRef } from 'react';

import { useUpsideDown } from '../../contexts/UpsideDownContext';

const UpsideDownAudio = () => {
    const { isFooterHovered } = useUpsideDown();
    const fadeIntervalRef = useRef(null);

    useEffect(() => {
        // We control the global audio created by VShapedPortalTransition
        const audio = window.strangerThingsAudio;

        // If audio doesn't exist yet (transition hasn't happened), do nothing
        if (!audio) return;

        // Clear any ongoing fade
        if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
        }

        if (isFooterHovered) {
            // FADE OUT
            let volume = audio.volume;
            fadeIntervalRef.current = setInterval(() => {
                if (volume > 0.05) {
                    volume = Math.max(0, volume - 0.05);
                    audio.volume = volume;
                } else {
                    audio.pause();
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current);
                        fadeIntervalRef.current = null;
                    }
                }
            }, 50);

        } else {
            // FADE IN
            // Ensure playing first
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => { });
            }

            let volume = audio.volume;
            // Target volume is 0.5 as set in VShapedPortalTransition
            const TARGET_VOL = 0.5;

            fadeIntervalRef.current = setInterval(() => {
                if (volume < TARGET_VOL) {
                    volume = Math.min(TARGET_VOL, volume + 0.02);
                    audio.volume = volume;
                } else {
                    if (fadeIntervalRef.current) {
                        clearInterval(fadeIntervalRef.current);
                        fadeIntervalRef.current = null;
                    }
                }
            }, 50);
        }

        return () => {
            if (fadeIntervalRef.current) {
                clearInterval(fadeIntervalRef.current);
            }
        };

    }, [isFooterHovered]);

    return null; // Logic only component
};

export default UpsideDownAudio;
