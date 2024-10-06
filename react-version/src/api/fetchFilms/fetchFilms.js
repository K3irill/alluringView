export async function fetchFilms(url) {
  const API_KEYS = [
    import.meta.env.VITE_API_KEY_1,
    import.meta.env.VITE_API_KEY_2,
    import.meta.env.VITE_API_KEY_3

  ];
  for (let i = 0; i < API_KEYS.length; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "X-API-KEY": API_KEYS[i],
        },
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 429) { 
        console.warn(`API key ${API_KEYS[i]} exceeded the limit, switching to the next key...`);
      } else {
        console.warn(`Error with key ${API_KEYS[i]}: ${response.status}`);
      }

    } catch (err) {
      console.warn(`Request failed with key ${API_KEYS[i]}: ${err.message}`);
    }
  }

  throw new Error("All API keys failed");
}
