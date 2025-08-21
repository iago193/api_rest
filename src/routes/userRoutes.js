import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = new Router();

/////////////////Não deveria existir//////////////////////////////
//router.get('/', loginRequired, userControllers.index);
//router.get('/show/', loginRequired, userControllers.show);

///////////////////////////////////////////////////////////////////
router.post('/create', userControllers.create); //store
router.put('/update/', loginRequired, userControllers.update);
router.delete('/delete/', loginRequired, userControllers.delete);

export default router;


/*
    GET /users	index()	Lista todos os usuários
    GET /users/:id	show()	Mostra um usuário específico
    POST /users	store()	Cria um novo usuário
    PUT /users/:id	update()	Atualiza um usuário existente
    DELETE /users/:id	delete()	Remove um usuário
*/