-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 112.169.231.62    Database: gm
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `point_subtract`
--

DROP TABLE IF EXISTS `point_subtract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point_subtract` (
  `point_subtract_id` int NOT NULL AUTO_INCREMENT,
  `points_subtracted` int NOT NULL,
  `subtracted_reason` varchar(255) NOT NULL,
  `subtracted_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`point_subtract_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `point_subtract_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_subtract`
--

LOCK TABLES `point_subtract` WRITE;
/*!40000 ALTER TABLE `point_subtract` DISABLE KEYS */;
INSERT INTO `point_subtract` VALUES (1,200,'챌린지 참가','2024-04-12 10:51:03',81),(2,200,'챌린지 참가','2024-04-15 12:06:36',82),(3,300,'챌린지 참가','2024-04-15 12:19:27',82),(4,200,'챌린지 참가','2024-04-17 12:48:11',81),(5,200,'챌린지 참가','2024-04-17 12:59:42',80),(6,200,'챌린지 참가','2024-04-17 13:02:26',80),(7,200,'챌린지 참가','2024-04-17 18:16:35',80),(8,200,'챌린지 참가','2024-04-17 18:30:46',80),(9,200,'챌린지 참가','2024-04-18 10:45:18',80),(12,200,'챌린지 참가','2024-04-18 12:10:44',80),(13,200,'챌린지 참가','2024-04-18 14:55:21',80),(14,200,'챌린지 참가','2024-04-18 15:43:16',80),(15,200,'챌린지 참가','2024-04-18 17:22:57',92),(16,0,'챌린지 참가','2024-04-18 17:25:41',92),(17,300,'챌린지 참가','2024-04-18 17:35:41',92),(18,123,'챌린지 참가','2024-04-18 18:22:08',99),(19,123,'챌린지 참가','2024-04-18 18:22:49',99),(20,123,'챌린지 참가','2024-04-18 18:23:34',99),(21,300,'챌린지 참가','2024-04-18 18:35:05',92),(22,100,'챌린지 참가','2024-04-19 02:22:20',80),(30,200,'챌린지 참가','2024-04-19 14:47:42',80);
/*!40000 ALTER TABLE `point_subtract` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19 17:42:58
