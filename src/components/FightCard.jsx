function FightCard({ fight }) {
    return (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "12px"
      }}>
        <h3>{fight.event}</h3>
        <p><strong>{fight.fighters.join(" vs ")}</strong></p>
        <p>Date: {fight.date}</p>
        <p>Location: {fight.location}</p>
        <p>{fight.type.toUpperCase()}</p>
      </div>
    );
  }

export default FightCard;