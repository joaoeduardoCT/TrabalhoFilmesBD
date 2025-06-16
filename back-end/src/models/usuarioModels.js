import { Sequelize } from "sequelize";
import db from "../db.js";

// Tabela Usuário
export default db.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdm: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
    },
  },
  {
    tableName: "usuario",
    freezeTableName: true,
    timestamps: false,
  }
);
