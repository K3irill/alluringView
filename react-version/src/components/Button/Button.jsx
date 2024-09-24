import styles from "./Button.module.scss";

export default function Button({ children, buttonType }) {
  return (
    <>
      <button
        className={
          buttonType === "white"
            ? `${styles.button} ${styles["button--white"]}`
            : `${styles.button} ${styles["button--black"]}`
        }
      >
        {children}
      </button>
    </>
  );
}
