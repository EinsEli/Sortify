import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

export type TimerRef = {
  start: () => void;
  pause: () => void;
  stop: () => void;
};


const TimerDisplay = forwardRef((_props, ref) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!isRunning) {
      setStartTime(Date.now() - time);
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const stop = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - (startTime as number));
      }, 25);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isRunning, startTime]);

  useImperativeHandle(ref, () => ({
    start,
    pause,
    stop,
  }));

  return (
    <div className="flex justify-center items-center">
      <span className="text-xl font-mono text-muted-foreground/40 font-normal">
        {String(Math.floor(time / 60000)).padStart(2, "0")}:
        {String(Math.floor((time / 1000) % 60)).padStart(2, "0")}.
        {String(time % 1000).padStart(3, "0")}
      </span>
    </div>
  );
});

TimerDisplay.displayName = "Timer";

export default TimerDisplay;
