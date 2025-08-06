import dotenv from 'dotenv';
dotenv.config();

import Token from "../models/tokenModel.js";
import jwt from "jsonwebtoken";

class TokenControllers {
    async store(req, res) {
        try {
            const { email = '', password = '', } = req.body;
            const tokenUser = await Token.autenticar({ email, senha: password });

            const token = jwt.sign(
                {
                    id: tokenUser.id,
                    email: tokenUser.email,
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                }
            );


            return res.json({ success: true, token: token });
        } catch (error) {
            return res.status(401).json({ success: false, error: error.message });
        }
    }
}

export default new TokenControllers();