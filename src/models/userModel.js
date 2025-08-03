import dotenv from "dotenv";
dotenv.config();

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
    constructor(body) {
        this.body = body;
    }

    async createUser() {
        const dadosPreparados = await this.prepararDados();

        const createUser = await prisma.users.create({
            data: dadosPreparados
        });

        return createUser;
    }

    async prepararDados() {
        const validarNome = (nome) => {
            if (typeof nome !== 'string' || !nome.trim()) {
                throw new Error('Nome é obrigatório');
            }
            const nomeLimpo = nome.trim();
            if (nomeLimpo.length < 2 || nomeLimpo.length > 50) {
                throw new Error('Nome deve ter entre 2 e 50 caracteres');
            }
            return nomeLimpo;
        };

        const validarEmail = (email) => {
            if (typeof email !== 'string' || !email.trim()) {
                throw new Error('E-mail é obrigatório');
            }
            const emailLimpo = email.trim().toLowerCase();
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailLimpo)) {
                throw new Error('E-mail inválido');
            }
            return emailLimpo;
        };

        const validarSenha = (senha) => {
            if (typeof senha !== 'string' || !senha.trim()) {
                throw new Error('Senha é obrigatória');
            }
            if (senha.length < 8 || senha.length > 100) {
                throw new Error('Senha deve ter entre 8 e 100 caracteres');
            }
            const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
            if (!regexSenhaForte.test(senha)) {
                throw new Error('Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos.');
            }
            return senha;
        };

        const nome = validarNome(this.body.nome);
        const email = validarEmail(this.body.email);
        const senha = validarSenha(this.body.senha);

        const password_hash = await bcrypt.hash(senha, 10);

        return {
            nome,
            email,
            password_hash,
        };
    }

}

export default User;
