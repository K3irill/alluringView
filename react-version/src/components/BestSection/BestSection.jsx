import BestCard from "../BestCard/BestCard";
import styles from "./BestSection.module.scss";
import { useEffect, useState } from "react";
import { fetchFilms } from "../../api/fetchFilms/fetchFilms";
export function BestSection({ onFilmSelect }) {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilms('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1');
        // console.log(data);
        
        setFilms(data.items);
      } catch (err) {
        setError(err.message);
      }
    }
    getFilms();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles["best-section"]}>
      <h2>Best of the best</h2>
      <div className={styles["best-section__cards"]}>
        {films.slice(10, 13).map((item) => {
          return (
            <BestCard
              onClick={() => onFilmSelect(item)}
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
