// Imports of react hooks & fn to fetch data & components
import { useEffect, useState } from "react";
import { getFromTmdb } from "../api/tmdbApi";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import SectionSlider from "../components/SectionSlider";

const HomeScreen = () => {
  // Saving all data in a state.
  const [data, setData] = useState({});

  // useEffect will run on componentDidMount.
  useEffect(() => {
    // this is a async function to fetch all data and saving it in the data state.
    const getData = async () => {
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

    // Activates the function
    getData();
  }, []);

  return (
    <>
      {/* Show only after useEffect will run */}
      {data.popularMovies && (
        <>
          {/* Main slider component & section components */}
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
