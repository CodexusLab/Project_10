import { useEffect, useState } from "react";
import SongList from "./SongList";
import axios from "axios"

const DiscoverMusic = ({ onMusicSelect }) => {
  const [musicData, setMusicData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

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

  const handleMusicClick = (id) => {
    onMusicSelect(id); 
  };

  // console.log(musicData)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const topMusic = musicData.slice(0, 4);
  return (
    <div>
      <h2 className="mb-3 text-md font-sans font-semibold">Top Chart</h2>
      <div className="flex items-center justify-center flex-wrap gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
        {topMusic.map((music, index) => (
          <div key={index} className="max-w-[720px] md:w-100">
            <div onClick={() => handleMusicClick(music._id)} className="relative flex max-w-[12rem] md:w-100 h-full flex-col overflow-hidden cursor-pointer rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
                <img src={`http://localhost:8000/uploads/${music.image}`} alt={music.title} />
              </div>
              <div className="p-2">
                <h4 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {music.title}
                </h4>
                <p className="block mt-1 font-sans text-md antialiased font-normal leading-relaxed text-gray-700">
                  {music.album}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />

      {/* ypu may like */}

     <SongList music={musicData} onSongList={handleMusicClick}/>
     
    </div>
  );
};

export default DiscoverMusic;
