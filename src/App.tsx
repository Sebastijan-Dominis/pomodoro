import { BrowserRouter, Route, Routes } from "react-router-dom";

import med_sea from "./assets/img/med_sea.jpg";
import Homepage from "./pages/Homepage";
import Pomo from "./pages/Pomo";
import Stats from "./pages/Stats";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <img src={med_sea} alt="" className="-z-2 fixed inset-0 h-full w-full" />
      <div className="-z-1 fixed inset-0 bg-sky-950/75"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/pomo" element={<Pomo />}></Route>
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
