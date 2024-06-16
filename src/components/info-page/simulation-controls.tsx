import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Dices,
	Maximize2,
	Minimize2,
	Pause,
	Play,
	Volume2,
	VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SimulationState } from "../algorithms/bubblesort/simulation";
import { useFullscreen, usePlayAudio } from "@/components/layout/context";
import { useEffect, useRef, useState } from "react";
import { generateRandomArray } from "@/lib/simulation";

export type SimulationControlsProps = {
	onStart: () => void;
	simulationState: SimulationState;
	setSimulationState: (state: SimulationState) => void;
	data: ArrayData[];
	setData: (data: ArrayData[]) => void;
	delay: number;
	setDelay: (delay: number) => void;
	children?: React.ReactNode;
};

export type ArrayData = { value: number; fill: string };

function calculateSleepTime(speed: number) {
	const MAX_SLEEP_MS = 1500;
	const MIN_SLEEP_MS = 0;
	const sleepTime =
		MAX_SLEEP_MS - (speed * (MAX_SLEEP_MS - MIN_SLEEP_MS)) / 100;
	return sleepTime;
}

export default function SimulationControls({
	onStart,
	simulationState,
	setSimulationState,
	data,
	setData,
	delay,
	setDelay,
	children,
}: SimulationControlsProps) {
	const { isFullscreen, setIsFullscreen } = useFullscreen();
	const { playAudio, setPlayAudio } = usePlayAudio();
	const simulationStateRef = useRef(simulationState);
	const [arraySize, setArraySize] = useState(10);
	const [initialData, setInitialData] = useState(
		JSON.parse(JSON.stringify(data))
	);

	useEffect(() => {
		simulationStateRef.current = simulationState;
	}, [simulationState]);

	function handleResetArray() {
		setSimulationState("idle");
		synchronizeDataStates(JSON.parse(JSON.stringify(initialData)));
		resetArrayColors();
	};

	function handleRandomizeArray() {
		setSimulationState("idle");
		synchronizeDataStates(generateRandomArray(arraySize, 1, 100));
		resetArrayColors();
	}

	function synchronizeDataStates(data: ArrayData[]){
		setData(data);
		setInitialData(JSON.parse(JSON.stringify(data)));
	}

	function resetArrayColors() {
		for (let i = 0; i < data.length; i++) {
			data[i].fill = "hsl(var(--primary))";
		}
	}
	

	return (
		<div className="flex flex-row gap-4 p-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							onClick={async () => {
								setSimulationState("running");
								if (simulationStateRef.current === "idle") {
									await onStart();
									setSimulationState("finished");
								}
							}}
							disabled={
								simulationState === "running" ||
								simulationState === "finished"
							}
						>
							<Play className="h-5 w-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Start the simulation</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							onClick={() => {
								setSimulationState("paused");
							}}
							disabled={simulationState !== "running"}
						>
							<Pause className="h-5 w-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Pause the simulation</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							onClick={handleRandomizeArray}
							disabled={
								simulationState === "running" ||
								simulationState === "paused"
							}
						>
							<Dices className="h-5 w-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Generate a new random array</TooltipContent>
				</Tooltip>
				<Button
					variant={"destructive"}
					onClick={handleResetArray}
					disabled={
						simulationState === "idle" ||
						simulationState === "running"
					}
				>
					Reset to initial state
				</Button>
				<div className="flex flex-col gap-2 w-full">
					<Label className="w-full">Simulation Speed</Label>
					<Slider
						min={0}
						max={100}
						step={1}
						defaultValue={[50]}
						onValueChange={(value) => {
							setDelay(calculateSleepTime(value[0]));
						}}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label className="w-full">Array Size</Label>
					<Slider
						min={3}
						max={125}
						step={1}
						defaultValue={[arraySize]}
						onValueChange={(value) => {
							setArraySize(value[0]);
							synchronizeDataStates(generateRandomArray(value[0], 1, 100));
						}}
						disabled={
							simulationState === "running" ||
							simulationState === "paused"
						}
						className={
							simulationState === "running" ||
							simulationState === "paused"
								? "opacity-50 cursor-wait"
								: ""
						}
					/>
				</div>
				<Button
					variant={"ghost"}
					onClick={() => setPlayAudio(!playAudio)}
				>
					{playAudio ? (
						<Volume2 className="h-5 w-5" />
					) : (
						<VolumeX className="h-5 w-5" />
					)}
				</Button>
				<Button
					variant={"ghost"}
					onClick={() => setIsFullscreen(!isFullscreen)}
				>
					{isFullscreen ? (
						<Minimize2 className="h-5 w-5" />
					) : (
						<Maximize2 className="h-5 w-5" />
					)}
				</Button>
				{/* DEBUG */}
				<Button>{simulationState}</Button>
				<Button>{delay}</Button>
				<Button>{arraySize}</Button>
				<Button onClick={() => console.log(data)}>Log data</Button>
				{/* DEBUG */}
				{children}
			</TooltipProvider>
		</div>
	);
}
