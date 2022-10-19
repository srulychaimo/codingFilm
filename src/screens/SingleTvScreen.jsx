import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayTrailerButton from "../components/HeroSlider/PlayTrailerButton";
import { Col, Image, Row } from "react-bootstrap";
import SectionSlider from "../components/SectionSlider";
import ReactPlayer from "react-player/youtube";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

const SingleTvScreen = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  const backgroundImage = `${imageURL}${info.tv?.backdrop_path}`;
  const posterImage = `${imageURL}${info.tv?.poster_path}`;
  const youTubeBaseURL = "http://www.youtube.com/watch?v=";

  useEffect(() => {
    const getDetails = async () => {
      const tv = await getFromTmdb({ url: `/tv/${id}` });
      const { results: videos } = await getFromTmdb({
        url: `/tv/${id}/videos`,
      });

      const trailer = videos.filter((obj) => obj?.type === "Trailer");
      if (trailer.length) {
        tv.trailer = trailer[0]?.key;
      } else {
        tv.trailer = videos[0]?.key;
      }
      const { cast } = await getFromTmdb({ url: `/tv/${id}/credits` });
      const { results: similar } = await getFromTmdb({
        url: `/tv/${id}/similar`,
      });
      const { results: recommendations } = await getFromTmdb({
        url: `/tv/${id}/recommendations`,
      });

      setInfo({
        tv,
        videos,
        cast,
        similar,
        recommendations,
      });
    };
    getDetails();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {info.tv && (
        <div
          className="min-vh-100 py-5"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), center url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <Row className=" d-flex justify-content-center align-items-center text-white text-center min-vh-100 mx-5">
            <Col md={7} lg={8}>
              <h1>{info.tv.name}</h1>
              <p className="d-none d-md-block">{info.tv.overview}</p>
              {info.tv.genres.length && (
                <div className="d-none d-sm-block">
                  <h4 className="px-3 d-inline">Genres:</h4>
                  {info.tv.genres.map((obj) => (
                    <div key={obj.id} className="myButton m-2">
                      {obj.name}
                    </div>
                  ))}
                </div>
              )}
              {info.tv.trailer && (
                <div className="text-center">
                  <PlayTrailerButton trailer={info.tv.trailer} />
                </div>
              )}
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
            {info.videos.splice(0, 2).map((video) => (
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

        {info.cast?.length > 0 && (
          <SectionSlider
            data={info?.cast.filter(
              (item) => (item.poster_path = item.profile_path)
            )}
            title="Casts"
          />
        )}

        {info.similar?.length > 0 && (
          <SectionSlider
            data={info?.similar.filter((tv) => tv.poster_path)}
            title="Similar Tv Shows"
            navigateTo="tv"
          />
        )}

        {info.recommendations?.length > 0 && (
          <SectionSlider
            data={info?.recommendations.filter((tv) => tv.poster_path)}
            title="Recommendations Tv Shows"
            navigateTo="tv"
          />
        )}
      </div>
    </>
  );
};

export default SingleTvScreen;
