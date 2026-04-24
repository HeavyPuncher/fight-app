function FightCard(){
    return (
        <div className="card">
            <h3>{fight.event}</h3>
            <p>{fight.fighters.join(" vs ")}</p>
            <p>{fight.date}</p>
            <span>{fight.type}</span>
        </div>
    );
}

export default FightCard;