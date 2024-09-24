import styles from "./Button-round.module.scss";

export default function ButtonRound({ children }) {
  return (
    <>
      <button className={styles.button}>{children}</button>
    </>
  );
}
