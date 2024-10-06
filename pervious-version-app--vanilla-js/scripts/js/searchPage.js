import { API_KEYS_KP } from "./keys.js";

function getKeyswordsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("keyword");
}
console.log(getKeyswordsFromUrl());

let currentKeyIndex = 0;
let currentPage = 1;

async function requestFilms(keywords, page) {
  let success = false;
  while (!success && currentKeyIndex < API_KEYS_KP.length) {
    try {
      const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keywords}&page=${page}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": API_KEYS_KP[currentKeyIndex],
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 402) {
        console.log(
          `API key limit reached for key ${API_KEYS_KP[currentKeyIndex]}. Switching to next key...`
        );
        currentKeyIndex++;
        console.log(currentKeyIndex);
      } else if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        generateFilms(responseData);
        getPagination(responseData);
        success = true;
      }
    } catch (error) {
      console.error("Ошибка при получении данных:", error);

      if (error.message.includes("403") || error.message.includes("402")) {
        currentKeyIndex++;
        if (currentKeyIndex < API_KEYS_KP.length) {
          console.log(
            `Переключаемся на следующий API-ключ: ${currentKeyIndex}`
          );
          requestFilms(page);
        } else {
          console.error("Все API-ключи исчерпаны.");
        }
      }
    }
  }
}
function generateFilms(data) {
  const filmList = document.querySelector(".film-cards__film-list");
  filmList.innerHTML = "";

  data.films.forEach((film) => {
    const filmItem = document.createElement("li");
    const filmLink = document.createElement("a");

    filmItem.classList.add(
      "film-cards__film-item",
      "film-card",
      `film-card-${defineRate(film.rating)}`
    );
    filmLink.innerHTML = `
      <img
        class="film-card__poster"
        src="${film.posterUrlPreview}"
        alt="${film.nameRu || "Постер"}"
      />
      <p class="film-card__rating film-card__rating-${defineRate(film.rating)}">
        ${film.rating ? film.rating : "N/A"}
      </p>
    `;
    filmList.appendChild(filmItem);
    filmItem.appendChild(filmLink);

    filmLink.addEventListener("click", (e) => {
      e.preventDefault();
      let transferedFilmId = film.filmId;
      const newUrl = `film.html?filmId=${transferedFilmId}`;
      window.location.href = newUrl;
    });
  });
}

function defineRate(value) {
  if (value >= 7) {
    return "green";
  } else if (value >= 4.5) {
    return "yellow";
  } else if (value < 4.5 && value > 0) {
    return "red";
  } else {
    return "grey";
  }
}

function getPagination(data) {
  const paginationBlock = document.querySelector(
    ".film-cards__pagination-wrapper"
  );
  paginationBlock.innerHTML = "";

  for (let pgNum = 1; pgNum <= data.pagesCount; pgNum++) {
    const pagBtn = document.createElement("li");
    pagBtn.classList.add("film-cards__btn-pagination");
    pagBtn.textContent = pgNum;

    if (pgNum === currentPage) {
      pagBtn.classList.add("film-cards__btn-pagination--active");
    }

    pagBtn.addEventListener("click", function () {
      document
        .querySelectorAll(".film-cards__btn-pagination")
        .forEach((btn) =>
          btn.classList.remove("film-cards__btn-pagination--active")
        );

      pagBtn.classList.add("film-cards__btn-pagination--active");

      currentPage = pgNum;

      loadPageContent(getKeyswordsFromUrl(), currentPage);
    });

    paginationBlock.appendChild(pagBtn);
  }
}

function loadPageContent(page) {
  requestFilms(page);
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

requestFilms(getKeyswordsFromUrl(), currentPage);
