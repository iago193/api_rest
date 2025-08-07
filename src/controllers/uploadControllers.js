import multer from "multer";
import multerConfig from "../config/multerConfig.js";

const upload = multer(multerConfig).single('arquivoFoto');


class UploadController {
  store(req, res) {
    return upload(req, res, (error) => {
      if(error) {
        return res.status(400).json({success: false, data: error.field });
      }

      return res.json({success: true, file: req.file});
    });
  }
}

export default new UploadController();
