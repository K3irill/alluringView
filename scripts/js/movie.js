class Movie {
  constructor(apiUrl, elementId, moduleId) {
    this.API_URL = apiUrl;
    this.cardlist = document.querySelector(`#${elementId}`);
    this.moduleBlock = document.querySelector(`#${moduleId}`);
    this.getMovies(this.API_URL);
  }

  async getMovies(url) {
    try {
      const resp = await fetch(url);
      const respData = await resp.json();
      console.log(respData);

      this.showMovies(respData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  showMovies(data) {
    this.cardlist.innerHTML = "";
    data.items.forEach((item) => {
      const cardEl = document.createElement("li");
      cardEl.classList.add("card-item", "swiper-slide");
      cardEl.innerHTML = `
        <a href="#" class="card-link">
          <img
            src="${item.posterUrlPreview}"
            alt=""
            class="card-img"
          />
        </a>
      `;

      cardEl.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModule(item.imdbId);
        console.log(item.imdbId);
      });
      this.cardlist.appendChild(cardEl);
    });
  }

  //modal

  async openModule(id) {
    try {
      const res = await fetch("http://127.0.0.1:5000/movies?imdbId=" + id);
      const resData = await res.json();
      console.log();

      this.moduleBlock.classList.add("modal--show");

      const moduleEl = document.createElement("div");
      moduleEl.classList.add("module-movie__wrapper");
      moduleEl.innerHTML = `
                    <button class="module-movie__btn-close modal-close"><img src='/img/index/close-tab-svgrepo-com.svg'></img></button>
                    
                    <div class="module-movie__body">
                      <h2 class="module-movie__title">${resData.items[0].nameRu}</h2>
                      <div class="module-movie__about">
                        <ul class="module-movie__list">
                          <li class="module-movie__item">${resData.items[0].year}</li>
                          <li class="module-movie__item">${resData.items[0].genres.map(genre => ` ${genre.genre}`)}</li>
                          <li class="module-movie__item">${resData.items[0].ratingKinopoisk}</li>
                        </ul>
                      </div>
                      <div class="module-movie__description">${resData.items[0].description}</div>
        
                    </div>
                    <div class="module-movie__links">
                      <a href="film.html" class="module-movie__link module-movie__link-targ">Перейти</a>
                      <a href="film.html" class="module-movie__link module-movie__link-about">Подробнее</a>
                    </div>
                    <img class="module-movie__img" src="${resData.items[0].posterUrl}" alt="">
          `;
      this.moduleBlock.innerHTML = ""; // Очищаем предыдущее содержимое модального окна
      this.moduleBlock.appendChild(moduleEl); // Вставляем новое содержимое
      const closeModalBtn = this.moduleBlock.querySelector(".modal-close");
      closeModalBtn.addEventListener("click", () => {
        this.moduleBlock.classList.remove("modal--show");
        this.moduleBlock.innerHTML = "";
      });
    } catch (error) {
      alert("Upssssss:", error);
    }
  }
}
class Top20 extends Movie {
  constructor() {
    super(
      "http://127.0.0.1:5000/movies?theme=top-20",
      "Top-20",
      "module-Top-20"
    );
  }
}

class Family extends Movie {
  constructor() {
    super(
      "http://127.0.0.1:5000/movies?theme=family",
      "family",
      "module-family"
    );
  }
}

class Popular extends Movie {
  constructor() {
    super(
      "http://127.0.0.1:5000/movies?theme=popular-movie",
      "popular",
      "module-popular"
    );
  }
}

class Disaster extends Movie {
  constructor() {
    super(
      "http://127.0.0.1:5000/movies?theme=disaster",
      "disaster",
      "module-disaster"
    );
  }
}
const top20 = new Top20();
const family = new Family();
const popular = new Popular();
const disasterr = new Disaster();
