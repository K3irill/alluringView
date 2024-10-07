import "./App.css";
import Banner from "./components/Banner/Banner";
import { BestSection } from "./components/BestSection/BestSection";
import { PopularSection } from "./components/FilmCollections/PopularSection/PopularSection";
import Header from "./components/Header/Header";
import { TopSection } from "./components/FilmCollections/TopSection/TopSection";
import { ComicsSection } from "./components/FilmCollections/ComicsSection/ComicsSection";
import { SeriesSection } from "./components/FilmCollections/SeriesSection/SeriesSection";
import { FilmPage } from "./components/FilmPage/FilmPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { ModalSearch } from "./ui/Modals/ModalSearch/ModalSearch";

Modal.setAppElement("#root");

function App() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFilmSelect = (film) => {
    setSelectedFilm(film);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Router basename="/alluringView">
      <Header openModal={openModal} />

      <Modal
        overlayClassName="modal-overlay"
        className="modal-content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ModalSearch closeModal={closeModal} />
      </Modal>

      <ToastContainer />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner onFilmSelect={handleFilmSelect} />
                <BestSection onFilmSelect={handleFilmSelect} />
                <PopularSection onFilmSelect={handleFilmSelect} />
                <TopSection onFilmSelect={handleFilmSelect} />
                <ComicsSection onFilmSelect={handleFilmSelect} />
                <SeriesSection onFilmSelect={handleFilmSelect} />
              </>
            }
          />
          <Route
            path="/film/:id"
            element={
              <FilmPage
                film={selectedFilm}
                onBack={() => setSelectedFilm(null)}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
