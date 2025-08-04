import { Router } from "express";
import tokenControllers from "../controllers/tokenControllers.js";

const router = new Router();

router.post('/', tokenControllers.store);

export default router;
