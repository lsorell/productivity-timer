import "./App.css";
import { Timer, Button } from "./components";
import { useTimer } from "./hooks/useTimer";

function App() {
  const { time, bankTime, useTime, pause, reset } = useTimer();

  return (
    <div className="app">
      <Timer time={time} />
      <div className="button-group">
        <Button onClick={bankTime}>Work</Button>
        <Button onClick={useTime}>Play</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

export default App;
