import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

class Upload {

    static async create(filename, studentId) {
        const student = await prisma.student.findUnique({
            where: { id: studentId },
            include: { imagem: true }
        });

        if (!student) throw new Error('Aluno não encontrado.');

        if (student.imagem) {

            const imagePath = path.resolve('uploads','images', student.imagem.nome);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            await prisma.student.update({
                where: { id: studentId },
                data: { imagemId: null }
            });

            await prisma.imagem.delete({
                where: { id: student.imagem.id }
            });
        }


        const novaImagem = await prisma.imagem.create({
            data: {
                nome: filename,
                caminho: `/uploads/images/${filename}`,
                student: { connect: { id: studentId } }
            }
        });

        await prisma.student.update({
            where: { id: studentId },
            data: { imagemId: novaImagem.id }
        });

        return novaImagem;
    }


}

export default Upload;
