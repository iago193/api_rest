import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js";

import uploadControllers from "../controllers/uploadControllers.js";

const router = new Router();

router.post('/:id',loginRequired, uploadControllers.store);

export default router;