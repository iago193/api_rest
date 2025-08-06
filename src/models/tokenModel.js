import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class Token {

    static async autenticar({ email, senha }) {
        if (!email || !senha) {
            throw new Error('E-mail e senha são obrigatórios');
        }

        const emailLimpo = email.toLowerCase().trim();

        const usuario = await prisma.users.findUnique({
            where: { email: emailLimpo },
            select: {
                id: true,
                nome: true,
                email: true,
                password_hash: true
            }
        });


        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.password_hash);

        if (!senhaCorreta) {
            throw new Error('Senha incorreta');
        }

        // Remove o hash da senha ao retornar os dados
        const { password_hash, ...userData } = usuario;
        return userData;
    }

    static async findById(id) {
        return prisma.users.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                email: true,
                nome: true
            }
        });
    }

}

export default Token