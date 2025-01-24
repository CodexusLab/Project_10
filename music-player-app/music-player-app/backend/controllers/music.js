import Music from "../models/musicModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createMusic = async (req, res, next) => {
  try {
    const { title, album, duration } = req.body;

    if (!title || !album || !duration) {
      return next(
        new ErrorHandler("Title, Album, and Duration are required.", 400)
      );
    }

    if (!req.files || !req.files.image || !req.files.audioFile) {
      return next(
        new ErrorHandler("Both Image and Music files are required.", 400)
      );
    }

    const image = req.files.image[0].filename;
    const audioFile = req.files.audioFile[0].filename;

    const music = new Music({
      title,
      album,
      duration,
      image,
      audioFile,
    });

    await music.save();

    res.status(201).json({
      success: true,
      message: "Music created successfully",
      music,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const getAllMusic = async (req, res, next) => {
  try {
    const musicList = await Music.find();

    if (!musicList.length) {
      return next(new ErrorHandler("No music found", 404));
    }

    res.status(200).json({
      success: true,
      music: musicList,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const getSingleMusic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const music = await Music.findById(id);

    if (!music) {
      return next(new ErrorHandler("Music not found", 404));
    }

    res.status(200).json({
      success: true,
      music,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
