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
	async function bubbleSort() {
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data.length - i - 1; j++) {
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

				// Highlight the cells being compared
				const time = delayRef.current;
				await highlightCells(
					[j, j + 1],
					time,
					"hsl(var(--accent-blue))"
				);

				// Play a sound to indicate that the cells are being compared
				if (playAudioRef.current) {
					generateSound(data[j].value * 10, 50);
					generateSound(data[j + 1].value * 10, 50);
				}
				// Compare the values and swap them if necessary
				if (data[j].value > data[j + 1].value) {
					const temp = data[j].value;
					data[j].value = data[j + 1].value;
					data[j + 1].value = temp;
				}

				// Reset the color of the cells
				await highlightCells([j, j + 1], time, "hsl(var(--primary))");
			}
		}
		console.log("Sorting finished!");
		// Highlight the entire array in blue to indicate that the sorting is finished
		for (let i = 0; i < data.length; i++) {
			if (playAudioRef.current)
				await generateSound(data[i].value * 10, 100);
			await highlightCells([i], 20, "hsl(var(--accent-green))");
		}
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<SimulationControls
				onStart={bubbleSort}
				simulationState={simulationState}
				setSimulationState={setSimulationState}
				data={data}
				setData={setData}
				delay={delay}
				setDelay={setDelay}
			/>
			<Card className="w-full h-full flex flex-col">
				<CardHeader className="flex flex-col pb-2">
					<CardTitle className="text-xl font-semibold">
						Simulation
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
