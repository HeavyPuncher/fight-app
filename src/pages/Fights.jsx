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

        <div style={{ marginBottom: "16px" }}>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("boxing")}>Boxing</button>
            <button onClick={() => setFilter("ufc")}>UFC</button>
            <button onClick={() => setFilter("influencer")}>Influencer</button>
        </div>
  
        {filteredFights.map(fight => (
          <FightCard key={fight.id} fight={fight} />
        ))}
      </div>
    );
  }

  // testing my commit again

export default Fights;