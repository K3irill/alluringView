import styles from "./Button-round.module.scss";
import { useState } from "react";

export default function ButtonRound({ onClick, children }) {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClick();

    setTimeout(() => {
      setIsRotating(false);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${isRotating ? styles.rotating : ""}`}
    >
      {children}
    </button>
  );
}
