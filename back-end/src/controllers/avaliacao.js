import avaliacaoRepository from "../models/avaliacaoModels.js";

function findAvaliacoes(req, res) {
  avaliacaoRepository
    .findAll()
    .then((result) => res.json(result))
    .catch((error) =>
      res
        .status(500)
        .json({ error: "Erro ao buscar avaliações", details: error.message })
    );
}

function findAvaliacao(req, res) {
  avaliacaoRepository
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "Avaliação não encontrada" });
      }
      res.json(result);
    })
    .catch((error) =>
      res
        .status(500)
        .json({ error: "Erro ao buscar avaliação", details: error.message })
    );
}

// Rota: GET /avaliacoes/minhas
async function findMinhasAvaliacoes(req, res) {
  const idUsuario = req.user.id;  // Pegando o id do usuário vindo do JWT

  try {
    const avaliacoes = await avaliacaoRepository.findAll({
      where: { id_usuario: idUsuario },
    });

    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar suas avaliações",
      details: error.message,
    });
  }
}

function addAvaliacao(req, res) {
  const { id_usuario, id_filme, nota, ds_comentario } = req.body;

  console.log("REQ BODY:", req.body);

  if (
    id_usuario === undefined ||
    id_filme === undefined ||
    nota === undefined ||
    nota === null
  ) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  avaliacaoRepository
    .create({
      id_usuario,
      id_filme,
      nota,
      ds_comentario: ds_comentario || null,
    })
    .then((result) => res.status(201).json(result))
    .catch((error) => {
      console.error("Erro ao adicionar avaliação:", error);
      res
        .status(500)
        .json({ error: "Erro ao adicionar avaliação", details: error.message });
    });
}

async function updateAvaliacao(req, res) {
  const { nota, ds_comentario } = req.body;

  if (nota === undefined || nota === null) {
    return res.status(400).json({ error: "Nota é obrigatória" });
  }

  try {
    await avaliacaoRepository.update(
      { nota, ds_comentario },
      { where: { id: req.params.id } }
    );

    const avaliacaoAtualizada = await avaliacaoRepository.findByPk(
      req.params.id
    );
    if (!avaliacaoAtualizada) {
      return res.status(404).json({ error: "Avaliação não encontrada" });
    }

    res.json(avaliacaoAtualizada);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar a avaliação", details: error.message });
  }
}

async function deleteAvaliacaos(req, res) {
  try {
    await avaliacaoRepository.destroy({ where: {} });
    res.status(204).send(); // Sucesso sem conteúdo
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar as avaliações", details: error.message });
  }
}

async function deleteAvaliacao(req, res) {
  try {
    const avaliacaoDeletada = await avaliacaoRepository.destroy({
      where: { id: req.params.id },
    });

    if (!avaliacaoDeletada) {
      return res.status(404).json({ error: "Avaliação não encontrada" });
    }

    res.status(204).send(); // Sucesso sem conteúdo
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar a avaliação", details: error.message });
  }
}

async function findAvaliacoesByUsuario(req, res) {
  const { idUser } = req.params;

  try {
    const avaliacoes = await avaliacaoRepository.findAll({
      where: { id_usuario: idUser },
    });

    if (avaliacoes.length === 0) {
      return res.status(404).json({
        message: "Nenhuma avaliação encontrada para o usuário fornecido.",
      });
    }

    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar as avaliações do usuário",
      details: error.message,
    });
  }
}

async function findAvaliacoesByFilme(req, res) {
  const { idFilme } = req.params;

  try {
    const avaliacoes = await avaliacaoRepository.findAll({
      where: { id_filme: idFilme },
    });

    if (avaliacoes.length === 0) {
      return res.status(404).json({
        message: "Nenhuma avaliação encontrada para o filme fornecido.",
      });
    }

    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar as avaliações do filme",
      details: error.message,
    });
  }
}

export default {
  findAvaliacoes,
  findAvaliacao,
  addAvaliacao,
  updateAvaliacao,
  deleteAvaliacao,
  deleteAvaliacaos,
  findAvaliacoesByUsuario,
  findAvaliacoesByFilme,
  findMinhasAvaliacoes
};
