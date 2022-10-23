import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayTrailer from "../components/PlayTrailer";
import { Col, Image, Row } from "react-bootstrap";
import SectionSlider from "../components/SectionSlider";
import ReactPlayer from "react-player/youtube";
import { getFromTmdb, imageURL } from "../api/tmdbApi";

const DetailsScreen = ({ url, title }) => {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  const backgroundImage = `${imageURL}${info.data?.backdrop_path}`;
  const posterImage = `${imageURL}${info.data?.poster_path}`;
  const youTubeBaseURL = "http://www.youtube.com/watch?v=";

  useEffect(() => {
    const getDetails = async () => {
      const res = await getFromTmdb({ url: `/${url}/${id}` });
      const { results: videos } = await getFromTmdb({
        url: `/${url}/${id}/videos`,
      });
      const trailer = videos.filter((obj) => obj?.type === "Trailer");
      res.trailer = trailer[0]?.key;
      const { cast } = await getFromTmdb({ url: `/${url}/${id}/credits` });
      const { results: similar } = await getFromTmdb({
        url: `/${url}/${id}/similar`,
      });
      const { results: recommendations } = await getFromTmdb({
        url: `/${url}/${id}/recommendations`,
      });

      setInfo({
        data: res,
        videos,
        cast,
        similar,
        recommendations,
      });
    };
    getDetails();
    window.scrollTo(0, 0);
  }, [id, url]);

  return (
    <>
      {info.data && (
        <div
          className="min-vh-100 py-5"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), center url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <Row className=" d-flex justify-content-center align-items-center text-white text-center min-vh-100 mx-5">
            <Col md={7} lg={8}>
              <h1>{info.data.title}</h1>
              <p className="d-none d-md-block">{info.data.overview}</p>
              {info.data.genres.length && (
                <div className="d-none d-sm-block">
                  <h4 className="px-3 d-inline">Genres:</h4>
                  {info.data.genres.map((obj) => (
                    <div key={obj.id} className="myButton m-2">
                      {obj.name}
                    </div>
                  ))}
                </div>
              )}
              {info.data.trailer && (
                <div className="text-center">
                  <PlayTrailer trailer={info.data.trailer} />
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

        {info.cast?.length && (
          <SectionSlider
            data={info?.cast.filter((cast) => cast.profile_path)}
            title="Casts"
          />
        )}

        {info.similar?.length && (
          <SectionSlider
            data={info?.similar.filter((movie) => movie.poster_path)}
            title={`Similar ${title}`}
            navigateTo={`${url}`}
          />
        )}

        {info.recommendations?.length && (
          <SectionSlider
            data={info?.recommendations.filter((movie) => movie.poster_path)}
            title={`Recommendations ${title}`}
            navigateTo={`${url}`}
          />
        )}
      </div>
    </>
  );
};

export default DetailsScreen;
