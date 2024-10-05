import { fetchFilms } from "../../api/fetchFilms/fetchFilms";
import styles from "./FilmSection.module.scss";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function FilmSection({ apiUrl, TitleCollection }) {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilms(apiUrl);
        console.log(data);

        setFilms(data.items);
      } catch (err) {
        setError(err.message);
      }
    }
    getFilms();
  }, [apiUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className={styles["FilmSection"]}>
        <h2>{TitleCollection}</h2>
      <div className={styles["FilmSection__cards-wrapper"]}>
        <Slider {...settings}>
          {films.map((film) => {
            return (
              <div
                className={styles["FilmSection__card"]}
                key={film.kinopoiskId}
              >
                <img src={film.posterUrl} alt={film.nameRu} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
