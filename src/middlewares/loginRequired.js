import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ success: false, error: 'Login obrigatório' });
    }

    const token = authorization.split(' ')[1]; // Remove "Bearer"

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = dados;

        const user = await User.findById(id);

        if (!user || user.email !== email) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas ou modificadas.' });
        }

        req.userId = id;
        req.userEmail = email;

        return next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Token expirado ou inválido.' });
    }
};
