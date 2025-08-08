import Upload from "../models/uploadModel.js";
import multer from "multer";
import multerConfig from "../config/multerConfig.js";

const upload = multer(multerConfig).single('arquivoFoto');

class UploadController {
  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ success: false, data: error.field });
      }

      try {
        const upload = await Upload.create(req.file.filename, Number(req.params.id));
        return res.json({ success: true, file: upload });
      } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
    });
  }
}


export default new UploadController();
