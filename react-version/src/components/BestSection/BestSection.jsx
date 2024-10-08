import BestCard from "../BestCard/BestCard";
import styles from "./BestSection.module.scss";
import { useFetchFilms } from "../../hooks/useFetchFilms.js";
import { useNavigate } from "react-router-dom";
export function BestSection({ onFilmSelect }) {
  const apiUrl =
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
  const { films, error } = useFetchFilms(apiUrl);
  const navigate = useNavigate();
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
              onClick={() => {
                onFilmSelect(item);
                console.log(item);
                
                navigate(`/film/${item.kinopoiskId}`);
              }}
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
