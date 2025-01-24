import mongoose from "mongoose"

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  audioFile: {
    type: String, 
    required: true,
  },
});

const Music = mongoose.model('Music', musicSchema);
export default Music;
