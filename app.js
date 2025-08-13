import express from "express";
import path from 'path';
import cors from 'cors';
import helmet from "helmet";

import homeRoutes from './src/routes/homeRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import tokenRoutes from './src/routes/tokenRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

const __dirname = path.resolve();

const whiteList = [
  'http://localhost:3000',
  'https://iagobrunosilva.duckdns.org'
];

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/aluno', studentRoutes);
    this.app.use('/uploads', uploadRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/token', tokenRoutes);
  }
}

export default new App().app;
