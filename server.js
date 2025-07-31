import app from './app.js';

const port = 3000;

app.listen(port, () => {
console.log(`Servidor rodando na porta ${port}`);
console.log(`CTRL + Click em http://localhost:${port}`);
});
