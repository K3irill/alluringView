import "./App.css";
import Banner from "./components/Banner/Banner";
import { BestSection } from "./components/BestSection/BestSection";
import { FilmPage } from "./components/FilmPage/FilmPage";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleFilmSelect = (film) => {
    setSelectedFilm(film);
  };

  const handleBack = () => {
    setSelectedFilm(null);
  };

  return (
    <>
      <Header />
      <main>
        {!selectedFilm ? (
          <>
            <Banner />
            <BestSection onFilmSelect={handleFilmSelect} />
          </>
        ) : (
          <FilmPage film={selectedFilm} onBack={handleBack} />
        )}
      </main>
    </>
  );
}

export default App;
