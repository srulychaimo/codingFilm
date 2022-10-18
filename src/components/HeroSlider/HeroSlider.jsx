import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { getPopular } from "../../service/tmdbApiService";
import SingleHeroSlide from "./SingleHeroSlide";
import "swiper/css";
import "swiper/css/bundle";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const resulet = await getPopular();
      setMovies(resulet);
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
