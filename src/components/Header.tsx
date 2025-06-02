import HeaderTomato from "./HeaderTomato";

interface HeaderProps {
  description: string;
  isForm?: true;
}

function Header({ description, isForm }: HeaderProps) {
  return (
    <header
      className={`${isForm ? "max-sm:hidden" : ""} z-2 relative font-playfair text-yellow-500`}
    >
      <HeaderTomato horizontalPos="left-2" />
      <HeaderTomato horizontalPos="right-2" />
      <h1
        className={`${isForm ? "fixed left-1/2 top-4 -translate-x-1/2" : "mt-4"} max-w-[80dvw] justify-self-center text-center text-2xl tracking-wider md:text-3xl lg:text-4xl`}
      >
        Mediterranean pomodoro
      </h1>
      <p
        className={`${isForm ? "hidden" : "mt-4 md:mt-8"} max-w-[80dvw] justify-self-center text-center text-lg md:text-xl lg:text-2xl`}
      >
        {description}
      </p>
    </header>
  );
}

export default Header;
