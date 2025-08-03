import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Aluno {
    constructor(body) {
        this.body = body;
    }

    async criarAluno() {
        const novoAluno = await prisma.aluno.create({
            data: {
                nome: 'João',
                sobrenome: 'Silva',
                email: 'joao.silva@example.com',
                peso: 70.5,
                idade: 20,
            },
        });
        console.log('Aluno criado:', novoAluno);
    }
}

export default new Aluno();