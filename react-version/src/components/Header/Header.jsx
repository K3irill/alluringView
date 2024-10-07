import Button from "../../ui/Button/Button";
import ButtonRound from "../../ui/Button-round/Button-round";
import styles from "./Header.module.scss";
import { Search, SunMoon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header({ type, openModal }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/" || location.pathname === "/alluringView") {
      toast.info("Вы уже на главной странице!", {
        toastId: "home-toast",          
        position: "top-right",
        className: "custom-toast",  
        progressClassName: "custom-progress-bar", 
        autoClose: 3000,             
        hideProgressBar: false,         
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate("/");  
    }
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__button-container"]}>
          {/* <Button buttonType={"white"}>Collection</Button> */}
          <Button onClick={handleHomeClick}>Home</Button>
          <ButtonRound onClick={openModal}>
            <Search style={{ color: "white" }} size={17} />
          </ButtonRound>
        </div>
        <div className={styles["header__button-settings"]}>
          <ButtonRound onClick={toggleTheme}>
            <SunMoon
              style={{
                color: theme === "dark" ? "black" : "white",
              }}
              size={20}
            />
          </ButtonRound>
        </div>
      </header>
    </>
  );
}
