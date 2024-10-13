// Importa o módulo express para criar o roteador
const express = require('express');

// Importa o controlador de veículos que contém a lógica das operações CRUD
const veiculoController = require('../controllers/veiculoController');

// Cria uma instância do roteador do Express
const router = express.Router();

// Rota para criar um novo veículo
router.post('/', veiculoController.createVeiculo);

// Rota para criar múltiplos veículos em massa
router.post('/bulk', veiculoController.createVeiculosEmMassa); // Nova rota para inserção em massa

// Rota para obter todos os veículos
router.get('/', veiculoController.getVeiculos);

// Rota para atualizar um veículo existente
router.put('/:id', veiculoController.updateVeiculo);

// Rota para deletar um veículo existente
router.delete('/:id', veiculoController.deleteVeiculo);

// Exporta o roteador para ser usado em outras partes do aplicativo
module.exports = router;
