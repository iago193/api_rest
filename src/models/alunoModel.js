import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Aluno {

    static validarId(id) {
        if (!id || isNaN(id)) throw new Error('ID inválido');
        return Number(id);
    }

    static async index() {
        return prisma.aluno.findMany();
    }

    static async show({ id }) {
        const aluno = await prisma.aluno.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true
            }
        });

        if (!aluno) {
            const erro = new Error('Aluno não encontrado.');
            throw erro;
        }

        return aluno;
    }


    static async update(id, body) {
        const emailNormalizado = body.email.toLowerCase().trim();
        const dadosPreparados = this.prepararDados({ ...body, email: emailNormalizado });

        const idNum = Aluno.validarId(id);

        const alunoAtual = await prisma.aluno.findUnique({
            where: { id: idNum }
        });

        if (!alunoAtual) {
            throw new Error('ID não encontrado.');
        }

        // Verifica se o e-mail já está sendo usado por outro aluno
        const emailExiste = await prisma.aluno.findUnique({
            where: { email: emailNormalizado }
        });

        if (emailExiste && emailExiste.id !== idNum) {
            throw new Error('E-mail já cadastrado para outro aluno.');
        }

        const alunoAtualizado = await prisma.aluno.update({
            where: { id: idNum },
            data: dadosPreparados
        });

        return alunoAtualizado;
    }


    static async create(body) {
        const emailNormalizado = body.email.toLowerCase().trim();
        const dadosPreparados = this.prepararDados({ ...body, email: emailNormalizado });

        const emailExiste = await prisma.aluno.findUnique({
            where: { email: emailNormalizado }
        });

        if (emailExiste) {
            const erro = new Error('E-mail já cadastrado para outro aluno.');
            throw erro;
        }

        const novoAluno = await prisma.aluno.create({
            data: dadosPreparados
        });

        return novoAluno;
    }


    static async delete(id) {
        const idNum = Aluno.validarId(id);

        const aluno = await prisma.aluno.findUnique({
            where: { id: idNum }
        });

        if (!aluno) {
            const erro = new Error('Aluno não encontrado.');
            erro.status = 404;
            throw erro;
        }

        const alunoDeletado = await prisma.aluno.delete({
            where: { id: idNum }
        });

        return alunoDeletado;
    }



    static prepararDados(body) {
        const validarCampo = (valor, nomeCampo) => {
            if (typeof valor !== 'string' || !valor.trim()) {
                throw new Error(`${nomeCampo} é obrigatório`);
            }
            return valor.trim();
        };

        const nome = validarCampo(body.nome, 'Nome');
        const sobrenome = validarCampo(body.sobrenome, 'Sobrenome');
        const email = validarCampo(body.email, 'Email').toLowerCase();

        const peso = parseFloat(body.peso);
        if (isNaN(peso)) throw new Error('Peso deve ser um número');

        const idade = body.idade ? parseInt(body.idade, 10) : null;
        if (body.idade && isNaN(idade)) throw new Error('Idade deve ser um número inteiro');

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