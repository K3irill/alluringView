import styles from "./FilmSection.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchFilms } from "../../hooks/useFetchFilms";

export function FilmSection({ apiUrl, TitleCollection, onFilmSelect }) {
  const { films, error } = useFetchFilms(apiUrl);

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
      <h2>{TitleCollection}</h2>
      <div className={styles["FilmSection__cards-wrapper"]}>
        <Slider {...settings}>
          {films.map((film) => {
            return (
              <div
                className={styles["FilmSection__card"]}
                key={film.kinopoiskId}
                onClick={() => onFilmSelect(film)}
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
