import styles from "./Button.module.scss";

export default function Button({ children, buttonType, onClick}) {
    function handleClick(){
      onClick()
    }
  return (
    <>
      <button
        onClick={handleClick}
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
