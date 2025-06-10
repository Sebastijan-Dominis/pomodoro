import { useContext } from "react";
import { TimerContext } from "./TimerProvider";

function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("TimerContext was used outside of the TimerProvider");
  }
  return context;
}

export default useTimer;
