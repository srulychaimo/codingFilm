import { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import SectionSlider from "../components/SectionSlider/SectionSlider";
import {
  getPopular,
  getUpcoming,
  getTopRated,
} from "../service/tmdbApiService";

const HomeScreen = () => {
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const resulet = await getPopular();
      setPopular(resulet);
    };
    getPopularMovies();
    const getUpcomingMovies = async () => {
      const resulet = await getUpcoming();
      setUpcoming(resulet);
    };
    getUpcomingMovies();
    const getTopRatedMovies = async () => {
      const resulet = await getTopRated();
      setTopRated(resulet);
    };
    getTopRatedMovies();
  }, []);

  return (
    <>
      <HeroSlider />
      <SectionSlider movies={popular} title="Popular Movies" />
      <SectionSlider movies={upcoming} title="Upcoming Movies" />
      <SectionSlider movies={topRated} title="Top Rated Movies" />
    </>
  );
};

export default HomeScreen;
