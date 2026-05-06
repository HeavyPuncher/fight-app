import { useState } from "react";
import { fights } from "../data/fights";
import FightCard from "../components/FightCard";

function Fights() {
    const [filter, setFilter] = useState("all")

    const filteredFights = 
        filter === "all" 
        ? fights 
        : fights.filter(fight => fight.type === filter);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingFights = filteredFights.filter(fight => {
      return new Date(fight.date) >= today;
    });
    
    const previousFights = filteredFights.filter(fight => {
      return new Date(fight.date) < today;
    });

    return (
      <div>
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
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Fights</h2>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 mb-10">
            {upcomingFights.map(fight => (
              <FightCard key={fight.id} fight={fight} />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Previous Fights</h2>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            {previousFights.map(fight => (
              <FightCard key={fight.id} fight={fight} />
            ))}
          </div>
        </div>

        
      </div>
    );
  }

  // testing my commit again

export default Fights;