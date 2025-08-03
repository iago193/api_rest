import dotenv from "dotenv";
dotenv.config();

import express from "express";
import homeRoutes from './src/routes/homeRoutes.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
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

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
