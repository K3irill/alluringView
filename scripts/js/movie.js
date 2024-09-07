class Movie {
  constructor(apiUrl, elementId) {
    this.API_URL = apiUrl;
    this.cardlist = document.querySelector(`#${elementId}`);
    this.getMovies(this.API_URL);
  }

  async getMovies(url) {
    try {
      const resp = await fetch(url);
      const respData = await resp.json();
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
          <p class="card-text collection-better_film-name">
            ${item.nameRu}
          </p>
        </a>
      `;
      this.cardlist.appendChild(cardEl);
    });
  }
}

class Top20 extends Movie {
  constructor() {
    super("http://127.0.0.1:5000/movies?theme=top-20", "Top-20");
  }
}

class Family extends Movie {
  constructor() {
    super("http://127.0.0.1:5000/movies?theme=family", "family");
  }
}

class Popular extends Movie {
  constructor() {
    super("http://127.0.0.1:5000/movies?theme=popular-movie", "popular");
  }
}

class Disaster extends Movie {
  constructor() {
    super("http://127.0.0.1:5000/movies?theme=disaster", "disaster");
  }
}
const top20 = new Top20();
const family = new Family();
const popular = new Popular();
const disasterr = new Disaster();