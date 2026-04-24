import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Fights from "./pages/Fights";
// import FighterSearch from "./pages/FighterSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;