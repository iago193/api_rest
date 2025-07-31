import { Router } from "express";
import homeControllers from "../controllers/homeControllers.js";

const router = new Router();

router.get('/', homeControllers.index);

export default router;
