// Imports
import { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiMoviePlay } from "react-icons/bi";
import { imageURL } from "../../api/tmdbApi";
import { getWindowSize } from "../../utils/screenSize.js";
import { useOnScreenElement } from "../../utils/useOnScreen";
import classNames from "classnames";
import PlayTrailer from "../PlayTrailer";
import "../../style/buttons.css";

// a single hero slide component that receives a movie object and shows it in slide.
const SingleHeroSlide = ({ movie }) => {
  // a window size state that the initial value is the window width.
  const [windowSize, setWindowSize] = useState(getWindowSize());

  // url for images.
  const backgroundImage = `${imageURL}${movie?.backdrop_path}`;
  const posterImage = `${imageURL}${movie?.poster_path}`;

  // function that will run when screen gets resized and will change the value of window state to current screen width.
  const handleWindowResize = () => {
    setWindowSize(getWindowSize());
  };
  window.addEventListener("resize", handleWindowResize);

  // ref & isVisible with custom hook to run only when element is on screen.
  const [ref, isVisible] = useOnScreenElement({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  return (
    <>
      {/* Show the component only after there is movie details */}
      {movie.id && (
        // background image with 0.65 opacity, the image is changing by screen width size.
        <div
          className="d-flex"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), center url(${
              windowSize > 768 ? backgroundImage : posterImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* show the movie details in slider with full responsive design */}
          <Row
            className={classNames(
              "justify-content-center align-items-center text-white text-center",
              windowSize > 768 ? "min-vh-100 mx-5" : "mx-1 vh-75"
            )}
          >
            <Col md={8} lg={6} ref={ref}>
              {isVisible && (
                <>
                  <h1 className="slideInDown">{movie?.title}</h1>
                  <p className="slideInDown">{movie?.overview}</p>
                  <Link
                    to={`/movies/${movie?.id}`}
                    className="btn mt-3 mx-2 slideInDown"
                  >
                    <BiMoviePlay /> Movie Details
                  </Link>
                  <PlayTrailer
                    id={movie?.id}
                    sm={windowSize < 768 ? true : false}
                    url="movie"
                  />
                </>
              )}
            </Col>

            <Col sm={6} md={4} xl={3} className="d-none d-md-block">
              <Image
                src={posterImage}
                fluid
                rounded
                className="border border-4"
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default SingleHeroSlide;
