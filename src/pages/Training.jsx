import { useState, useEffect } from "react";

function Training() {
  const [roundLength, setRoundLength] = useState(180); // Default round length in seconds (3 minutes)
  const [time, setTime] = useState(180); // 3 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            alert("Round Over!");
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

  return (
    <div>
      <h2>Training Timer</h2>

      <h1>{formatTime(time)}</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button onClick={() => {
        setTime(180);
        setIsRunning(false);
      }}>
        Reset
      </button>
      <button onClick={() => {
        setRoundLength(180);
        setTime(180);
        }}>
        3 min
      </button>
      <button onClick={() => {
        setRoundLength(300);
        setTime(300);
        }}>
        5 min
      </button>
    </div>
  );
}

export default Training;