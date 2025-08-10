import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Student {

    static validarId(id) {
        if (!id || isNaN(id)) throw new Error('ID inválido');
        return Number(id);
    }

    static async index() {
        return prisma.student.findMany();
    }

    static async show({ id }) {
        const student = await prisma.student.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                imagem: {
                    select: {
                        nome: true,
                        caminho: true
                    }
                }
            }
        });

        if (!student) {
            throw new Error('student não encontrado.');
        }

        if (student.imagem) {
            student.imagem.caminho = `${process.env.BASE_URL}${student.imagem.caminho}`;
        } else {
            student.imagem = {
                nome: 'default.png',
                caminho: `${process.env.BASE_URL}/public/uploads/images/default.png`
            };
        }

        return student;
    }



    static async update(id, body) {
        const emailNormalizado = body.email.toLowerCase().trim();
        const dadosPreparados = this.prepararDados({ ...body, email: emailNormalizado });

        const idNum = student.validarId(id);

        const studentAtual = await prisma.student.findUnique({
            where: { id: idNum }
        });

        if (!studentAtual) {
            throw new Error('ID não encontrado.');
        }

        // Verifica se o e-mail já está sendo usado por outro student
        const emailExiste = await prisma.student.findUnique({
            where: { email: emailNormalizado }
        });

        if (emailExiste && emailExiste.id !== idNum) {
            throw new Error('E-mail já cadastrado para outro student.');
        }

        const studentAtualizado = await prisma.student.update({
            where: { id: idNum },
            data: dadosPreparados
        });

        return studentAtualizado;
    }


    static async create(body) {
        const emailNormalizado = body.email.toLowerCase().trim();
        const dadosPreparados = this.prepararDados({ ...body, email: emailNormalizado });

        const emailExiste = await prisma.student.findUnique({
            where: { email: emailNormalizado }
        });

        if (emailExiste) {
            const erro = new Error('E-mail já cadastrado para outro student.');
            throw erro;
        }

        const novostudent = await prisma.student.create({
            data: dadosPreparados
        });

        return novostudent;
    }


    static async delete(id) {
        const idNum = student.validarId(id);

        const student = await prisma.student.findUnique({
            where: { id: idNum }
        });

        if (!student) {
            const erro = new Error('student não encontrado.');
            erro.status = 404;
            throw erro;
        }

        const studentDeletado = await prisma.student.delete({
            where: { id: idNum }
        });

        return studentDeletado;
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

export default Student;