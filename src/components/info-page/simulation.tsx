import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generateRandomArray, calculateSleepTime } from "@/lib/utils";
import SimulationControls from "@/components/info-page/simulation-controls";
import { useState, useRef, useEffect, use } from "react";

export type SimulationState = "idle" | "running" | "paused" | "finished";
export type SimulationData = { array: number[] };

export default function Simulation() {
	const [simulationState, setSimulationState] =
		useState<SimulationState>("idle");
	const [data, setData] = useState(generateRandomArray(10, 1, 100));
	const [initialData, setInitialData] = useState(
		JSON.parse(JSON.stringify(data))
	); /* Deep copy of data */
	const [speed, setSpeed] = useState(50);
	const speedRef = useRef(speed);
	const simulationStateRef = useRef(simulationState);

	useEffect(() => {
		speedRef.current = speed;
	}, [speed]);

	useEffect(() => {
		console.log("Simulation state changed to: ", simulationState);
		simulationStateRef.current = simulationState;
	}, [simulationState]);

	/*
		Run the simulation of the sorting algorithm.
	 */
	async function handleStart() {
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data.length - i - 1; j++) {
				if (simulationStateRef.current === "paused") {
					await new Promise((resolve) => {
						const checkPause = setInterval(() => {
							if (simulationStateRef.current === "running") {
								clearInterval(checkPause);
								resolve(null);
							}
						}, 100);
					});
				}
				if (data[j].value > data[j + 1].value) {
					const temp = data[j].value;
					data[j].value = data[j + 1].value;
					data[j + 1].value = temp;
					setData([...data]);
				}
				await new Promise((resolve) => {
					const time = calculateSleepTime(speedRef.current);
					setTimeout(resolve, time);
				});
			}
		}
		setSimulationState("finished");
	}
	/*
			Reset the simulation to its initial state and stop the simulation.
		*/
	function handleReset() {
		setData(JSON.parse(JSON.stringify(initialData)));
		setInitialData(JSON.parse(JSON.stringify(initialData)));
		setSimulationState("idle");
	}

	/*
			Generate a new random array of the current size.
		*/
	function handleRandomize() {
		const newData = generateRandomArray(data.length, 1, 100);
		setData(newData);
		setInitialData(JSON.parse(JSON.stringify(newData)));
		setSimulationState("idle");
	}

	/*
			Generate a new random array of the new size.
		*/
	function handleArraySizeChange(value: number) {
		const newData = generateRandomArray(value, 1, 100);
		setData(newData);
		setInitialData(JSON.parse(JSON.stringify(newData)));
		setSimulationState("idle");
	}

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<SimulationControls
				onStart={handleStart}
				onReset={handleReset}
				onRandomize={handleRandomize}
				onSpeedChange={setSpeed}
				onArraySizeChange={handleArraySizeChange}
				setSimulationState={setSimulationState}
				simulationState={simulationState}
			/>
			<Card className="w-full h-full flex flex-col">
				<CardHeader className="flex flex-col pb-2">
					<CardTitle className="text-xl font-semibold">
						Simulation
					</CardTitle>
					<CardDescription>
						Use the controls above to start, pause, or reset the
						simulation or adjust the speed of the sorting algorithm.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow flex flex-col">
					<div className="mt-4 flex-grow">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<Bar
									dataKey="value"
									style={
										{
											fill: "hsl(var(--primary))",
											opacity: 1,
										} as React.CSSProperties
									}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
