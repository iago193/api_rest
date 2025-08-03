import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Aluno {
    constructor(body) {
        this.body = body;
    }

    async createAluno() {
        const dadosPreparados = this.prepararDados();

        const novoAluno = await prisma.aluno.create({
            data: dadosPreparados
        });

        console.log('Aluno criado:', novoAluno);
    }

    prepararDados() {
        const validarCampo = (valor, nomeCampo) => {
            if (typeof valor !== 'string' || !valor.trim()) {
                throw new Error(`${nomeCampo} é obrigatório`);
            }
            return valor.trim();
        };

        const nome = validarCampo(this.body.nome, 'Nome');
        const sobrenome = validarCampo(this.body.sobrenome, 'Sobrenome');
        const email = validarCampo(this.body.email, 'Email').toLowerCase();

        const peso = parseFloat(this.body.peso);
        if (isNaN(peso)) throw new Error('Peso deve ser um número');

        const idade = this.body.idade ? parseInt(this.body.idade, 10) : null;
        if (this.body.idade && isNaN(idade)) throw new Error('Idade deve ser um número inteiro');

        return {
            nome,
            sobrenome,
            email,
            peso,
            idade,
        };
    }

}

export default Aluno;