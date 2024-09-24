import Button from "../Button/Button";
import ButtonRound from "../Button-round/Button-round";
import styles from "./Header.module.scss";
import { Search, User, Bolt } from "lucide-react";
export default function Header({ type }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__button-container"]}>
          <Button buttonType={"white"}>Collection</Button>
          <Button>Catalog</Button>
          <ButtonRound>
            <Search style={{ color: "white" }} size={17} />
          </ButtonRound>
        </div>
        <div className={styles['header__button-settings']}>
          <ButtonRound>
            <User style={{ color: "white" }} size={20} />
          </ButtonRound>
          <ButtonRound>
            <Bolt style={{ color: "white" }} size={20} />
          </ButtonRound>
        </div>
      </header>
    </>
  );
}
