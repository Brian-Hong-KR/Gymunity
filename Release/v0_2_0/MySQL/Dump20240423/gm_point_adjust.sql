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
-- Table structure for table `point_adjust`
--

DROP TABLE IF EXISTS `point_adjust`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point_adjust` (
  `point_adjust_id` int NOT NULL AUTO_INCREMENT,
  `points_adjusted` int DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `adjusted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`point_adjust_id`),
  KEY `pa_user_id_idx` (`user_id`),
  CONSTRAINT `padj_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_adjust`
--

LOCK TABLES `point_adjust` WRITE;
/*!40000 ALTER TABLE `point_adjust` DISABLE KEYS */;
INSERT INTO `point_adjust` VALUES (1,80,'선물','2024-04-22 15:46:36',125),(2,-80,'흐엥','2024-04-22 15:47:37',125),(3,-80,'흐엥','2024-04-22 16:01:10',125),(4,10,'선물','2024-04-22 16:04:15',125),(5,-80,'선물뺏기','2024-04-22 18:51:55',125),(6,-100,'선물뺏기','2024-04-22 19:04:23',125),(7,-100,'선물뺏기','2024-04-22 19:06:19',125),(8,100,'선물','2024-04-22 19:31:55',125),(9,-999,'선물','2024-04-22 19:32:23',125),(10,-500,'그냥','2024-04-22 19:41:53',125),(11,-500,'집 안가서','2024-04-22 19:49:16',125),(12,-500,'집 안가서','2024-04-22 19:56:04',125),(13,-500,'집 안가서','2024-04-22 19:57:46',125),(14,-1000,'집 안가서','2024-04-22 19:58:14',125),(15,-972,'집 안가서','2024-04-22 20:03:30',125),(16,-10,'집 안가서','2024-04-22 20:04:07',125),(17,-10,'집 안가서','2024-04-22 20:08:26',125),(18,-10,'집 안가서','2024-04-22 20:10:28',125),(19,-90,'집 안가서','2024-04-22 20:10:51',125),(20,-90,'집 안가서','2024-04-22 20:11:06',125),(21,-90,'집 안가서','2024-04-22 20:17:11',125),(22,-500,'집 안가서','2024-04-22 20:19:51',125),(23,-500,'집 안가서','2024-04-22 20:22:29',125),(24,-500,'에베벱','2024-04-22 20:26:09',125);
/*!40000 ALTER TABLE `point_adjust` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 11:15:51
