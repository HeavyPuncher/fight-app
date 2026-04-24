import { fights } from "../data/fights";
// import FightList from "../components/FightList";

function Fights() {
    return (
        <div>
            <h2>Upcoming Fights</h2>
            {fights.map(fight =>(
                <div key={fight.id}>
                    <h3>{fight.event}</h3>
                    <h3>{fight.fighters.join(" vs ")}</h3>
                    <h3>{fight.date}</h3>
                    <h3>{fight.type}</h3>
                </div>
            ))}
        </div>
    );
}

export default Fights;