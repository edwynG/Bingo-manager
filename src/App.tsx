import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewGames from "./pages/NewGames";

function App() {
  return (
    <section className="w-full h-[620px] h-sm:h-calc-vh  min-h-[500px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/NewGames" element={<NewGames />} />
      </Routes>
    </section>
  );
}

export default App;
