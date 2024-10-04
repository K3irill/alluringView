import BestCard from "../BestCard/BestCard";
import { dataBestFilmsArr } from "./dataBestFilms";
import styles from "./BestSection.module.scss";
import { useEffect, useState } from "react";
import { fetchFilms } from "../../api/fetchFilms/fetchFilms";
export function BestSection() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilms();
        console.log(data);

        setFilms(data.items);
      } catch (err) {
        setError(err.message); // Ловим и сохраняем ошибку
      }
    }
    getFilms();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Отображаем ошибку, если есть
  }
  console.log(films);

  return (
    <div className={styles["best-section"]}>
      <h2>Best of the best</h2>
      <div className={styles["best-section__cards"]}>
        {films.slice(10, 13).map((item) => {
          return (
            <BestCard
              key={item.kinopoiskId}
              filmTitle={item.nameRu}
              filmPoster={item.posterUrl}   
                       //   filmDescription={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
