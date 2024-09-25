import "./App.css";
import Banner from "./components/Banner/Banner";
import { BestSection } from "./components/BestSection/BestSection";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Banner></Banner>
        <BestSection />
      </main>
    </>
  );
}

export default App;
