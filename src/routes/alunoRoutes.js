import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js";
import alunoControllers from "../controllers/alunoControllers.js";

const router = new Router();

router.get('/', alunoControllers.index);
router.get('/show/:id', alunoControllers.show);
router.post('/create',loginRequired, alunoControllers.create);
router.put('/update/:id',loginRequired, alunoControllers.update);
router.delete('/delete/:id',loginRequired, alunoControllers.delete);

export default router;


/*
    GET /users	index()	Lista todos os usuários
    GET /users/:id	show()	Mostra um usuário específico
    POST /users	store()	Cria um novo usuário
    PUT /users/:id	update()	Atualiza um usuário existente
    DELETE /users/:id	delete()	Remove um usuário
*/