import { useNavigate } from "react-router-dom";

interface MainOptionProps {
  children: string;
}

function MainOption({ children }: MainOptionProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(children.toLowerCase())}
      className="h-12 w-28 rounded-full bg-yellow-500 text-lg focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 md:h-16 md:w-36 md:text-xl lg:h-20 lg:w-48 lg:text-2xl"
    >
      {children}
    </button>
  );
}

export default MainOption;
