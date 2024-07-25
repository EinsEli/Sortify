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
import { TimerRef } from "./timer";

export type SimulationControlsProps = {
	onStart: () => void;
	simulationState: SimulationState;
	setSimulationState: (state: SimulationState) => void;
	data: ArrayData[];
	setData: (data: ArrayData[]) => void;
	delay: number;
	setDelay: (delay: number) => void;
	children?: React.ReactNode;
	timerRef?: React.MutableRefObject<TimerRef>;
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
	timerRef,
}: SimulationControlsProps) {
	const simulationStateRef = useRef(simulationState);

	const { isFullscreen, setIsFullscreen } = useFullscreen();
	const { playAudio, setPlayAudio } = usePlayAudio();

	const [arraySize, setArraySize] = useState(10);
	const [initialData, setInitialData] = useState(
		JSON.parse(JSON.stringify(data))
	);

	useEffect(() => {
		simulationStateRef.current = simulationState;
	}, [simulationState]);

	/*
	 * UTILS
	 */
	function synchronizeDataStates(data: ArrayData[]) {
		setData(JSON.parse(JSON.stringify(data)));
		setInitialData(JSON.parse(JSON.stringify(data)));
	}

	function resetArrayColors() {
		for (let i = 0; i < data.length; i++) {
			data[i].fill = "hsl(var(--primary))";
		}
	}

	/*
	 * HANDLERS
	 */
	function handleResetArray() {
		setSimulationState("idle");
		synchronizeDataStates(initialData);
		resetArrayColors();
		timerRef?.current.stop();
	}

	function handleRandomizeArray() {
		setSimulationState("idle");
		synchronizeDataStates(generateRandomArray(arraySize, 1, 100));
		resetArrayColors();
		timerRef?.current.stop();
	}

	function handleArraySizeChange(value: number[]) {
		setSimulationState("idle");
		setArraySize(value[0]);
		synchronizeDataStates(generateRandomArray(value[0], 1, 100));
		resetArrayColors();
		timerRef?.current.stop();
	}

	function handleSpeedChange(value: number[]) {
		setDelay(calculateSleepTime(value[0]));
	}

	function handlePause() {
		setSimulationState("paused");
		timerRef?.current.pause();
	}

	async function handleStart() {
		setSimulationState("running");
		timerRef?.current.start();
		if (simulationStateRef.current === "idle") {
			await onStart();
			setSimulationState("finished");
		}
	}

	return (
		<div className="flex flex-row gap-4 p-1 flex-wrap">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							onClick={handleStart}
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
							onClick={handlePause}
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
						simulationState === "running" ||
						simulationState === "paused"
					}
				>
					Reset to initial array
				</Button>
				<div className="flex flex-row min-w-56 gap-4">
					<div className="flex flex-col gap-2 w-full">
						<Label className="w-44 flex flex-row gap-1">
							Simulation Speed:{" "}
							<b className="text-muted-foreground font-mono">
								{delay / 1000}s
							</b>
						</Label>
						<Slider
							min={0}
							max={100}
							step={1}
							defaultValue={[60]}
							onValueChange={handleSpeedChange}
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<Label className="w-40 flex flex-row gap-1">
							Array Size:{" "}
							<b className="text-muted-foreground font-mono">
								{arraySize}
							</b>
						</Label>
						<Slider
							min={3}
							max={600 }
							step={1}
							defaultValue={[arraySize]}
							onValueChange={handleArraySizeChange}
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
				</div>
				<div className="flex flex-row gap-4">
					<Tooltip>
						<TooltipTrigger asChild>
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
						</TooltipTrigger>
						<TooltipContent>
							{playAudio ? "Disable" : "Enable"} audio
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
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
						</TooltipTrigger>
						<TooltipContent>
							{isFullscreen ? "Exit" : "Enter"} fullscreen
						</TooltipContent>
					</Tooltip>
					{children}
				</div>
			</TooltipProvider>
		</div>
	);
}
