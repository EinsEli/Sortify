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
export type SimulationData = { array: number[]; fill: string };

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
	async function bogoSort() {
		timerRef.current?.start();
		while (!isSorted(dataRef.current.map((d) => d.value))) {
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
			const time = delayRef.current;
			const shuffled = shuffleArray(dataRef.current.map((d) => d.value));
			if (playAudioRef.current)
				await generateSound(shuffled[0] * 10, 100);


			for (let i = 0; i < dataRef.current.length; i++) {
				dataRef.current[i].value = shuffled[i];
			}
			setData([...dataRef.current]);
			await highlightCells(
				dataRef.current.map((_, i) => i),
				time,
				"hsl(var(--accent-blue))"
			);
		}
		timerRef.current?.pause();
		for (let i = 0; i < data.length; i++) {
			if (playAudioRef.current)
				await generateSound(data[i].value * 10, 100);
			await highlightCells([i], 20, "hsl(var(--accent-green))");
		}
	}

	function isSorted(arr: number[]) {
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < arr[i - 1]) return false;
		}
		return true;
	}

	function shuffleArray(arr: number[]) {
		const newArr = [...arr];
		for (let i = newArr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
		}
		return newArr;
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<SimulationControls
				onStart={bogoSort}
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
						compared.
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
