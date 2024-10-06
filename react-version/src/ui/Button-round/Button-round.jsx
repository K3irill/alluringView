import { ThemeContext } from "../../theme/ThemeContext";
import styles from "./Button-round.module.scss";
import { useContext, useState } from "react";

export default function ButtonRound({ onClick, children }) {
  const [isRotating, setIsRotating] = useState(false);
  const {theme} = useContext(ThemeContext);

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
      className={`${styles.button} ${isRotating ? styles.rotating : ""} ${theme === "dark" ? styles["button--dark"] : styles["button--light"]}`}
    >
      {children}
    </button>
  );
}
