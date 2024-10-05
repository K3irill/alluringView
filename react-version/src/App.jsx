import "./App.css";
import Banner from "./components/Banner/Banner";
import { BestSection } from "./components/BestSection/BestSection";
import { FilmPage } from "./components/FilmPage/FilmPage";
import { PopularSection} from './components/FilmCollections/PopularSection/PopularSection'
import Header from "./components/Header/Header";
import { useState } from "react";
import {TopSection} from './components/FilmCollections/TopSection/TopSection'
import {ComicsSection} from './components/FilmCollections/ComicsSection/ComicsSection'
import {SeriesSection} from './components/FilmCollections/SeriesSection/SeriesSection'


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
            <PopularSection></PopularSection>
            <TopSection></TopSection>
            <ComicsSection></ComicsSection>
            <SeriesSection></SeriesSection>
            
          </>
        ) : (
          <FilmPage film={selectedFilm} onBack={handleBack} />
        )}
      </main>
    </>
  );
}

export default App;
