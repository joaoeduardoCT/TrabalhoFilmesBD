import express from "express";
import cors from "cors";             // <-- importar cors aqui
import db from "./src/db.js";       // conexão com Sequelize/MariaDB
import dotenv from "dotenv/config.js"; // importa as variáveis de ambiente
import routes from "./routes.js";   // importa as rotas

const app = express();

app.use(cors());                    // <-- libera CORS para todas as origens
app.use(express.json());

// Testar conexão com banco de dados
db.authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco:", err);
  });

// Sincroniza tabelas baseadas nos modelos
db.sync({ alter: true });

// Usa as rotas importadas
app.use("/", routes);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
