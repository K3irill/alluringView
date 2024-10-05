export async function fetchFilms(url) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
        url,
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

