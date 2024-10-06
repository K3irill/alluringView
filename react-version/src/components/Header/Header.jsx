import Button from "../../ui/Button/Button";
import ButtonRound from "../../ui/Button-round/Button-round";
import styles from "./Header.module.scss";
import { Search, User, SunMoon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";

export default function Header({ type }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <div className={styles["header__button-settings"]}>
          <ButtonRound>
            <User style={{ color: "white" }} size={20} />
          </ButtonRound>
          <ButtonRound onClick={toggleTheme}>
            <SunMoon
              style={{
               color: theme === "dark" ? "black"  :  "white" 
              }}
              size={20}
            />
          </ButtonRound>
        </div>
      </header>
    </>
  );
}
