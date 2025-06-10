import Header from "../components/Header";
import Footer from "../components/Footer";
import Timer from "../components/Timer";

function Pomo() {
  return (
    <div className="relative z-0 font-quicksand text-slate-800">
      <Header description="Ready to focus?" />
      <Timer />
      <Footer />
    </div>
  );
}

export default Pomo;
