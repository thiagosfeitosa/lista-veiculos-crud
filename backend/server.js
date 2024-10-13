// Carrega as variáveis de ambiente do arquivo .env para process.env
require('dotenv').config();

// Importa os módulos necessários
const express = require('express');
const cors = require('cors'); // Importa o middleware cors
const mongoose = require('mongoose');
const veiculoRoutes = require('./routes/veiculoRoutes');

// Cria uma instância do Express
const app = express();

// Middleware para analisar o corpo das requisições como JSON
app.use(express.json());

// Middleware para permitir CORS
app.use(cors()); // Adiciona o middleware cors para permitir CORS

// Conecta ao banco de dados MongoDB usando a string de conexão do arquivo config/db.js
mongoose.connect(require('./config/db'));

// Define as rotas para a entidade "veículos"
app.use('/veiculos', veiculoRoutes);

// Inicia o servidor na porta 3000
const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Exporta o servidor para uso nos testes
module.exports = server;
