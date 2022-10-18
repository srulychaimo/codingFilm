import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { imageURL } from "../../service/tmdbApiService";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SectionSlider = ({ movies, title }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const breakpoints = {
    300: {
      slidesPerView: 2,
    },
    450: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 4,
    },
    800: {
      slidesPerView: 5,
    },
    1100: {
      slidesPerView: 6,
    },
    1300: {
      slidesPerView: 7,
    },
  };
  return (
    <div className="pt-4 px-3 bg-dark text-white">
      <h3 className="mb-3">{title}</h3>
      <Swiper spaceBetween={10} breakpoints={breakpoints}>
        {movies.map((movie) => {
          const posterImg = `${imageURL}${movie?.poster_path}`;
          return (
            <SwiperSlide key={movie?.id} onClick={() => handleClick(movie.id)}>
              <Image src={posterImg} fluid rounded />
              <p className="text-center">{movie.title}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SectionSlider;
