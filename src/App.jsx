// Importing basic routes & components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-fill bg-dark">
          {/* Getting other components by route */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route
              path="/movies"
              element={<DiscoverScreen url="movie" title="Movies" />}
            />
            <Route
              path="/movies/:id"
              element={<DetailsScreen url="movie" title="Movies" />}
            />
            <Route
              path="/tv"
              element={<DiscoverScreen url="tv" title="Tv Shows" />}
            />
            <Route
              path="/tv/:id"
              element={<DetailsScreen url="tv" title="Tv Shows" />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
