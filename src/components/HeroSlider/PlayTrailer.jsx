import ReactPlayer from "react-player/youtube";
import Message from "../common/Message";
import { AiOutlineClose } from "react-icons/ai";

const PlayTrailer = ({ trailerURL, setShowVideo, sm }) => {
  const youTubeBaseURL = `http://www.youtube.com/watch?v=${trailerURL}`;

  return (
    <>
      {trailerURL && (
        <div className="player-wrapper">
          <div className="my-3 close-icon">
            <AiOutlineClose onClick={() => setShowVideo(false)} />
          </div>

          {!sm && <ReactPlayer url={youTubeBaseURL} controls />}
          {sm && <ReactPlayer url={youTubeBaseURL} controls width="100%" />}
        </div>
      )}
      {!trailerURL &&
        setTimeout(() => <Message variant="danger">No Trailer</Message>, 3000)}
    </>
  );
};

export default PlayTrailer;
