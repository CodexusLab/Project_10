import { FaPlus } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { GrChapterPrevious } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import axios from "axios";
import { formatTime } from "../components/helper";

const Playing = ({ musicId }) => {
  const [musicDetails, setMusicDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (musicId) {
      console.log();
      const fetchMusicDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/music/single-music/${musicId}`
          );
          setMusicDetails(response.data.music);
          setLoading(false);
          setIsPlaying(false);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch music details");
          setLoading(false);
        }
      };

      fetchMusicDetails();
    }
  }, [musicId]);

  useEffect(() => {
    if (musicDetails && audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [musicDetails]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, [audioRef.current]);

  // Seek to a specific time
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!musicDetails) {
    return <div>No music selected</div>;
  }

  return (
    <div>
      <h2 className="text-center mb-8 text-md font-sans font-semibold">
        Now Playing
      </h2>
      <div className="min-h-screen flex flex-col items-center justify-between">
        <div className="max-w-[720px] flex items-center justify-between">
          <div className="relative flex max-w-[20rem] flex-col overflow-hidden bg-white bg-clip-border text-gray-700">
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
              <img
                src={`http://localhost:8000/uploads/${musicDetails.image}`}
                alt={musicDetails.title}
              />
            </div>
            <div className="pl-4 pr-4 pt-2 pb-2 flex items-center justify-between">
              <FaPlus className="text-green-500" size={24} />
              <div className="flex flex-col items-center">
                <h4 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {musicDetails.title}
                </h4>
                <p className="block mt-0 font-sans text-md antialiased font-normal leading-relaxed text-gray-700">
                  {musicDetails.album}
                </p>
              </div>
              <CiHeart className="text-green-500" size={24} />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-16 mt-4">
          <input
            type="range"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-2">
          <span>{formatTime(currentTime)}</span> 
          <span>{formatTime(duration)}</span> 
          </div>
        </div>

        {/* Play/Pause and Next/Previous Buttons */}
        <div className="flex mt-10 items-center justify-between w-full px-16 pt-2 pb-2">
          <GrChapterPrevious
            size={24}
            className="text-green-500 cursor-pointer"
          />
          {isPlaying ? (
            <AiFillPauseCircle
              size={84}
              className="text-green-500 cursor-pointer"
              onClick={handlePlayPause}
            />
          ) : (
            <AiFillPlayCircle
              size={84}
              className="text-green-500 cursor-pointer"
              onClick={handlePlayPause}
            />
          )}
          <GrChapterNext size={24} className="text-green-500 cursor-pointer" />
        </div>

        <audio
          ref={audioRef}
          src={`http://localhost:8000/uploads/${musicDetails.audioFile}`}
        />
      </div>
    </div>
  );
};

export default Playing;
