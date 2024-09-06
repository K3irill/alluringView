
class Movie {
  constructor() {
    this.initElements();
    this.getMovies(this.API_URL_POPULAR);
  }
  initElements() {
    this.API_KEY = "53cec016-7743-4165-8e20-537b2cb7130c";
    this.API_URL_POPULAR =
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=KIDS_ANIMATION_THEME&page=1";
    this.cardlist = document.querySelector("#For-Kids");
  }

  async getMovies(url) {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": this.API_KEY,
      },
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
                          alt="${item.nameRu}"
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

class Family extends Movie{
    constructor(){
        super('initElements()')
    }
}
