import express from "express";
import cors from "cors";
import routes from "./routes.js";
import db from "./src/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

db.sync({ alter: true })
  .then(() => {
    console.log("Tabelas sincronizadas");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar as tabelas:", error);
  });

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));

