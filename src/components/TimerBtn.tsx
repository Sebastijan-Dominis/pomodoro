import type { ReactNode } from "react";

type TimerBtnProps = {
  onClick: () => void;
  children: ReactNode;
};

function TimerBtn({ onClick, children }: TimerBtnProps) {
  return (
    <button
      className="h-8 w-24 rounded-full bg-yellow-500 md:h-12 md:w-32 md:text-lg lg:h-16 lg:w-40 lg:text-xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TimerBtn;
