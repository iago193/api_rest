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

async function criarAluno() {
  const novoAluno = await prisma.aluno.create({
    data: {
      nome: 'João',       // String obrigatória
      peso: 70.5,         // Float obrigatório
      // idade é opcional
      // ativo é automático (default: true)
      // criadoEm é automático (default: now())
    }
  });
  console.log(novoAluno);
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
