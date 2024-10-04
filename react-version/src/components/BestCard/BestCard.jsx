import styles from "./BestCard.module.scss";

export default function BestCard({
  filmTitle,
  filmDescription,
  filmPoster,
  className,
}) {
  return (
    <div className={styles["best-section__card"]}>
      <h3>{filmTitle}</h3>
      <p>{filmDescription}</p>
      <img className={styles["best-section__poster-ibg"]} src={filmPoster} alt={filmTitle} />
    </div>
  );
}
