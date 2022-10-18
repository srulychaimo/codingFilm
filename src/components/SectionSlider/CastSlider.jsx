import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { imageURL } from "../../service/tmdbApiService";
import { Image } from "react-bootstrap";

const CastSlider = ({ casts, title }) => {
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
        {casts.splice(0, 20).map((cast) => {
          const posterImg = `${imageURL}${cast?.profile_path}`;

          return (
            <SwiperSlide key={cast?.cast_id}>
              <Image src={posterImg} fluid rounded />
              <p className="text-center">{cast.name}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CastSlider;
