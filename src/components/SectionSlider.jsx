import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { imageURL } from "../api/tmdbApi";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SectionSlider = ({ data, title, navigateTo }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/${navigateTo}/${id}`);
  };

  const breakpoints = {
    300: {
      slidesPerView: 2.5,
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
        {data &&
          data.map((item) => {
            const posterImg = `${imageURL}${
              item?.poster_path || item?.profile_path
            }`;
            return (
              <SwiperSlide key={item?.id} onClick={() => handleClick(item?.id)}>
                <Image src={posterImg} fluid rounded />
                <p className="text-center">{item.title || item.name}</p>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default SectionSlider;
