import {
  initializePhotoCarousel,
  initializeVideoCarousel,
} from "./carousel.js";
import { API_KEYS_KP } from "./keys.js";
import { posterAnimation } from "./posterAnimation.js";

const script = document.createElement("script");
script.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(script);

function getFilmIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("filmId");
}

const filmId = getFilmIdFromUrl();
let success = false;
let currentKeyIndex = 0;

async function generatePage() {
  while (!success && currentKeyIndex < API_KEYS_KP.length) {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/movies?kinopoiskId=${filmId}`
        // {
        //   method: "GET",
        //   headers: {
        //     "X-API-KEY": API_KEYS_KP[currentKeyIndex],
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      if (response.status === 402) {
        console.log(
          `API key limit reached for key ${API_KEYS_KP[currentKeyIndex]}. Switching to next key...`
        );
        currentKeyIndex++;
      } else if (response.ok) {
        const responseData = await response.json();
        const shortResp = responseData.items[0];

        const filmBlock = document.querySelector(".film");
        const filmContainer = document.createElement("div");
        filmContainer.classList.add("film__container", "container");

        filmContainer.innerHTML = `
          <div class="film__main-block film-main-block">
            <div class="film-main-block__poster-wrap">
              <div class="film-main-block__poster-container">
                <img src="${sanitizeUrl(shortResp.posterUrl)}" alt="Poster" class="film-main-block__poster" />
              </div>
              <a href="#" class="film-main-block__btn-favorite">В ИЗБРАННОЕ</a>
            </div>
            <div class="film-main-block__main-info fmb-main-info">
              <a href="/pages/index.html" class="btn-back">НА ГЛАВНУЮ</a>
              <h2 class="film-main-block__title">${sanitizeText(shortResp.nameRu)}</h2>
              <h2 class="film-main-block__subtitle">${sanitizeText(shortResp.nameOriginal)}</h2>
              <div class='fmb-main-info-wrapper'>
                <div class='fmb-main-info-container'>
                  <p class="film-main-block__genres">${sanitizeText(shortResp.genres.map((genre) => genre.genre).join(", "))}</p>
                  <div class="fmb-main-info__info">
                    <ul class="fmb-main-info__list">
                      <li class="fmb-main-info__item">Рейтинг RU: <span>${sanitizeText(shortResp.ratingKinopoisk)}</span></li>
                      <li class="fmb-main-info__item">Рейтинг EN: <span>${sanitizeText(shortResp.ratingImdb)}</span></li>
                      <li class="fmb-main-info__item">Год: <span>${sanitizeText(shortResp.year)}</span></li>
                      <li class="fmb-main-info__item">Страна: <span>${sanitizeText(shortResp.countries.map((country) => country.country).join(", "))}</span></li>
                      <li class="fmb-main-info__item">Возраст от: <span>${sanitizeText(shortResp.ratingAgeLimits ? shortResp.ratingAgeLimits.replace(/\D/g, "") : "")}</span></li>
                      <li class="fmb-main-info__item">Тип: <span>${sanitizeText(shortResp.type)}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class='fmb-main-info__links'>
                <a href="https://w140.zona.plus/search/${shortResp.nameRu}/" class='film-main-block__btn-favorite fmb-main-info__link'>Где посмотреть бесплатно</a>
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
            <div id='photo-container' class="frames-container__photo-container">
              <button id='ph-btn-back' class="frames-container__btn frames-container__btn-back">&lt;</button>
              <ul class="frames-container__photo-list frames-container__picture-list">
                <li class='frames-container__photo-item photo-item'><img src="..." alt=""></li>
              </ul>
              <button id='ph-btn-next' class="frames-container__btn frames-container__btn-next">&gt;</button>
            </div>
            <div id='video-container' class="frames-container__photo-container frames-container__video-container hidden">
              <button id='vd-btn-back' class="frames-container__btn frames-container__btn-back">&lt;</button>
              <ul class="frames-container__photo-list frames-container__video-list">
                <li class="frames-container__photo-item frames-container__vido-item"><video><source src='' /></video></li>
              </ul>
              <button id='vd-btn-next' class="frames-container__btn frames-container__btn-next">&gt;</button>
            </div>
            <ul class="frames-container__video-list"></ul>
          </div>
        `;

        function visible() {
          const container = document.querySelector(".frames-container__list");
          const picturesConts = document.querySelector("#photo-container");
          const videoConts = document.querySelector("#video-container");

          container.addEventListener("click", (event) => {
            if (event.target.classList.contains("frames-container__item")) {
              const isPhoto = event.target.textContent === "Фото";
              videoConts.classList.toggle("hidden", isPhoto);
              picturesConts.classList.toggle("hidden", !isPhoto);
            }
          });
        }

        filmBlock.innerHTML = "";
        filmBlock.appendChild(filmContainer);

        posterAnimation();

        const kinopoiskId = responseData.items[0].kinopoiskId;
        getPhotos(kinopoiskId);
      } else {
        console.error(`Error fetching film data: ${response.status} ${response.statusText}`);
        break;
      }
    } catch (error) {
      console.error("Error generating page:", error);

      const filmBlock = document.querySelector(".film");
      filmBlock.innerHTML = `
        <div class="page-error">
          <img class='page-error__img' src='https://i.pinimg.com/736x/5e/b8/e8/5eb8e80d46d4a44871627f46ccb07578.jpg' />
          <h1 class='page-error__title'>Ошибка^-^</h1>
          <p class='page-error__text'>Страница на которую вы попали, <span>не существует.</span></p>
          <ul class='page-error__list'>
            <li class='page-error__item'>Попробуйте:</li>
            <li class='page-error__item'><a href='index.html' class='page-error__link'>-Перейти к главной странице сайта-</a></li>
            <li class='page-error__item'>Проверить правильность введеного адреса</li>
          </ul>
        </div>
      `;
    }
  }
}

async function getPhotos(id) {
  while (!success && currentKeyIndex < API_KEYS_KP.length) {
    try {
      const resPhoto = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": API_KEYS_KP[currentKeyIndex],
            "Content-Type": "application/json",
          },
        }
      );
      const resVideo = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": API_KEYS_KP[currentKeyIndex],
            "Content-Type": "application/json",
          },
        }
      );

      if (resPhoto.status === 402) {
        console.log(
          `API key limit reached for key ${API_KEYS_KP[currentKeyIndex]}. Switching to next key...`
        );
        currentKeyIndex++;
      } else if (resPhoto.ok && resVideo.ok) {
        const resDataPh = await resPhoto.json();
        const resDataVd = await resVideo.json();
        pastePhotoList(resDataPh, resDataVd);
        success = true;
      } else {
        console.error(
          `Error fetching data: ${resPhoto.status} ${resPhoto.statusText}`
        );
        break;
      }
    } catch (error) {
      console.error("Error fetching photos and videos:", error);
    }
  }

  if (!success) {
    console.error(
      "All API keys have been exhausted or there was another error."
    );
  }
}

function pastePhotoList(resDataPh, resDataVd) {
  const photoList = document.querySelector(".frames-container__picture-list");
  const videoList = document.querySelector(".frames-container__video-list");
  photoList.innerHTML = "";
  videoList.innerHTML = "";

  resDataPh.items.forEach(photo => {
    const photoListElement = document.createElement("li");
    photoListElement.classList.add("frames-container__photo-item");
    photoListElement.innerHTML = `<img src="${photo.imageUrl}" alt="">`;
    photoList.appendChild(photoListElement);
  });

  resDataVd.items.forEach(video => {
    const videoListElement = document.createElement("li");
    videoListElement.classList.add("frames-container__vido-item");

    const videoId = video.url.trim().split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId ? videoId : 0}`;
    videoListElement.innerHTML = `
      <iframe width="100%" height="100%" src="${embedUrl}" 
        title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
      </iframe>`;
    videoList.appendChild(videoListElement);
  });

  initializePhotoCarousel();
  initializeVideoCarousel();
  visible();
}

function sanitizeText(text) {
  return text ? text : "n/n";
}

function sanitizeUrl(url) {
  return url ? url : "default-poster.jpg";
}

generatePage();
