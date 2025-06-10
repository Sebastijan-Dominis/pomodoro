import MainOption from "./MainOption";

function MainOptions() {
  const options = ["Pomo", "Stats"];

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
