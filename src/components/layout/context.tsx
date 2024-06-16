"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface FullscreenContextProps {
    isFullscreen: boolean;
    setIsFullscreen: (value: boolean) => void;
}

interface PlayAudioContextProps {
    playAudio: boolean;
    setPlayAudio: (value: boolean) => void;
}

const FullscreenContext = createContext<FullscreenContextProps>({
    isFullscreen: false,
    setIsFullscreen: () => {},
});

const PlayAudioContext = createContext<PlayAudioContextProps>({
    playAudio: false,
    setPlayAudio: () => {},
});

export function ContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);

    useEffect(() => {
        console.log("playAudio", playAudio);
    }, [playAudio]);

    useEffect(() => {
        console.log("isFullscreen", isFullscreen);
    }, [isFullscreen]);

    return (
        <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
            <PlayAudioContext.Provider value={{ playAudio, setPlayAudio }}>
                {children}
            </PlayAudioContext.Provider>
        </FullscreenContext.Provider>
    );
}

export const useFullscreen = (): FullscreenContextProps => {
    const context = useContext(FullscreenContext);
    if (!context) {
        throw new Error(
            "useFullscreen must be used within a ContextProvider"
        );
    }
    return context;
};

export const usePlayAudio = (): PlayAudioContextProps => {
    const context = useContext(PlayAudioContext);
    if (!context) {
        throw new Error(
            "usePlayAudio must be used within a ContextProvider"
        );
    }
    return context;
};