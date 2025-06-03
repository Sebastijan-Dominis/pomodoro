import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { TimerProvider } from "./contexts/TimerProvider";
import med_sea from "./assets/img/med_sea.jpg";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pomo = lazy(() => import("./pages/Pomo"));
const Stats = lazy(() => import("./pages/Stats"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <img src={med_sea} alt="" className="fixed inset-0 -z-20 h-full w-full" />
      <div className="fixed inset-0 -z-10 bg-sky-950/75"></div>
      <TimerProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="pomo" element={<Pomo />}></Route>
              <Route path="stats" element={<Stats />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="signin" element={<Signin />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TimerProvider>
    </>
  );
}

export default App;
