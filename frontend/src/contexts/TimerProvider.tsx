import {
  createContext,
  useState,
  useRef,
  type ReactNode,
  useEffect,
  useCallback,
} from "react";

import { create_pomo } from "../api";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export type TimerContextType = {
  // interval: React.RefObject<number | null>;
  isRunning: boolean;
  duration: number;
  time: number;
  formattedTime: string;
  onUpdateDuration: (value: string) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

const TimerContext = createContext<TimerContextType | null>(null);

type TimerProviderProps = {
  children: ReactNode;
};

function TimerProvider({ children }: TimerProviderProps) {
  const [duration, setDuration] = useState(1800);
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const auth = useContext(AuthContext);
  const token = auth?.token;

  const interval = useRef<number | null>(null);

  function start() {
    if (interval.current === null) {
      interval.current = setInterval(() => setTime((time) => time - 1), 1000);
      setIsRunning(true);
    }
  }

  function pause() {
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
    setIsRunning(false);
  }

  const reset = useCallback(
    function reset() {
      if (interval.current) clearInterval(interval.current);
      interval.current = null;
      setTime(duration);
      setIsRunning(false);
    },
    [duration]
  );

  useEffect(() => {
    if (interval.current && time < 0) {
      reset();
      if (token) {
        create_pomo(token, duration);
      }
    }
  }, [time, reset]);

  function updateDuration(value: string) {
    if (!isRunning && time === duration) {
      setTime(Number(value) * 60);
    }
    setDuration(Number(value) * 60);
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
        // interval: interval,
        isRunning: isRunning,
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

export { TimerContext, TimerProvider };
