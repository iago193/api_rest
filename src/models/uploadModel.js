import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Upload {

    static async create(filename, alunoId) {
        console.log(alunoId);
        const aluno = await prisma.aluno.findUnique({
            where: { id: alunoId },
            include: { imagem: true }
        });

        if (!aluno) throw new Error('Aluno não encontrado.');

        if (aluno.imagem) {
            await prisma.imagem.delete({
                where: { id: aluno.imagem.id },
            });
        }

        const novaImagem = await prisma.imagem.create({
            data: {
                nome: filename,
                caminho: `/uploads/${filename}`,
                aluno: {
                    connect: { id: alunoId }
                }
            }
        });

        await prisma.aluno.update({
            where: { id: alunoId },
            data: { imagemId: novaImagem.id }
        });

        return novaImagem;
    }

}

export default Upload;
