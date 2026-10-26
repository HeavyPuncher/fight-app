import { useState, useEffect } from "react";

const ROUND_OPTIONS = [
  { label: "2 min", seconds: 120 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
];

function Training() {
  const [roundLength, setRoundLength] = useState(180); // Default round length in seconds (3 minutes)
  const [time, setTime] = useState(180);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  function selectRound(seconds) {
    setRoundLength(seconds);
    setTime(seconds);
    setIsRunning(false);
  }

  function reset() {
    setTime(roundLength);
    setIsRunning(false);
  }

  const isOver = time === 0;
  const progress = 1 - time / roundLength;

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Training Timer</h1>
      <p className="text-gray-400 text-sm mt-1 mb-6">Round timer for pad work, bag work and sparring.</p>

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">
        <div className="inline-flex w-full rounded-lg bg-gray-950 p-1 ring-1 ring-inset ring-gray-800 mb-8">
          {ROUND_OPTIONS.map(option => (
            <button
              key={option.seconds}
              onClick={() => selectRound(option.seconds)}
              className={`flex-1 py-1.5 rounded-md text-sm font-medium transition ${
                roundLength === option.seconds ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p
          className={`text-center font-mono font-bold tabular-nums text-7xl sm:text-8xl ${
            isOver ? "text-red-500" : "text-white"
          }`}
        >
          {formatTime(time)}
        </p>
        <p className="mt-2 h-5 text-center text-sm font-semibold uppercase tracking-wider text-red-400">
          {isOver ? "Round over" : isRunning ? "Fight!" : ""}
        </p>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full bg-red-600 transition-[width] duration-1000 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {isRunning ? (
            <button
              onClick={() => setIsRunning(false)}
              className="rounded-lg bg-gray-700 py-3 font-semibold hover:bg-gray-600"
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(true)}
              disabled={isOver}
              className="rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600"
            >
              {time < roundLength && !isOver ? "Resume" : "Start"}
            </button>
          )}
          <button
            onClick={reset}
            className="rounded-lg bg-gray-800 py-3 font-semibold hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Training;
