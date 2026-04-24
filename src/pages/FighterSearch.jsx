import { useState } from "react";
import { fights } from "../data/fights";

function FighterSearch() {
  const [query, setQuery] = useState("");

  const filtered = fights.filter(fight =>
    fight.fighters.some(name =>
      name.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div>
      <input
        placeholder="Search fighter..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map(fight => (
        <div key={fight.id}>
          {fight.fighters.join(" vs ")}
        </div>
      ))}
    </div>
  );
}

export default FighterSearch;