import useTimer from "../contexts/useTimer";
import TimerBtn from "./TimerBtn";

function Timer() {
  const timer = useTimer();

  const {
    isRunning,
    duration,
    onUpdateDuration,
    formattedTime,
    onPause,
    onStart,
    onReset,
  } = timer;

  return (
    <main className="items-between flex h-[60dvh] flex-col items-center justify-evenly text-sky-950">
      <p className="text-3xl font-bold text-yellow-500">{formattedTime}</p>
      <TimerBtn onClick={() => (isRunning ? onPause() : onStart())}>
        {isRunning ? "Pause" : "Start"}
      </TimerBtn>
      <div className="flex w-full justify-evenly">
        <TimerBtn onClick={() => onReset()}>Reset</TimerBtn>
        <select
          className="h-8 w-24 cursor-pointer rounded-full bg-yellow-500 text-center focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 md:h-12 md:w-32 md:text-lg lg:h-16 lg:w-40 lg:text-xl"
          value={duration / 60}
          onChange={(e) => onUpdateDuration(e.target.value)}
        >
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={35}>35</option>
          <option value={40}>40</option>
          <option value={45}>45</option>
          <option value={50}>50</option>
          <option value={55}>55</option>
          <option value={60}>60</option>
        </select>
      </div>
    </main>
  );
}

export default Timer;
