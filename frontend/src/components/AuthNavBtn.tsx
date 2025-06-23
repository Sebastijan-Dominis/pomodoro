import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthNavBtnProps {
  children: ReactNode;
}

function AuthNavBtn({ children }: AuthNavBtnProps) {
  let link: string;
  if (typeof children === "string") {
    link = children.replace(/\s/g, "").toLowerCase();
  }

  const navigate = useNavigate();

  return (
    <button
      className={`h-8 w-24 rounded-full bg-yellow-500 text-sky-950 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 md:h-12 md:w-32 md:text-lg lg:h-16 lg:w-40 lg:text-xl`}
      onClick={() => navigate(link)}
    >
      {children}
    </button>
  );
}

export default AuthNavBtn;
