import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {

    static validarId(id) {
        if (!id || isNaN(id)) throw new Error('ID inválido');
        return Number(id);
    }

    static async createUser(body) {
        const emailExiste = await prisma.users.findUnique({
            where: { email: body.email.toLowerCase().trim() }
        });

        if (emailExiste) throw new Error('E-mail já cadastrado');

        const dadosPreparados = await User.prepararDados(body);
        return prisma.users.create({ data: dadosPreparados });
    }

    static async getUser() {
        return prisma.users.findMany();
    }

    static async show({ id }) {
        const idNum = User.validarId(id);

        const user = await prisma.users.findUnique({
            where: { id: idNum }
        });

        if (!user) throw new Error('Usuário não encontrado');
        return user;
    }

    static async update(id, data) {
        const idNum = User.validarId(id);

        const userExists = await prisma.users.findUnique({
            where: { id: idNum }
        });

        if (!userExists) throw new Error('Usuário não encontrado');

        if (data.email) {

            const emailExiste = await prisma.users.findFirst({
                where: {
                    email: data.email.toLowerCase().trim(),
                    NOT: { id: idNum }
                }
            });
            if (emailExiste) throw new Error('E-mail já cadastrado por outro usuário');
        }

        const dadosAtualizados = await User.prepararDados(data, true);

        return prisma.users.update({
            where: { id: idNum },
            data: dadosAtualizados
        });
    }

    static async delete(id) {
        const idNum = User.validarId(id);

        const user = await prisma.users.findUnique({
            where: { id: idNum }
        });

        if (!user) throw new Error('Usuário não encontrado');

        await prisma.users.delete({ where: { id: idNum } });
        return true;
    }

    static async prepararDados(body, isUpdate = false) {
        const validarNome = (nome) => {
            if (typeof nome !== 'string' || !nome.trim()) {
                if (!isUpdate) throw new Error('Nome é obrigatório');
                return undefined;
            }
            const nomeLimpo = nome.trim();
            if (nomeLimpo.length < 2 || nomeLimpo.length > 50) {
                throw new Error('Nome deve ter entre 2 e 50 caracteres');
            }
            return nomeLimpo;
        };

        const validarEmail = (email) => {
            if (typeof email !== 'string' || !email.trim()) {
                if (!isUpdate) throw new Error('E-mail é obrigatório');
                return undefined;
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
                if (!isUpdate) throw new Error('Senha é obrigatória');
                return undefined;
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

        const nome = validarNome(body.nome);
        const email = validarEmail(body.email);
        const senha = validarSenha(body.senha);

        const dados = {};
        if (nome) dados.nome = nome;
        if (email) dados.email = email;
        if (senha) dados.password_hash = await bcrypt.hash(senha, 10);

        return dados;
    }

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

}

export default User;
