import { useState } from "react";
import { fights } from "../data/fights";
import FightCard from "../components/FightCard";

function Fights() {
    const [filter, setFilter] = useState("all")

    const filteredFights = 
        filter === "all" 
        ? fights 
        : fights.filter(fight => fight.type === filter);

    return (
      <div>
        <h2>Upcoming Fights</h2>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("boxing")}
            className={`px-4 py-2 rounded ${
              filter === "boxing"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Boxing
          </button>

          <button
            onClick={() => setFilter("ufc")}
            className={`px-4 py-2 rounded ${
              filter === "ufc"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            UFC
          </button>

          <button
            onClick={() => setFilter("influencer")}
            className={`px-4 py-2 rounded ${
              filter === "influencer"
                ? "bg-red-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Influencer
          </button>
        </div>
  
        {filteredFights.map(fight => (
          <FightCard key={fight.id} fight={fight} />
        ))}
      </div>
    );
  }

  // testing my commit again

export default Fights;