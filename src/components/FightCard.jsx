function FightCard({ fight }) {
  const [showUndercard, setShowUndercard] = useState(false);

  return (
    <div
      onClick={() => setShowUndercard(!showUndercard)}
      className="bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer hover:bg-gray-700 transition"
    >
      {/* MAIN EVENT */}
      <h3 className="text-xl font-bold mb-2">
        {fight.event}
      </h3>

      <p className="text-lg">
        {fight.fighters[0]} vs {fight.fighters[1]}
      </p>

      <p className="text-gray-400">
        {fight.date}
      </p>

      <p className="text-gray-400 mb-2">
        {fight.location}
      </p>

      <span className="bg-red-600 px-2 py-1 rounded text-sm">
        {fight.type.toUpperCase()}
      </span>

      {/* UNDERCARD */}
      {showUndercard && (
        <div className="mt-4 border-t border-gray-600 pt-4">
          <h4 className="font-bold mb-3">
            Undercard
          </h4>

          {fight.undercard.length > 0 ? (
            fight.undercard.map((match, index) => (
              <div
                key={index}
                className="mb-3 bg-gray-900 p-3 rounded-lg"
              >
                <p>
                  {match.fighters[0]} vs {match.fighters[1]}
                </p>

                <p className="text-sm text-gray-400">
                  {match.weightClass}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No undercard announced
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FightCard;