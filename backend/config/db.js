// Carrega as variáveis de ambiente do arquivo .env para process.env
require('dotenv').config();

// Exporta a string de conexão do MongoDB a partir das variáveis de ambiente
module.exports = process.env.MONGODB_URI;
