import { useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import PlayTrailer from "./PlayTrailer";

const PlayTrailerButton = ({ trailer, sm }) => {
  const [showVideo, setShowVideo] = useState(false);

  const playVideo = () => {
    setShowVideo(true);
  };

  return (
    <>
      <button className="btn mt-3" onClick={playVideo}>
        <BsFillPlayCircleFill /> Play Trailer
      </button>

      {showVideo && (
        <PlayTrailer trailerURL={trailer} setShowVideo={setShowVideo} sm={sm} />
      )}
    </>
  );
};

export default PlayTrailerButton;
