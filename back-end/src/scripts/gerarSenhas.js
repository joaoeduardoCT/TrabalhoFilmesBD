// gerarSenhas.js
import bcrypt from "bcrypt";

const gerar = async () => {
  const senha1 = await bcrypt.hash("123456", 5);
  const senha2 = await bcrypt.hash("senhaSegura", 5);

  console.log("Senha criptografada para João:", senha1);
  console.log("Senha criptografada para Maria:", senha2);
};

gerar();
