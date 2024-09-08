import { carousel } from "./carousel.js";
import { posterAnimation } from "./posterAnimation.js";

function getFilmIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("filmId"); 
}

const filmId = getFilmIdFromUrl();

if (filmId) {
  console.log("ID фильма:", filmId);
}

async function generatePage() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/movies?imdbId=${filmId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    const shortResp = responseData.items[0];
    console.log(responseData);

    const filmBlock = document.querySelector(".film");
    const filmContainer = document.createElement("div");
    filmContainer.classList.add("film__container", "container");

    filmContainer.innerHTML = `
      <div class="film__main-block film-main-block">
        <div class="film-main-block__poster-wrap">
          <div class="film-main-block__poster-container">
            <img src="${sanitizeUrl(shortResp.posterUrl)}" alt="Poster" class="film-main-block__poster" />
          </div>
          <button class="film-main-block__btn-favorite">В Избранное</button>
        </div>
        <div class="film-main-block__main-info fmb-main-info">
          <a href="/pages/index.html" class="btn-back">Назад</a>
          <h2 class="film-main-block__title">${sanitizeText(shortResp.nameRu)}</h2>
          <h2 class="film-main-block__subtitle">${sanitizeText(shortResp.nameOriginal)}</h2>
          <p class="film-main-block__genres">${sanitizeText(shortResp.genres.map(genre => genre.genre).join(', '))}</p>
          <div class="fmb-main-info__info">
            <ul class="fmb-main-info__list">
              <li class="fmb-main-info__item">Рейтинг RU: <span>${sanitizeText(shortResp.ratingKinopoisk)}</span></li>
              <li class="fmb-main-info__item">Рейтинг EN: <span>${sanitizeText(shortResp.ratingImdb)}</span></li>
              <li class="fmb-main-info__item">Год: <span>${sanitizeText(shortResp.year)}</span></li>
              <li class="fmb-main-info__item">Страна: <span>${sanitizeText(shortResp.countries.map(country => country.country).join(', '))}</span></li>
              <li class="fmb-main-info__item">Возраст от: <span>${sanitizeText(shortResp.ratingAgeLimits ? shortResp.ratingAgeLimits.replace(/\D/g, '') : '')}</span></li>
              <li class="fmb-main-info__item">Тип: <span>${sanitizeText(shortResp.type)}</span></li>
            </ul>
          </div>
          <div class="film-main-block__descriptipn-block descriptipn-block">
            <h2 class="descriptipn-block__title">Description</h2>
            <p class="descriptipn-block__text">${sanitizeText(shortResp.description)}</p>
          </div>
        </div>
      </div>
      <div class="film__frames-container">
        <ul class="frames-container__list">
          <li class="frames-container__item">Фото</li>
          <li class="frames-container__item">Видео</li>
        </ul>
        <hr class="hr-frames">
        <div class="frames-container__photo-container">
          <button class="frames-container__btn frames-container__btn-back"><</button>
          <ul class="frames-container__photo-list">
            <li class="frames-container__photo-item"><img src="..." alt=""></li>
          </ul>
          <button class="frames-container__btn frames-container__btn-next">></button>
        </div>
        <ul class="frames-container__video-list"></ul>
      </div>
    `;

    filmBlock.innerHTML = "";
    filmBlock.appendChild(filmContainer);

    posterAnimation();
    carousel();
  } catch (error) {
    console.error("Error generating page:", error);

    const filmBlock = document.querySelector(".film");
    filmBlock.innerHTML = `
      <div class="page-error">
      <img class='page-error__img' src='https://i.pinimg.com/736x/5e/b8/e8/5eb8e80d46d4a44871627f46ccb07578.jpg' />
        <h1 class='page-error__title'>Ошибка^-^</h1>
        <p class='page-error__text'>Страница на которую вы попали, <span>не существует.</span></p>
        <ul class='page-error__list'>
        <li class='page-error__item'><a href='index.html' class='page-error__link'>-Перейти к главной странице сайта-</a></li>
        <li class='page-error__item'>Проверить правильность введеного адреса</li>
        <li class='page-error__item'>Пойти попить чаю</li>
        </ul>
      </div>
    `;
  }
}

generatePage();

function sanitizeText(text) {
  return text ? text : 'n/n';
}

function sanitizeUrl(url) {
  return url ? url : 'default-poster.jpg';
}
