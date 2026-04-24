import FightCard from "./FightCard";

function FightList({ fights }) {
    return (
        <div>
            {fights.map(fight => (
                <FightCard key={fight.id} fight={fight} />
            ))}
        </div>
    );
}

export default FightList;