import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDetailsById,
  imageURL,
  getVideosById,
  getCastById,
  getSimilarById,
  getRecommendationsById,
  getListsById,
} from "../service/tmdbApiService";
import PlayTrailerButton from "../components/HeroSlider/PlayTrailerButton";
import { Col, Image, Row } from "react-bootstrap";
import CastSlider from "../components/SectionSlider/CastSlider";
import SectionSlider from "../components/SectionSlider/SectionSlider";
import ReactPlayer from "react-player/youtube";

const MovieScreen = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  const backgroundImage = `${imageURL}${info.movie?.backdrop_path}`;
  const posterImage = `${imageURL}${info.movie?.poster_path}`;
  const youTubeBaseURL = "http://www.youtube.com/watch?v=";

  useEffect(() => {
    const getDetails = async () => {
      const res = await getDetailsById(id);
      const videos = await getVideosById(id);
      const trailer = videos.filter((obj) => obj?.type === "Trailer");
      res.trailer = trailer[0]?.key;
      const casts = await getCastById(id);
      const similar = await getSimilarById(id);
      const recommendations = await getRecommendationsById(id);

      setInfo({
        movie: res,
        videos: videos,
        casts: casts,
        similar: similar,
        recommendations: recommendations,
      });
    };
    getDetails();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {info.movie && (
        <div
          className="min-vh-100 py-5"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), center url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <Row className=" d-flex justify-content-center align-items-center text-white text-center min-vh-100 mx-5">
            <Col md={7} lg={8}>
              <h1>{info.movie.title}</h1>
              <p className="d-none d-md-block">{info.movie.overview}</p>
              {info.movie.genres.length && (
                <div className="d-none d-sm-block">
                  <h4 className="px-3 d-inline">Genres:</h4>
                  {info.movie.genres.map((obj) => (
                    <div key={obj.id} className="myButton m-2">
                      {obj.name}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-center">
                <PlayTrailerButton trailer={info.movie.trailer} />
              </div>
            </Col>

            <Col sm={6} md={5} lg={4} className="mt-3">
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

      <div>
        {info.videos?.length > 0 && (
          <Row className="pt-4 px-3 bg-dark text-white justify-content-center">
            <h3 className="py-2">Videos</h3>
            {info.videos.splice(0, 4).map((video) => (
              <Col key={video.id} sm={10} md={6}>
                <ReactPlayer
                  url={`${youTubeBaseURL}${video.key}`}
                  controls
                  width="100%"
                />
                <p className="text-center">{video.name}</p>
              </Col>
            ))}
          </Row>
        )}

        {info.casts?.length > 0 && (
          <CastSlider
            casts={info?.casts.filter((cast) => cast.profile_path)}
            title="Casts"
          />
        )}

        {info.similar?.length > 0 && (
          <SectionSlider
            movies={info?.similar.filter((movie) => movie.poster_path)}
            title="Similar Movies"
          />
        )}

        {info.recommendations?.length > 0 && (
          <SectionSlider
            movies={info?.recommendations.filter((movie) => movie.poster_path)}
            title="Recommendations Movies"
          />
        )}
      </div>
    </>
  );
};

export default MovieScreen;
