import React from "react";
import styles from "./ModalSearch.module.scss";
import { SquareX } from "lucide-react";
export function ModalSearch({ closeModal }) {
  return (
    <div className={styles.ModalSearch}>
      <button className={styles["ModalSearch__btn-close"]} onClick={closeModal}>
        <SquareX style={{ color: "white" }} size={25}></SquareX>
      </button>
      <form action="">
        <label htmlFor="search">Введите название фильма</label>
        <input type="text" id="search" />
        <input type="button" value="Найти" />
      </form>
    </div>
  );
}
