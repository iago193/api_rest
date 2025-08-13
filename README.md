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
