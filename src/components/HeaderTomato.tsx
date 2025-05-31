interface HeaderTomatoProps {
  horizontalPos: string;
}

function HeaderTomato({ horizontalPos }: HeaderTomatoProps) {
  return (
    <div
      className={`fixed ${horizontalPos} top-6 text-2xl md:text-3xl lg:text-4xl`}
    >
      🍅
    </div>
  );
}

export default HeaderTomato;
