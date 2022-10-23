import { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import SectionSlider from "../components/SectionSlider";
import { getFromTmdb } from "../api/tmdbApi";

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      const { results: popularMovies } = await getFromTmdb({
        url: "/movie/popular",
      });
      const { results: upcomingMovies } = await getFromTmdb({
        url: "/movie/upcoming",
      });
      const { results: topRatedMovies } = await getFromTmdb({
        url: "/movie/top_rated",
      });
      const { results: popularTv } = await getFromTmdb({
        url: "/tv/popular",
      });
      const { results: topRatedTv } = await getFromTmdb({
        url: "/tv/top_rated",
      });
      setData({
        popularMovies,
        upcomingMovies,
        topRatedMovies,
        popularTv,
        topRatedTv,
      });
    };
    getPopularMovies();
  }, []);

  return (
    <>
      {data.popularMovies && (
        <>
          <HeroSlider movies={data?.popularMovies} />
          <SectionSlider
            data={data?.popularMovies}
            title="Popular Movies"
            navigateTo="movies"
          />
          <SectionSlider
            data={data?.popularTv}
            title="Popular Tv Shows"
            navigateTo="tv"
          />
          <SectionSlider
            data={data?.upcomingMovies}
            title="Upcoming Movies"
            navigateTo="movies"
          />
          <SectionSlider
            data={data?.topRatedMovies}
            title="Top Rated Movies"
            navigateTo="movies"
          />
          <SectionSlider
            data={data?.topRatedTv}
            title="Top Rated Tv Shows"
            navigateTo="tv"
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
