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
