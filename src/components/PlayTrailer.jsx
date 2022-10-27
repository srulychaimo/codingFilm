// Imports
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { getFromTmdb } from "../api/tmdbApi";
import ReactPlayer from "react-player";
import "../style/playTrailer.css";

// playTrailer component returns a button that on click pops up a window to watch the trailer.
const PlayTrailer = ({ url, id, sm }) => {
  // state for showVideo and trailer.
  const [showVideo, setShowVideo] = useState(false);
  const [trailer, setTrailer] = useState("");

  // useEffect will run on componentDidMount & every time the id changes.
  useEffect(() => {
    try {
      // find the trailer video & setting the trailer state to the trailer url.
      const getTrailer = async (id) => {
        let { results } = await getFromTmdb({ url: `/${url}/${id}/videos` });

        results = results.find((obj) => obj?.type === "Trailer")
          ? results.find((obj) => obj?.type === "Trailer")
          : results[0];

        if (results) {
          setTrailer(`http://www.youtube.com/embed/${results?.key}`);
        }
      };
      getTrailer(id);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  // setting the shoeVideo state to true to shoe video window.
  const playVideo = () => {
    setShowVideo(true);
  };

  return (
    <>
      {/* The button to play trailer onClick will set showVideo to true & will show video & show button only when there is a trailer. */}
      {trailer && (
        <button className="btn mt-3 slideInDown" onClick={playVideo}>
          <BsFillPlayCircleFill /> Play Trailer
        </button>
      )}

      {/* video window will be shown only when showVideo is true */}
      {showVideo && (
        <div className="player-wrapper">
          <div className="my-3 close-icon">
            {/* X icon onClick will hide the video window. */}
            <AiOutlineClose onClick={() => setShowVideo(false)} />
          </div>

          {/* showing video window width by screen size */}
          {!sm && <ReactPlayer url={trailer} controls />}
          {sm && <ReactPlayer url={trailer} controls width="100%" />}
        </div>
      )}
    </>
  );
};

export default PlayTrailer;
