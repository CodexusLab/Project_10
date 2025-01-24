import multer from "multer";
import path from "path"

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `image-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype.startsWith("image")){
    cb(null,true)
  }else{
    cb(new Error("Only Image is allowed"))
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
