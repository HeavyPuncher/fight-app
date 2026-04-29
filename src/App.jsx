import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
import Fights from "./pages/Fights";
import Search from "./pages/Search";
import Training from "./pages/Training";

function App() {
  return (
    
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">

        {/* NAVBAR */}
        <nav className="bg-black p-4 flex gap-6 text-lg font-semibold">
          <Link to="/" className="hover:text-red-500">Fights</Link>
          <Link to="/search" className="hover:text-red-500">Search</Link>
          <Link to="/training" className="hover:text-red-500">Training</Link>
        </nav>

        {/* CONTENT */}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Fights />} />
            <Route path="/search" element={<Search />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;