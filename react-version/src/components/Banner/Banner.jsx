import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import styles from "./Banner.module.scss";
import { imagesArr } from "./images";
export default function Banner({ type }) {
  const [ibg, setIbg] = useState(imagesArr[0].url);
  const [index, setIndex] = useState(0);

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
            <Button buttonType={"white"}>Watch</Button>
            <Button buttonType={"black"}>About</Button>
          </div>
        </div>
      </div>
    </>
  );
}
