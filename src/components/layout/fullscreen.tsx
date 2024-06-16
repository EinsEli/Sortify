"use client";

import React, { createContext, useState, useContext } from "react";

interface FullscreenContextProps {
	isFullscreen: boolean;
	setIsFullscreen: (value: boolean) => void;
}

const FullscreenContext = createContext<FullscreenContextProps>({
	isFullscreen: false,
	setIsFullscreen: () => {},
});

export function FullscreenProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isFullscreen, setIsFullscreen] = useState(false);

	return (
		<FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
			{children}
		</FullscreenContext.Provider>
	);
}

export const useFullscreen = (): FullscreenContextProps => {
	const context = useContext(FullscreenContext);
	if (!context) {
		throw new Error(
			"useFullscreen must be used within a FullscreenProvider"
		);
	}
	return context;
};
