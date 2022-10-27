// Imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { imageURL } from "../api/tmdbApi";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

// The sectionSlider component receives the data to show on slider & title & navigate url.
const SectionSlider = ({ data, title, navigateTo }) => {
  // Using the useNavigate hook of react-router to navigate.
  const navigate = useNavigate();

  // Handle click function that will navigate the user onClick depending on where he clicks.
  const handleClick = (id) => {
    if (title === "Casts") {
      return;
    }
    if (navigateTo === "movie") {
      navigateTo = "movies";
    }
    if (id) {
      return navigate(`/${navigateTo}/${id}`);
    }
    navigate(`/${navigateTo}`);
  };

  // Breakpoints object for showing slidesPerView changing on screen size changes.
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
    // Swiper slider with title and > icon for view more.
    <div className="pt-2 px-3 bg-dark text-white">
      <div className="d-flex align-items-center">
        <h4 className="mb-3 mx-auto">{title}</h4>
        {title !== "Casts" && (
          <FaChevronRight className="mb-2" onClick={() => handleClick()} />
        )}
      </div>
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
