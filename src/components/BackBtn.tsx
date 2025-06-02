import { useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 ml-8 h-8 w-20 rounded-full bg-yellow-500 text-slate-800 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 md:h-12 md:w-28 md:text-lg lg:h-16 lg:w-36 lg:text-xl"
    >
      &larr; back
    </button>
  );
}

export default BackBtn;
