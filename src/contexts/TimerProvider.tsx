import {
  createContext,
  useState,
  useRef,
  type ReactNode,
  useContext,
} from "react";

export type TimerContextType = {
  interval: React.RefObject<number | null>;
  duration: number;
  time: number;
  formattedTime: string;
  onSetDuration: (value: number | ((prevState: number) => number)) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

const TimerContext = createContext<TimerContextType | null>(null);

type TimerProviderProps = {
  children: ReactNode;
};

function TimerProvider({ children }: TimerProviderProps) {
  const [duration, setDuration] = useState(30);
  const [time, setTime] = useState(duration);

  const interval = useRef<number | null>(null);

  if (interval.current && time < 0) reset();

  function start() {
    interval.current = setInterval(() => setTime((time) => time - 1), 1000);
  }

  function pause() {
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
  }

  function reset() {
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
    setTime(duration);
  }

  function updateDuration(value: string) {
    setDuration(Number(value));
    if (!interval.current) {
      setTime(Number(value));
    }
  }

  const formattedTime = formatTime(time);

  function formatTime(rawTime: number): string {
    let minutes: number | string = Math.floor(rawTime / 60);
    let seconds: number | string = rawTime % 60;
    minutes = minutes <= 9 ? `0${minutes}` : minutes;
    seconds = seconds <= 9 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  return (
    <TimerContext.Provider
      value={{
        interval: interval,
        duration: duration,
        time: time,
        formattedTime: formattedTime,
        onUpdateDuration: updateDuration,
        onStart: start,
        onPause: pause,
        onReset: reset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("TimerContext was used outside of the TimerProvider");
  }
  return context;
}

export { useTimer, TimerProvider };
