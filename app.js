import express from "express";
import homeRoutes from './src/routes/homeRoutes.js';
import alunoRoutes from './src/routes/alunoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/aluno', alunoRoutes);
    this.app.use('/user', userRoutes);
  }
}

export default new App().app;
