import "./Timer.css";

export const Timer = ({ time }) => {
  return (
    <div className="timer">
      <p>{time}</p>
    </div>
  );
};
