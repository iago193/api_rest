import dotenv from 'dotenv';
dotenv.config();

import Token from "../models/tokenModel.js";
import jwt from "jsonwebtoken";

class TokenControllers {
    async store(req, res) {
        try {
            const { email = '', password = '' } = req.body;
            
            // Autentica o usuário
            const tokenUser = await Token.autenticar({ email, senha: password });
            if (!tokenUser) {
                throw new Error("Credenciais inválidas");
            }

            // Gera o token JWT
            const token = jwt.sign(
                {
                    id: tokenUser.id,
                    email: tokenUser.email,
                    nome: tokenUser.nome,
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                }
            );

            // Retorna dados do usuário autenticado
            return res.json({
                success: true,
                token,
                nome: tokenUser.nome,
                id: tokenUser.id,
                email: tokenUser.email
            });

        } catch (error) {
            return res.status(401).json({ success: false, error: error.message });
        }
    }
}

export default new TokenControllers();
