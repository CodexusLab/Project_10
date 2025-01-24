import express from "express"
import { createMusic, getAllMusic, getSingleMusic } from "../controllers/music.js";
import upload from "../utils/upload.js";


const musicRouter = express.Router();

musicRouter.post("/create", upload.fields([{ name: "image", maxCount: 1 }, { name: "audioFile", maxCount: 1 }]), createMusic);

musicRouter.get("/all-music",getAllMusic)

musicRouter.get("/single-music/:id",getSingleMusic)

export default musicRouter