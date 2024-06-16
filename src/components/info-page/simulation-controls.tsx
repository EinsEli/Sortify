import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dices, Maximize2, Minimize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SimulationState } from "../algorithms/bubblesort/simulation";
import { useFullscreen, usePlayAudio } from "@/components/layout/context";

export type SimulationControlsProps = {
	onStart: () => void;
	onReset: () => void;
	onRandomize: () => void;
	onSpeedChange: (value: number) => void;
	onArraySizeChange: (value: number) => void;
	simulationState: SimulationState;
	setSimulationState: (value: SimulationState) => void;
	children?: React.ReactNode;
};

export default function SimulationControls({
	onStart,
	onReset,
	onRandomize,
	onSpeedChange,
	onArraySizeChange,
	simulationState,
	setSimulationState,
	children,
}: SimulationControlsProps) {
	const { isFullscreen, setIsFullscreen } = useFullscreen();
	const { playAudio, setPlayAudio } = usePlayAudio();

	return (
		<div className="flex flex-row gap-4 p-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							onClick={() => {
								if (simulationState === "idle") {
									onStart();
								};
								setSimulationState("running");
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
						<Button variant={"outline"} onClick={onRandomize} disabled={simulationState === "running" || simulationState === "paused"}>
							<Dices className="h-5 w-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Generate a new random array</TooltipContent>
				</Tooltip>
				<Button variant={"destructive"} onClick={onReset} disabled={simulationState === "idle" || simulationState === "running"}>
					Reset to initial state
				</Button>
				<div className="flex flex-col gap-2 w-full">
					<Label className="w-full">Simulation Speed</Label>
					<Slider
						min={0}
						max={100}
						step={1}
						defaultValue={[50]}
						onValueChange={(value) => onSpeedChange(value[0])}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<Label className="w-full">Array Size</Label>
					<Slider
						min={3}
						max={125}
						step={1}
						defaultValue={[10]}
						onValueChange={(value) => onArraySizeChange(value[0])}
						disabled={simulationState === "running" || simulationState === "paused"}
						className={simulationState === "running" || simulationState === "paused" ? "opacity-50 cursor-wait" : ""}
					/>
				</div>
				<Button variant={"ghost"} onClick={() => setPlayAudio(!playAudio)}>
					{playAudio ? (
						<Volume2 className="h-5 w-5" />
					) : (
						<VolumeX className="h-5 w-5" />
					)}
				</Button>
				<Button variant={"ghost"} onClick={() => setIsFullscreen(!isFullscreen)}>
					{isFullscreen ? (
						<Minimize2 className="h-5 w-5" />
					) : (
						<Maximize2 className="h-5 w-5" />
					)}
				</Button>
				{children}
			</TooltipProvider>
		</div>
	);
}
