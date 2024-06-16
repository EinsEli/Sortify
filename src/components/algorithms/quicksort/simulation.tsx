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
import { generateSound } from "@/lib/sound-generator";
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
	async function quickSort() {
		timerRef.current.start();
		await quickSortHelper(data, 0, data.length - 1);
		timerRef.current.pause();
		for (let i = 0; i < data.length; i++) {
			if (playAudioRef.current)
				await generateSound(data[i].value * 10, 100);
			await highlightCells([i], 20, "hsl(var(--accent-green))"); // Green color for sorted elements
		}
	}

	async function quickSortHelper(array: any, low: any, high: any) {
		if (low < high) {
			const pivotIndex = await partition(array, low, high);
			await quickSortHelper(array, low, pivotIndex - 1);
			await quickSortHelper(array, pivotIndex + 1, high);
		}
	}

	async function partition(array: any, low: any, high: any) {
		const pivot = array[low];
		[array[low], array[high]] = [array[high], array[low]];
		let i = low - 1;
		for (let j = low; j < high; j++) {
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
			await highlightCells(
				[low],
				delayRef.current,
				"hsl(var(--accent-red))"
			);
			await highlightCells(
				[j, high],
				delayRef.current,
				"hsl(var(--accent-blue))"
			);
			if (array[j].value <= pivot.value) {
				i++;
				[array[i], array[j]] = [array[j], array[i]];
			}
			if (playAudioRef.current) {
				generateSound(array[j].value * 10, 50);
				generateSound(array[high].value * 10, 50);
			}
			await highlightCells([j, high], delayRef.current, "hsl(var(--primary))");
			await highlightCells(
				[low],
				delayRef.current,
				"hsl(var(--primary))"
			);
		}
		[array[i + 1], array[high]] = [array[high], array[i + 1]];
		if (playAudioRef.current) {
			generateSound(array[i + 1].value * 10, 100);
		}
		return i + 1;
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<SimulationControls
				onStart={quickSort}
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
						<TimerDisplay ref={timerRef}/>
					</CardTitle>
					<CardDescription>
						Use the controls above to start, pause, or reset the
						simulation or adjust the speed of the sorting algorithm.
						<br />
						The <b className="text-red-500">red</b> element is the
						pivot element and elements <br /> highlighted in{" "}
						<b className="text-blue-500">blue</b> are compared
						to the pivot element.
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
