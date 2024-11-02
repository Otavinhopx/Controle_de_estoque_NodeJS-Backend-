-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: controle_de_estoque
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(300) NOT NULL,
  `descricao` varchar(500) NOT NULL,
  `imagem` varchar(2555) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Mouse Redragon King Cobra','Mouse USB gamer para computador','https://images7.kabum.com.br/produtos/fotos/185027/mouse-gamer-redragon-king-cobra-v2-rgb-chroma-24000dpi-sensor-optico-usb-preto-m711-fps-1_1626810327_g.jpg',160.00,7),(7,'Havit HV-H2232d','Fone de Ouvido, Gamer, Iluminação RGB, com Microfone, Falante de 50mm','https://m.media-amazon.com/images/I/516HwNOJoUL._AC_SL1197_.jpg',85.00,18),(12,'Eco Dot 5','O Echo Dot com o melhor som já lançado | Cor Preta','https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX679_.jpg',368.99,7),(13,'Câmera Ip Icsee','Wifi Hd 1080p A8 Câmera de Segurança Prova D\'água Infravermelho Externa','https://m.media-amazon.com/images/I/417FNo-JihL._AC_SX679_.jpg',84.00,5),(14,'Epson EcoTank L3250','Multifuncional, Tanque de Tinta Colorida, Wi-Fi Direct, USB, Bivolt, Preto','https://m.media-amazon.com/images/I/51T-6cdhyaL._AC_SX679_.jpg',1039.00,2),(16,'PlayStation®5','Slim Edição Digital com 2 Jogos','https://m.media-amazon.com/images/I/51SM5xU-M1L._AC_SX679_.jpg',3479.00,1),(17,'Volante Logitech G923','Volante Logitech G923 para PS5, PS4 e PC com Force Feedback TRUEFORCE, Pedais Responsivos, Launch Control e Acabamento em Couro','https://m.media-amazon.com/images/I/71pJHPTyacL._AC_SX679_.jpg',2405.00,3);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-02 10:08:20
