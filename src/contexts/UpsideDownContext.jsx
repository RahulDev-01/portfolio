import React, { createContext, useContext, useState } from 'react';

const UpsideDownContext = createContext();

export const useUpsideDown = () => {
    const context = useContext(UpsideDownContext);
    if (!context) {
        throw new Error('useUpsideDown must be used within UpsideDownProvider');
    }
    return context;
};

export const UpsideDownProvider = ({ children }) => {
    const [isUpsideDown, setIsUpsideDown] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isFooterHovered, setIsFooterHovered] = useState(false);

    const toggleUpsideDown = () => {
        // Force scroll to top FIRST before starting transition
        // Use multiple methods to ensure it works
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Also try scrollIntoView on hero section
        requestAnimationFrame(() => {
            const heroSection = document.getElementById('hero-section');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'auto', block: 'start' });
            }

            // Double-check scroll position
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });

        // Start transition after ensuring scroll
        setIsTransitioning(true);
    };

    const completeTransition = () => {
        setIsTransitioning(false);
        const wasUpsideDown = isUpsideDown;
        setIsUpsideDown(prev => !prev);

        // If we're escaping FROM upside down (wasUpsideDown is true), stop the audio
        if (wasUpsideDown) {
            stopAudio();
        }
    };

    const stopAudio = () => {
        const audio = window.strangerThingsAudio;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0;
        }
    };

    return (
        <UpsideDownContext.Provider value={{
            isUpsideDown,
            isTransitioning,
            toggleUpsideDown,
            completeTransition,
            isFooterHovered,
            setIsFooterHovered,
            stopAudio
        }}>
            {children}
        </UpsideDownContext.Provider>
    );
};
