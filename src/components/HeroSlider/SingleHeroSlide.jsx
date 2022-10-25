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

const SingleHeroSlide = ({ movie }) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const backgroundImage = `${imageURL}${movie?.backdrop_path}`;
  const posterImage = `${imageURL}${movie?.poster_path}`;

  const handleWindowResize = () => {
    setWindowSize(getWindowSize());
  };
  window.addEventListener("resize", handleWindowResize);

  const [ref, isVisible] = useOnScreenElement({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  return (
    <>
      {movie.id && (
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
          <Row
            className={classNames(
              "justify-content-center align-items-center text-white text-center",
              windowSize > 768 ? "min-vh-100 mx-5" : "mx-1 vh-75"
            )}
            ref={ref}
          >
            <Col md={8} lg={6}>
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
