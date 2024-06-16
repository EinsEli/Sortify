

export function generateRandomArray(length: number, min: number, max: number): Array<{ value: number, fill: string }> {
	return Array.from({ length }, () => ({
		value: Math.floor(Math.random() * (max - min + 1)) + min,
		fill: "hsl(var(--primary))"
	}));
}