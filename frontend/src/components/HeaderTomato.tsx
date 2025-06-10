interface HeaderTomatoProps {
  horizontalPos: string;
  isForm?: true;
}

function HeaderTomato({ horizontalPos, isForm }: HeaderTomatoProps) {
  return (
    <div
      className={`${isForm ? "hidden" : `fixed ${horizontalPos} top-6 text-2xl md:text-3xl lg:text-4xl`} `}
    >
      🍅
    </div>
  );
}

export default HeaderTomato;
