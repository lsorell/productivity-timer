import "./Button.css";

export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
