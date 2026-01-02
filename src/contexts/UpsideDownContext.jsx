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

    const toggleUpsideDown = () => {
        setIsUpsideDown(prev => !prev);
    };

    return (
        <UpsideDownContext.Provider value={{ isUpsideDown, toggleUpsideDown }}>
            {children}
        </UpsideDownContext.Provider>
    );
};
