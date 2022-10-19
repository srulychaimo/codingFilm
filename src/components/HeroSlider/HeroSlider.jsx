import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SingleHeroSlide from "./SingleHeroSlide";
import "swiper/css";
import "swiper/css/bundle";
import { getFromTmdb } from "../../api/tmdbApi";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getFromTmdb({ url: "/movie/popular" });
      setMovies(results);
    };
    getMovies();
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <SingleHeroSlide movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
