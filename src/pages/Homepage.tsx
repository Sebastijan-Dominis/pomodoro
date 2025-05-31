import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMain from "../components/HomeMain";

function Homepage() {
  return (
    <div className="font-quicksand relative z-0 text-slate-800">
      <Header description="Go with the flow 😊" />
      <HomeMain />
      <Footer isHome={true} />
    </div>
  );
}

export default Homepage;
