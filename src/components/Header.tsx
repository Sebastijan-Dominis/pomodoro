import HeaderTomato from "./HeaderTomato";

interface HeaderProps {
  description: string;
}

function Header({ description }: HeaderProps) {
  return (
    <header className="font-playfair text-yellow-500">
      <HeaderTomato horizontalPos="left-2" />
      <HeaderTomato horizontalPos="right-2" />
      <h1 className="mt-4 max-w-[80dvw] justify-self-center text-center text-2xl tracking-wider md:text-3xl lg:text-4xl">
        Mediterranean pomodoro
      </h1>
      <p className="mt-4 max-w-[80dvw] justify-self-center text-center text-lg md:mt-8 md:text-xl lg:text-2xl">
        {description}
      </p>
    </header>
  );
}

export default Header;
