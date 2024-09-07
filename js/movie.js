class Movie {
  constructor() {
    this.initElements();
    this.getMovies(this.API_URL_POPULAR);
  }
  initElements() {
    // this.API_KEY = "a5307cec";
    this.API_URL_POPULAR =
      `http://127.0.0.1:5000/movies?theme=top-20`;
    this.cardlist = document.querySelector("#For-Kids");
  }

  async getMovies(url) {
    const resp = await fetch(url, {
    });
    const respData = await resp.json();

    console.log(respData);

    this.showMovies(respData);
  }
  showMovies(data) {
    data.items.forEach((item) => {
      this.cardEl = document.createElement("li");
      this.cardEl.classList.add("card-item", "swiper-slide");
      this.cardEl.innerHTML = `
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
      this.cardlist.appendChild(this.cardEl);
    });
  }
}

const start = new Movie();

class Family extends Movie {
  constructor() {
    super("initElements()");
  }
}

