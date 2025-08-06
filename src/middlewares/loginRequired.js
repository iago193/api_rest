import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ success: false, error: 'Login obrigatório' });
    }

    const token = authorization.split(' ')[1]; // Remove "Bearer"

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = dados;

        const tokenUser = await Token.findById(id);

        if (!tokenUser || tokenUser.email !== email) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas ou modificadas.' });
        }

        req.userId = id;
        req.userEmail = email;

        return next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Token expirado ou inválido.' });
    }
};
