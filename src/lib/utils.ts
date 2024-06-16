import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

// export function generateRandomArray(length: number, min: number, max: number): Array<{ value: number, fill: string }> {
//   return [{ "value": 9, "fill": "hsl(var(--primary))" }, { "value": 62, "fill": "hsl(var(--primary))" }, { "value": 80, "fill": "hsl(var(--primary))" }, { "value": 7, "fill": "hsl(var(--primary))" }, { "value": 100, "fill": "red" }, { "value": 23, "fill": "red" }, { "value": 33, "fill": "hsl(var(--primary))" }, { "value": 94, "fill": "hsl(var(--primary))" }, { "value": 95, "fill": "hsl(var(--primary))" }, { "value": 47, "fill": "hsl(var(--primary))" }]
// }