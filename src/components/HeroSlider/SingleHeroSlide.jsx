import { imageURL } from "../../service/tmdbApiService";
import SingleHeroSlideSizes from "./SingleHeroSlideSizes";

const SingleHeroSlide = ({ movie }) => {
  const backdropImageURL = `${imageURL}${movie?.backdrop_path}`;
  const posterImageURL = `${imageURL}${movie?.poster_path}`;

  return (
    <>
      <SingleHeroSlideSizes
        backgroundImage={backdropImageURL}
        posterImageURL={posterImageURL}
        movie={movie}
        classOne="d-flex d-none d-sm-block"
        classTwo="justify-content-center align-items-center text-white text-center min-vh-100 px-5 gx-5"
        posterVisible
      />
      <SingleHeroSlideSizes
        backgroundImage={posterImageURL}
        movie={movie}
        classOne="d-sm-none"
        classTwo="container justify-content-center align-items-center text-white text-center min-vh-100"
      />
    </>
  );
};

export default SingleHeroSlide;
