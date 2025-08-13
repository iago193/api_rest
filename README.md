# 📌 API_REST

## 📑 Mapa do Projeto
1. [Visão Geral](#visão-geral)
2. [Tecnologias](#tecnologias)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Instalação](#instalação)
5. [Uso](#uso)
6. [Contribuição](#contribuição)
7. [Contato](#contato)

---

## Visão Geral
API REST para gerenciamento escolar, com suporte a usuários, estudantes e upload de arquivos.  
Permite autenticação, manipulação de dados via Prisma e integração com uploads de imagens.

---

## Tecnologias
- Node.js  
- Express.js  
- Prisma  
- MySQL / PostgreSQL (ou outro banco compatível)  
- Multer (para uploads)  
- Postman (para testes da API)  

---

## Estrutura do Projeto

```text
API_REST/
│
├─ node_modules/                # Dependências do projeto
├─ Prisma/                      # Configurações e migrações do Prisma
├─ public/
│  └─ uploads/
│     └─ images/                # Arquivos de imagens enviados
│
├─ src/
│  ├─ config/
│  │   └─ multerConfig.js       # Configuração do multer para uploads
│  │
│  ├─ controllers/              # Controladores da API
│  │   ├─ homeControllers.js
│  │   ├─ studentControllers.js
│  │   ├─ tokenControllers.js
│  │   ├─ uploadControllers.js
│  │   └─ userControllers.js
│  │
│  ├─ middlewares/              # Middlewares do projeto
│  │   └─ loginRequired.js
│  │
│  ├─ models/                   # Modelos e lógica de dados
│  │   ├─ studentModel.js
│  │   ├─ tokenModel.js
│  │   ├─ uploadModel.js
│  │   └─ userModel.js
│  │
│  └─ routes/                   # Rotas da API
│      ├─ homeRoutes.js
│      ├─ studentRoutes.js
│      ├─ tokenRoutes.js
│      ├─ uploadRoutes.js
│      └─ userRoutes.js
│
├─ generated/                    # Arquivos gerados (Prisma, por ex.)
├─ .editorconfig                 # Configuração de editor
├─ .gitignore                    # Arquivos/pastas ignorados pelo Git
├─ .env                          # Variáveis de ambiente
├─ app.js                         # Configuração principal do Express
├─ server.js                      # Inicialização do servidor
├─ package.json                   # Dependências e scripts
├─ package-lock.json
├─ README.md
└─ Escola.postman_collection.json # Coleção Postman para testes
