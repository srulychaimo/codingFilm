// Imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import { getFromTmdb, imageURL } from "../api/tmdbApi";
import { getWindowSize } from "../utils/screenSize";
import PlayTrailer from "../components/PlayTrailer";
import SectionSlider from "../components/SectionSlider";
import ReactPlayer from "react-player/youtube";
import classNames from "classnames";

// Details screen component gets the url movie/tv to fetch data & the id from the params, & shows all data details.
const DetailsScreen = ({ url, title }) => {
  // State for all movie/tvShow info & windowSize.
  const [info, setInfo] = useState({});
  const windowSize = getWindowSize();

  // Getting the id from params.
  const { id } = useParams();

  // Basic imageUrl & youtubeUrl.
  const backgroundImage = `${imageURL}${info.data?.backdrop_path}`;
  const posterImage = `${imageURL}${info.data?.poster_path}`;
  const youTubeBaseURL = "http://www.youtube.com/embed/";

  // useEffect will run on componentDidMount & when id or url changes, that fetches all data for the movie/tvShow of the id & sets all data in info state.
  useEffect(() => {
    const getDetails = async () => {
      const res = await getFromTmdb({ url: `/${url}/${id}` });
      const { results: videos } = await getFromTmdb({
        url: `/${url}/${id}/videos`,
      });
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

    // scroll up to top of page when useEffect runs.
    window.scrollTo(0, 0);
  }, [id, url]);

  return (
    <>
      {/* Show the data only after there is with styling. */}

      {info.data && (
        <div
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), center url(${
              windowSize > 768 ? backgroundImage : posterImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Row
            className={classNames(
              "d-flex justify-content-center align-items-center text-white text-center",
              windowSize > 768 ? "min-vh-100 mx-5" : "mx-1 vh-75"
            )}
          >
            <Col md={8} lg={6}>
              <h1 className="slideInDown">
                {info.data.title || info.data.name}
              </h1>
              <p className="slideInDown">{info.data.overview}</p>
              {info.data.genres.length && (
                <div>
                  {info.data.genres.map((obj) => (
                    <div key={obj.id} className="myButton m-2 slideInDown">
                      {obj.name}
                    </div>
                  ))}
                </div>
              )}
              {info.data && (
                <div className="text-center">
                  <PlayTrailer
                    id={info.data.id}
                    sm={windowSize < 768}
                    url={url}
                  />
                </div>
              )}
            </Col>

            {/* Poster image only on lg screen */}
            <Col sm={6} md={4} xl={3} className="d-none d-md-block mt-3">
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
        {/* Show videos only if there is max 2 videos. */}
        {info.videos?.length > 0 && (
          <Row className="py-4 px-2 bg-dark text-white justify-content-center">
            <h3 className="py-2 text-center">Videos</h3>
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

        {/* Show sliders for cast similar & recommendations only if there is value with poster image.  */}

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
