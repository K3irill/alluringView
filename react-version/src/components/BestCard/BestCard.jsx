import styles from "./BestCard.module.scss";

export default function BestCard({
  filmTitle,
  filmDescription,
  filmPoster,
  className,
  onClick
}) {
  return (
    <div className={styles["best-section__card"]} onClick={onClick}>
      <h3>{filmTitle}</h3>
      <p>{filmDescription}</p>
      <img className={styles["best-section__poster-ibg"]} src={filmPoster} alt={filmTitle} />
    </div>
  );
}
