// Importa o modelo Veiculo
const Veiculo = require('../models/veiculo');

// Função para gerar um ID personalizado
function generateCustomId() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2); // Últimos 2 dígitos do ano
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês com 2 dígitos
  const randomPart = Math.random().toString(36).substring(2, 6); // Parte aleatória de 4 caracteres
  return `${year}${month}${randomPart}`;
}

// Controlador para criar um novo veículo
exports.createVeiculo = async (req, res) => {
  try {
    const veiculo = new Veiculo({
      id: generateCustomId(), // Gera um ID personalizado para o veículo
      ...req.body
    });
    await veiculo.save(); // Salva o veículo no banco de dados
    res.status(201).send(veiculo); // Retorna o veículo criado com status 201 (Created)
  } catch (error) {
    res.status(400).send(error); // Retorna um erro com status 400 (Bad Request) se algo der errado
  }
};

// Controlador para criar múltiplos veículos em massa
exports.createVeiculosEmMassa = async (req, res) => {
  try {
    const veiculos = req.body.map(veiculo => ({
      id: generateCustomId(), // Gera um ID personalizado para cada veículo
      ...veiculo
    }));
    await Veiculo.insertMany(veiculos); // Insere todos os veículos no banco de dados de uma vez
    res.status(201).send({ message: 'Veículos inseridos com sucesso!', veiculos }); // Retorna uma mensagem de sucesso e os veículos inseridos
  } catch (error) {
    res.status(400).send(error); // Retorna um erro com status 400 (Bad Request) se algo der errado
  }
};

// Controlador para obter todos os veículos
exports.getVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.find(); // Busca todos os veículos no banco de dados
    res.status(200).send(veiculos); // Retorna os veículos encontrados com status 200 (OK)
  } catch (error) {
    res.status(500).send(error); // Retorna um erro com status 500 (Internal Server Error) se algo der errado
  }
};

// Controlador para atualizar um veículo existente
exports.updateVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!veiculo) {
      return res.status(404).send(); // Retorna status 404 (Not Found) se o veículo não for encontrado
    }
    res.status(200).send(veiculo); // Retorna o veículo atualizado com status 200 (OK)
  } catch (error) {
    res.status(400).send(error); // Retorna um erro com status 400 (Bad Request) se algo der errado
  }
};

// Controlador para deletar um veículo existente
exports.deleteVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findOneAndDelete({ id: req.params.id });
    if (!veiculo) {
      return res.status(404).send(); // Retorna status 404 (Not Found) se o veículo não for encontrado
    }
    res.status(200).send({ message: 'Veículo deletado com sucesso!' }); // Retorna uma mensagem de sucesso com status 200 (OK)
  } catch (error) {
    res.status(500).send(error); // Retorna um erro com status 500 (Internal Server Error) se algo der errado
  }
};
