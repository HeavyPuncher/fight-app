import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Fights from "./pages/Fights";
import Search from "./pages/Search";
import { Link } from "react-router-dom";
import Training from "./pages/Training";

function App() {
  return (
    
    <BrowserRouter>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Fights</Link> |{" "}
        <Link to="/search">Search</Link> |{" "}
        <Link to="/training">Training</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Fights />} />
        <Route path="/search" element={<Search />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;