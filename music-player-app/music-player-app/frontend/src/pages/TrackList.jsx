import { FaShuffle } from "react-icons/fa6";
import { FcMusic } from "react-icons/fc";
import SongList from "./SongList";
import axios from "axios"
import { useEffect, useState } from "react";

const TrackList = ({ onSongList }) => {
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch music data from backend
  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/music/all-music");
        setMusicData(response.data.music);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch music data");
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
   <>
    <div className="mb-3 text-xl font-sans font-bold">TrackList
    <div className="flex mt-2 mb-4">
        <FaShuffle size={24} className="text-gray-500 mr-8"/>
        <FcMusic size={24}/>
    </div>
    <SongList music={musicData} onSongList={onSongList}/>
    </div>
   </>
  )
}

export default TrackList