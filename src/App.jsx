import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Fights from "./pages/Fights";
import EventDetail from "./pages/EventDetail";
import Training from "./pages/Training";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
  }`;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        {/* NAVBAR */}
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
          <nav className="mx-auto max-w-6xl flex items-center justify-between gap-4 px-4 sm:px-6 h-14">
            <Link to="/" className="text-lg font-bold tracking-tight">
              Fight<span className="text-red-500">App</span>
            </Link>
            <div className="flex gap-1">
              <NavLink to="/" end className={navLinkClass}>Fights</NavLink>
              <NavLink to="/training" className={navLinkClass}>Training</NavLink>
            </div>
          </nav>
        </header>

        {/* CONTENT */}
        <main className="flex-1 w-full mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
          <Routes>
            <Route path="/" element={<Fights />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
