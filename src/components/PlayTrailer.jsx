import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import { getFromTmdb } from "../api/tmdbApi";

const PlayTrailer = ({ id, sm }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    try {
      const getTrailer = async (id) => {
        let { results } = await getFromTmdb({ url: `/movie/${id}/videos` });

        const checkForTrailer = results.find((obj) => obj?.type === "Trailer");
        if (checkForTrailer) {
          results = checkForTrailer;
          setTrailer(`http://www.youtube.com/watch?v=${results?.key}`);
        }
      };
      getTrailer(id);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const playVideo = () => {
    setShowVideo(true);
  };

  return (
    <>
      <button className="btn mt-3" onClick={playVideo}>
        <BsFillPlayCircleFill /> Play Trailer
      </button>

      {showVideo && (
        <div className="player-wrapper">
          <div className="my-3 close-icon">
            <AiOutlineClose onClick={() => setShowVideo(false)} />
          </div>

          {!sm && <ReactPlayer url={trailer} controls />}
          {sm && <ReactPlayer url={trailer} controls width="100%" />}
        </div>
      )}
    </>
  );
};

export default PlayTrailer;
