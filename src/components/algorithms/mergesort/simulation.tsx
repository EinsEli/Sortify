import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generateRandomArray } from "@/lib/simulation";
import SimulationControls from "@/components/info-page/simulation-controls";
import { useState, useRef, useEffect } from "react";
import { generateSound } from "@/lib/sound-manager";
import { usePlayAudio } from "@/components/layout/context";
import TimerDisplay, { TimerRef } from "@/components/info-page/timer";

export type SimulationState = "idle" | "running" | "paused" | "finished";
export type SimulationData = { array: number[] };

export default function Simulation() {
	const [simulationState, setSimulationState] =
		useState<SimulationState>("idle");
	const [data, setData] = useState(generateRandomArray(10, 1, 100));
	const [delay, setDelay] = useState(585);
	const delayRef = useRef(delay);
	const dataRef = useRef(data);
	const simulationStateRef = useRef(simulationState);
	const { playAudio } = usePlayAudio();
	const playAudioRef = useRef(playAudio);
	const timerRef = useRef<TimerRef>(null!);

	useEffect(() => {
		playAudioRef.current = playAudio;
	}, [playAudio]);

	useEffect(() => {
		delayRef.current = delay;
	}, [delay]);

	useEffect(() => {
		dataRef.current = data;
	}, [data]);

	useEffect(() => {
		simulationStateRef.current = simulationState;
	}, [simulationState]);

	async function highlightCells(
		indices: number[],
		time: number,
		color: string
	) {
		indices.forEach((index) => {
			data[index].fill = color;
		});
		setData([...data]);
		await new Promise((r) => setTimeout(r, time));
		dataRef.current = [...data];
	}

	/*
		Run the simulation of the sorting algorithm.
	 */
	async function mergeSort() {
		timerRef.current?.start();
		await mergeSortHelper(0, data.length - 1);
		timerRef.current?.pause();
		for (let i = 0; i < data.length; i++) {
			if (playAudioRef.current)
				await generateSound(data[i].value * 10, 100);
			await highlightCells([i], 10, "hsl(var(--accent-green))");
		}
	}

	async function mergeSortHelper(start: number, end: number) {
		if (start >= end) return;
		const mid = Math.floor((start + end) / 2);
		await mergeSortHelper(start, mid);
		await mergeSortHelper(mid + 1, end);
		await merge(start, mid, end);
	}

	async function merge(start: number, mid: number, end: number) {
		const left = data.slice(start, mid + 1);
		const right = data.slice(mid + 1, end + 1);
		let i = 0,
			j = 0,
			k = start;

		while (i < left.length && j < right.length) {
			// If the simulation is paused, wait for it to resume
			if (simulationStateRef.current === "paused") {
				await new Promise((resolve) => {
					const checkPause = setInterval(() => {
						if (simulationStateRef.current === "running") {
							clearInterval(checkPause);
							resolve(null);
						}
					}, 50);
				});
			}
			if (left[i].value <= right[j].value) {
				data[k] = left[i];
				i++;
			} else {
				data[k] = right[j];
				j++;
			}
			if (playAudioRef.current)
				await generateSound(data[k].value * 10, 100);
			k++;
		}

		while (i < left.length) {
			// If the simulation is paused, wait for it to resume
			if (simulationStateRef.current === "paused") {
				await new Promise((resolve) => {
					const checkPause = setInterval(() => {
						if (simulationStateRef.current === "running") {
							clearInterval(checkPause);
							resolve(null);
						}
					}, 50);
				});
			}
			data[k] = left[i];
			i++;
			if (playAudioRef.current)
				await generateSound(data[k].value * 10, 100);
			k++;
		}

		while (j < right.length) {
			// If the simulation is paused, wait for it to resume
			if (simulationStateRef.current === "paused") {
				await new Promise((resolve) => {
					const checkPause = setInterval(() => {
						if (simulationStateRef.current === "running") {
							clearInterval(checkPause);
							resolve(null);
						}
					}, 50);
				});
			}
			data[k] = right[j];
			j++;
			if (playAudioRef.current)
				await generateSound(data[k].value * 10, 100);
			k++;
		}

		await highlightCells(
			Array.from({ length: end - start + 1 }, (_, i) => start + i),
			delayRef.current,
			"hsl(var(--accent-blue))"
		);
		await new Promise((r) => setTimeout(r, delayRef.current));
		await highlightCells(
			Array.from({ length: end - start + 1 }, (_, i) => start + i),
			delayRef.current,
			"hsl(var(--primary))"
		);
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<SimulationControls
				onStart={mergeSort}
				simulationState={simulationState}
				setSimulationState={setSimulationState}
				data={data}
				setData={setData}
				delay={delay}
				setDelay={setDelay}
				timerRef={timerRef}
			/>
			<Card className="w-full h-full flex flex-col">
				<CardHeader className="flex flex-col pb-2">
					<CardTitle className="text-xl font-semibold flex flex-row justify-between">
						Simulation
						<TimerDisplay ref={timerRef} />
					</CardTitle>
					<CardDescription>
						Use the controls above to start, pause, or reset the
						simulation or adjust the speed of the sorting algorithm.
						<br />
						Elements highlighted in{" "}
						<b className="text-blue-500">blue</b> are getting
						merged.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow flex flex-col">
					<div className="mt-4 flex-grow">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<Bar dataKey="value">
									{dataRef.current.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.fill}
										/>
									))}
								</Bar>
								<XAxis dataKey="value" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
