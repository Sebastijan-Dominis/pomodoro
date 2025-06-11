import MainOption from "./MainOption";
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";

function MainOptions() {
  const auth = useContext(AuthContext);
  const token = auth?.token;

  const options = ["Pomo"];

  if (token) options.push("Stats");

  return (
    <ul className="flex h-[60dvh] flex-col items-center justify-around">
      {options.map((option) => (
        <li key={option}>
          <MainOption>{option}</MainOption>
        </li>
      ))}
    </ul>
  );
}

export default MainOptions;
