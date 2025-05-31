import FooterTomatoes from "./FooterTomatoes";
import BackBtn from "./BackBtn";

interface FooterProps {
  isHome?: true;
}

function Footer({ isHome }: FooterProps) {
  return (
    <footer className="fixed -left-2 bottom-4 text-nowrap md:text-lg lg:text-xl">
      {isHome ? (
        <>
          <FooterTomatoes />
          <FooterTomatoes />
          <FooterTomatoes />
        </>
      ) : (
        <BackBtn />
      )}
    </footer>
  );
}

export default Footer;
