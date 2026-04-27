import { useState } from "react";
import { fights } from "../data/fights";

function Search() {
    const [query, setQuery] = useState("");

    const results = fights.filter(fight => 
        fight.fighters.some(name =>
            name.toLowerCase().includes(query.toLowerCase())
        )
    );

    return (
        <div>
            <h2>Search Fighter</h2>

            <input
                placeholder="Search fighter..."
                onChange={(e) => setQuery(e.target.value)}
            />

            {results.map(fight => (
                <div key={fight.id}>
                    {fight.fighters.join(" vs ")}
                </div>
            ))}
        </div>
    );
}

export default Search;