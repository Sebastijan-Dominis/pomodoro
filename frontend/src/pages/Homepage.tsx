import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeMain from "../components/HomeMain";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function Homepage() {
  const auth = useContext(AuthContext);
  const username = auth?.user?.username;

  return (
    <div className="relative z-0 font-quicksand text-slate-800">
      <Header
        description={
          username
            ? `Hello, ${username}! Go with the flow 😊`
            : "Go with the flow 😊 You are logged out btw"
        }
      />
      <HomeMain />
      <Footer isHome={true} />
    </div>
  );
}

export default Homepage;
