import { Router } from "express";
import userControllers from "../controllers/userControllers.js";

const router = new Router();

router.post('/create', userControllers.userCreate);

export default router;


/*
    GET /users	index()	Lista todos os usuários
    GET /users/:id	show()	Mostra um usuário específico
    POST /users	store()	Cria um novo usuário
    PUT /users/:id	update()	Atualiza um usuário existente
    DELETE /users/:id	delete()	Remove um usuário
*/