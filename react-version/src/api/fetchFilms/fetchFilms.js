export async function fetchFilms() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
        'https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1',
      {
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEY,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.warn(err);
  }
}
fetchFilms();
