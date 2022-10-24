import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SingleHeroSlide from "./SingleHeroSlide";
import "swiper/css";
import "swiper/css/bundle";

const HeroSlider = ({ movies }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      loop={true}
      className="pb-4"
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
