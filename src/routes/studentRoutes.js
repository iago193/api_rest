import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js";
import studentControllers from "../controllers/studentControllers.js";

const router = new Router();

router.get('/', studentControllers.index);
router.get('/show/:id', studentControllers.show);
router.post('/create',loginRequired, studentControllers.create);
router.put('/update/:id',loginRequired, studentControllers.update);
router.delete('/delete/:id',loginRequired, studentControllers.delete);

export default router;


/*
    GET /users	index()	Lista todos os usuários
    GET /users/:id	show()	Mostra um usuário específico
    POST /users	store()	Cria um novo usuário
    PUT /users/:id	update()	Atualiza um usuário existente
    DELETE /users/:id	delete()	Remove um usuário
*/