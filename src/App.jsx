import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fights from "./pages/Fights";
import FighterSearch from "./pages/FighterSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/fights" element={<Fights />} />
        <Route path="/search" element={<FighterSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;