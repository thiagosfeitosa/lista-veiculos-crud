// Importa o módulo mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Define o esquema para a coleção de veículos
const veiculoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Campo personalizado para o ID do veículo, que é único e obrigatório
  placa: { type: String, required: true }, // Campo para a placa do veículo, obrigatório
  chassi: { type: String, required: true }, // Campo para o chassi do veículo, obrigatório
  renavam: { type: String, required: true }, // Campo para o renavam do veículo, obrigatório
  modelo: { type: String, required: true }, // Campo para o modelo do veículo, obrigatório
  marca: { type: String, required: true }, // Campo para a marca do veículo, obrigatório
  ano: { type: Number, required: true } // Campo para o ano do veículo, obrigatório
});

// Exporta o modelo Veiculo baseado no esquema definido
module.exports = mongoose.model('Veiculo', veiculoSchema);
