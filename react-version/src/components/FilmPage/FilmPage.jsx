import { useEffect, useRef } from "react";
import styles from "./FilmPage.module.scss";
import { posterAnimation } from "./posterAnimation.js";

export function FilmPage({ film, onBack }) {
  const posterContainerRef = useRef(null);
  const posterWrapRef = useRef(null);

  function sanitizeText(text) {
    return text ? text : "n/n";
  }

  useEffect(() => {
    if (posterWrapRef.current && posterContainerRef.current) {
      posterAnimation(posterWrapRef.current, posterContainerRef.current);
    }
  }, []);

  return (
    <div className={styles["film"]}>
      <div className={styles[("film__main-block", "film-main-block")]}>
      <div className={styles["film-main-block__poster-wrap"]} ref={posterWrapRef}>
          <div className={styles["film-main-block__poster-container"]} ref={posterContainerRef}>
            <img
              src={film.posterUrl}
              alt="Poster"
              className={styles["film-main-block__poster"]}
            />
          </div>
          <a href="#" className={styles["film-main-block__btn-favorite"]}>
            В ИЗБРАННОЕ
          </a>
        </div>
        <div className={styles["film-main-block__main-info"]}>
          <button onClick={onBack} className={styles["btn-back"]}>
            НА ГЛАВНУЮ
          </button>
          <h2 className={styles["film-main-block__title"]}>{film.nameRu}</h2>
          <h2 className={styles["film-main-block__subtitle"]}>
            {film.nameOriginal}
          </h2>
          <div className={styles["fmb-main-info-wrapper"]}>
            <div className={styles["fmb-main-info-container"]}>
              <p className={styles["film-main-block__genres"]}>
                {sanitizeText(
                  film.genres.map((genre) => genre.genre).join(", ")
                )}
              </p>
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
            <p className={styles["descriptipn-block__text"]}>{sanitizeText(film.description)}</p>
          </div>
        </div>
      </div>
      <div className={styles["film__frames-container"]}>
        <ul className={styles["frames-container__list"]}>
          <li className={styles["frames-container__item"]}>Фото</li>
          <li className={styles["frames-container__item"]}>Видео</li>
        </ul>
        <div
          id="photo-container"
          className={styles["frames-container__photo-container"]}
        ></div>
      </div>
    </div>
  );
}
