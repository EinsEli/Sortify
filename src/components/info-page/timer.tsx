import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";

export type TimerRef = {
	start: () => void;
	pause: () => void;
	stop: () => void;
};

const TimerDisplay = forwardRef((_props, ref) => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const start = () => {
		if (!isRunning) {
			timerRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 25);
			}, 25);
			setIsRunning(true);
		}
	};

	const pause = () => {
		if (isRunning) {
			clearInterval(timerRef.current!);
			setIsRunning(false);
		}
	};

	const stop = () => {
		clearInterval(timerRef.current!);
		setTime(0);
		setIsRunning(false);
	};

	useImperativeHandle(ref, () => ({
		start,
		pause,
		stop,
	}));

	return (
		<div className="flex justify-center items-center">
			<span className="text-xl font-mono text-muted-foreground dark:text-muted font-normal">
				{String(Math.floor(time / 60000)).padStart(2, "0")}:
				{String(Math.floor((time / 1000) % 60)).padStart(2, "0")}.
				{String(time % 1000).padStart(3, "0")}
			</span>
		</div>
	);
});

TimerDisplay.displayName = "Timer";

export default TimerDisplay;
