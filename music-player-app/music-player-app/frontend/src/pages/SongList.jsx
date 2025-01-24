const SongList = ({ music, onSongList }) => {
  return (
    <div>
      <h3 className="mb-3 text-md font-sans font-semibold">You may like</h3>
      {music &&
        music.map((card, index) => (
          <div
            onClick={() => onSongList(card._id)}
            key={index}
            className="flex cursor-pointer mb-4 items-center justify-between gap-0 w-full h-[50px] bg-white rounded-xl pt-1 pb-1 pl-4 pr-4"
          >
            <img
              src={`http://localhost:8000/uploads/${card.image}`}
              alt={card.title}
              className="h-full w-auto rounded-md"
            />

            <div className="flex flex-col justify-center">
              <h4 className="font-semibold text-sm text-gray-900">
                {card.title}
              </h4>
              <p className="text-sm text-gray-600">{card.album}</p>
            </div>

            <div className="flex items-center justify-center ml-4">
              <p className="text-sm text-gray-500">{card.duration}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SongList;
