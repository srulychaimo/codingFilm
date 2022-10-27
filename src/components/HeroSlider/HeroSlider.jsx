// Imports components & css from swiper library for slider & custom component
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SingleHeroSlide from "./SingleHeroSlide";
import "swiper/css";
import "swiper/css/bundle";

const HeroSlider = ({ movies }) => {
  // Getting movies as a prop
  return (
    // Swiper main slider
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
      {/* map over the movie array received by prop & retuning for each movie a single slide component */}
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <SingleHeroSlide movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
