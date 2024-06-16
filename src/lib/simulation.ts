export function calculateSleepTime(speed: number) {
	const MAX_SLEEP_MS = 1500;
	const MIN_SLEEP_MS = 0;
	const sleepTime =
		MAX_SLEEP_MS - (speed * (MAX_SLEEP_MS - MIN_SLEEP_MS)) / 100;
	return sleepTime;
}

export function generateRandomArray(length: number, min: number, max: number): Array<{ value: number, fill: string }> {
	return Array.from({ length }, () => ({
		value: Math.floor(Math.random() * (max - min + 1)) + min,
		fill: "hsl(var(--primary))"
	}));
}