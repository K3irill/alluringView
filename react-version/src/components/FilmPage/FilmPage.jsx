import { useContext, useEffect, useRef, useState } from "react";
import styles from "./FilmPage.module.scss";
import { posterAnimation } from "./posterAnimation.js";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../theme/ThemeContext.jsx";
import { useFetchFilms } from "../../hooks/useFetchFilms.js";
import { fetchFilms } from "../../api/fetchFilms/fetchFilms.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function FilmPage({ film, onBack }) {
  const [imgs, setImg] = useState([]);
  const { theme } = useContext(ThemeContext);
  const posterContainerRef = useRef(null);
  const posterWrapRef = useRef(null);
  const navigate = useNavigate();
  function sanitizeText(text) {
    return text ? text : "n/n";
  }

  const apiImgUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.kinopoiskId}/images?type=STILL&page=1`;

  useEffect(() => {
    async function getFilms() {
      try {
        const data = await fetchFilms(apiImgUrl);
        setImg(data.items);
      } catch (err) {}
    }
    getFilms();
  }, [apiImgUrl]);

  useEffect(() => {
    if (posterWrapRef.current && posterContainerRef.current) {
      posterAnimation(posterWrapRef.current, posterContainerRef.current);
    }
  }, []);

  const settings = {
    dots: false,
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
    <div
      className={`${styles.film} ${
        theme === "dark" ? styles["film--dark"] : styles["film--light"]
      }`}
    >
      <div className={styles[("film__main-block", "film-main-block")]}>
        <div
          className={styles["film-main-block__poster-wrap"]}
          ref={posterWrapRef}
        >
          <div
            className={styles["film-main-block__poster-container"]}
            ref={posterContainerRef}
          >
            <img
              src={film.posterUrl}
              alt="Poster"
              className={styles["film-main-block__poster"]}
            />
          </div>
          <a
            href="#"
            className={`${styles["film-main-block__btn-favorite"]} ${
              theme === "dark"
                ? styles["film-main-block__btn-favorite--dark"]
                : styles["film-main-block__btn-favorite--light"]
            }`}
          >
            В ИЗБРАННОЕ
          </a>
        </div>
        <div className={styles["film-main-block__main-info"]}>
          <button onClick={() => navigate("/")} className={styles["btn-back"]}>
            НА ГЛАВНУЮ
          </button>
          <h2 className={styles["film-main-block__title"]}>{film.nameRu}</h2>
          <h3 className={styles["film-main-block__subtitle"]}>
            {film.nameOriginal}
          </h3>
          <div className={styles["fmb-main-info-wrapper"]}>
            <div className={styles["fmb-main-info-container"]}>
              <h3 className={styles["film-main-block__genres"]}>
                {sanitizeText(
                  film.genres.map((genre) => genre.genre).join(", ")
                )}
              </h3>
              <div className={styles["fmb-main-info__info"]}>
                <ul className={styles["fmb-main-info__list"]}>
                  <li className={styles["fmb-main-info__item"]}>
                    Рейтинг RU:{" "}
                    <span>{sanitizeText(film.ratingKinopoisk)}</span>
                  </li>
                  <li className={styles["fmb-main-info__item"]}>
                    Рейтинг EN: <span>{sanitizeText(film.ratingImdb)}</span>
                  </li>
                  <li className={styles["fmb-main-info__item"]}>
                    Год: <span>{sanitizeText(film.year)}</span>
                  </li>
                  <li className={styles["fmb-main-info__item"]}>
                    Страна:{" "}
                    <span>
                      {sanitizeText(
                        film.countries
                          .map((country) => country.country)
                          .join(", ")
                      )}
                    </span>
                  </li>
                  <li className={styles["fmb-main-info__item"]}>
                    Возраст от:{" "}
                    <span>
                      {sanitizeText(
                        film.ratingAgeLimits
                          ? film.ratingAgeLimits.replace(/\D/g, "")
                          : ""
                      )}
                    </span>
                  </li>
                  <li className={styles["fmb-main-info__item"]}>
                    Тип: <span>{sanitizeText(film.type)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles["fmb-main-info__links"]}>
            <a
              href={`https://w140.zona.plus/search/${film.nameRu}/`}
              className={`${styles["film-main-block__btn-favorite"]} ${styles["fmb-main-info__link"]}`}
            >
              Где посмотреть бесплатно
            </a>
          </div>
          <div className={styles["film-main-block__descriptipn-block"]}>
            <h2 className={styles["descriptipn-block__title"]}>Описание</h2>
            <p className={styles["descriptipn-block__text"]}>
              {sanitizeText(film.description)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles["film__frames-container"]}>
        <ul className={styles["frames-container__list"]}>
          <li className={styles["frames-container__item"]}>Фото</li>
          {/* <li className={styles["frames-container__item"]}>Видео</li> */}
        </ul>
        <div
          id="photo-container"
          className={`${styles["frames-container__photo-container"]} ${styles["photo-container"]}`}
        >
          <ul>
            <Slider {...settings}>
              {imgs.map((img) => {
                return (
                  <li>
                    <img
                      className={styles["photo-container_imgs"]}
                      src={img.imageUrl}
                      alt=""
                    />
                  </li>
                );
              })}
            </Slider>
          </ul>
        </div>
      </div>
    </div>
  );
}
