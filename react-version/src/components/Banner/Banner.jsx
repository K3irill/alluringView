import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import styles from "./Banner.module.scss";
import stylesForBtn from "../../ui/Button/Button.module.scss";
import { imagesArr } from "./images";
import { useNavigate } from "react-router-dom";
import { useFetchFilms } from "../../hooks/useFetchFilms.js";

export default function Banner({ type, onFilmSelect }) {
  const [ibg, setIbg] = useState(imagesArr[0].url);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const apiUrl =  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
  const { films, error } = useFetchFilms(apiUrl);

  useEffect(() => {
    function changeIbg() {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imagesArr.length;
        setIbg(imagesArr[nextIndex].url);
        return nextIndex;
      });
    }

    const intervalId = setInterval(() => {
      changeIbg();
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.BigBanner}>
        <img className={styles["BigBanner__ibg"]} src={ibg} alt="" />
        <div className={styles["BigBanner__main-content"]}>
          <h1 className={styles["BigBanner__title"]}>Spirited Away</h1>
          <div className={styles["BigBanner__buttons"]}>
            <a
              href="https://ag.kinozadrot3.site/89-unesennye-prizrakami-2001.html"
              className={`${stylesForBtn.button} ${stylesForBtn["button--white"]} ${stylesForBtn["button__link"]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch
            </a>
            <Button
              onClick={() => {
                onFilmSelect(films[6]);
                navigate(`/film/370`);
              }}
              buttonType={"black"}
            >
              About
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
