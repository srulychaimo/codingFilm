import { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";

import PlayTrailerButton from "./PlayTrailerButton";
import { Link } from "react-router-dom";
import { BiMoviePlay } from "react-icons/bi";
import { getFromTmdb } from "../../api/tmdbApi";

const SingleHeroSlideSizes = ({
  backgroundImage,
  posterImageURL,
  movie,
  classOne,
  classTwo,
  posterVisible,
}) => {
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    const getTrailer = async (id) => {
      let { results } = await getFromTmdb({ url: `/movie/${id}/videos` });
      const checkForTrailer = results.find((obj) => obj?.type === "Trailer");
      if (checkForTrailer) {
        results = checkForTrailer;
        return setTrailer(results?.key);
      }
      setTrailer(results[0]?.key);
    };
    getTrailer(movie.id);
  }, [movie]);

  return (
    <div
      className={classOne}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), center url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <Row className={classTwo}>
        <Col md={8} lg={6}>
          <h1>{movie?.title}</h1>
          <h6>{movie?.overview}</h6>
          <Link to={`/movies/${movie?.id}`} className="btn mt-3 mx-2">
            <BiMoviePlay /> Movie Details
          </Link>
          <PlayTrailerButton trailer={trailer} sm={!posterVisible} />
        </Col>
        {posterVisible && (
          <Col sm={6} md={4} xl={3} className="d-none d-sm-block">
            <Image
              src={posterImageURL}
              fluid
              rounded
              className="border border-4"
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SingleHeroSlideSizes;
