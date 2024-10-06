import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import styles from "./FilmSection.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchFilms } from "../../hooks/useFetchFilms";
import { useNavigate } from "react-router-dom";

export function FilmSection({ apiUrl, TitleCollection, onFilmSelect }) {
  const { films, error } = useFetchFilms(apiUrl);
  const { theme } = useContext(ThemeContext); 
  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["FilmSection"]}>
      <h2 className={theme === 'dark' ? styles['dark-h2'] : styles['light-h2']}>
        {TitleCollection}
      </h2>
      <div className={styles["FilmSection__cards-wrapper"]}>
        <Slider {...settings}>
          {films.map((film) => {
            return (
              <div
                className={`${styles["FilmSection__card"]} ${theme === 'dark' ? styles['dark-card'] : styles['light-card']}`}
                key={film.kinopoiskId}
                onClick={() => {
                  onFilmSelect(film);
                  navigate(`/film/${film.kinopoiskId}`);
                }}
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
