-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.39 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para filmesbd2
CREATE DATABASE IF NOT EXISTS `filmesbd2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `filmesbd2`;

-- Copiando estrutura para tabela filmesbd2.avaliacao
CREATE TABLE IF NOT EXISTS `avaliacao` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_filme` int unsigned NOT NULL,
  `nota` float(2,1) NOT NULL,
  `ds_comentario` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_filme` (`id_filme`),
  CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`id_filme`) REFERENCES `filme` (`id`),
  CONSTRAINT `avaliacao_chk_1` CHECK (((`nota` >= 0) and (`nota` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela filmesbd2.avaliacao: ~0 rows (aproximadamente)
DELETE FROM `avaliacao`;
INSERT INTO `avaliacao` (`id`, `id_usuario`, `id_filme`, `nota`, `ds_comentario`) VALUES
	(1, 1, 1, 4.5, 'Excelente filme!'),
	(2, 2, 2, 5.0, 'Obra-prima do cinema!');

-- Copiando estrutura para tabela filmesbd2.filme
CREATE TABLE IF NOT EXISTS `filme` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `distribuidora` varchar(255) NOT NULL,
  `diretor` varchar(255) NOT NULL,
  `elenco` json NOT NULL,
  `genero` varchar(255) NOT NULL,
  `ano_lancamento` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela filmesbd2.filme: ~0 rows (aproximadamente)
DELETE FROM `filme`;
INSERT INTO `filme` (`id`, `nome`, `distribuidora`, `diretor`, `elenco`, `genero`, `ano_lancamento`) VALUES
	(1, 'Matrix', 'Warner Bros', 'Wachowski', '["Keanu Reeves", "Carrie-Anne Moss"]', 'Ficção Científica', 1999),
	(2, 'O Senhor dos Anéis', 'New Line Cinema', 'Peter Jackson', '["Elijah Wood", "Ian McKellen"]', 'Fantasia', 2001);

-- Copiando estrutura para tabela filmesbd2.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela filmesbd2.usuario: ~2 rows (aproximadamente)
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`) VALUES
	(1, 'João', 'joao@email.com', '$2b$05$KpUKLvlOSAiCwArhpK1In.AkEERO0udOikt/d1kgF25gVyC8AZDOC'),
	(2, 'Maria', 'maria@email.com', '$2b$05$I8.5ky3DOGpy5xtY36iuheQdLe7f.ywbS3fQAXt1KUnKCOwBJj83C');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
