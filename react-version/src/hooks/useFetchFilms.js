import { useState, useEffect, useRef } from "react";

export function useFetchFilms(apiUrl) {
  const [films, setFilms] = useState(() => {
    const savedFilms = localStorage.getItem(apiUrl);
    return savedFilms ? JSON.parse(savedFilms) : [];
  });
  const [error, setError] = useState(null);
  const isFetched = useRef(false);

  useEffect(() => {
    const savedFilms = localStorage.getItem(apiUrl);
    if (savedFilms) {
      isFetched.current = true;
      return;
    }

    async function getFilms() {
      try {
        const data = await fetchFilms(apiUrl);
        setFilms(data.items);
        localStorage.setItem(apiUrl, JSON.stringify(data.items));
        isFetched.current = true;
      } catch (err) {
        setError(err.message);
      }
    }

    if (!isFetched.current) {
      getFilms();
    }
  }, [apiUrl]);

  return { films, error };
}
