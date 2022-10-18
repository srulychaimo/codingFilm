import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleMovieScreen from "./screens/SingleMovieScreen";
import MoviesScreen from "./screens/MoviesScreen";
import TvScreen from "./screens/TvScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/movies" element={<MoviesScreen />} />
            <Route path="/movies/:id" element={<SingleMovieScreen />} />
            <Route path="/tv" element={<TvScreen />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
