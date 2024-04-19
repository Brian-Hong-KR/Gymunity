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
-- Table structure for table `pt_log`
--

DROP TABLE IF EXISTS `pt_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_log` (
  `pt_log_id` int NOT NULL AUTO_INCREMENT,
  `daily_program` varchar(1024) NOT NULL,
  `done_datetime` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`pt_log_id`),
  KEY `pl_user_id_idx` (`user_id`),
  CONSTRAINT `pl_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_log`
--

LOCK TABLES `pt_log` WRITE;
/*!40000 ALTER TABLE `pt_log` DISABLE KEYS */;
INSERT INTO `pt_log` VALUES (119,'[\'Walking with high knees\', \'Arm circles forward and backward\', \'Seated rows (3 sets x 12 reps)\', \'Bicep curls (3 sets x 10 reps each arm)\', \'Tricep extensions (3 sets x 8 reps each arm)\', \'Side plank hip abduction (3 sets x 15 seconds each side)\', \'Glute bridges (3 sets x 12 reps)\', \'Static stretches (neck, shoulders, arms, lower back, legs)\']','2024-04-08 12:27:23',NULL),(120,'[\'Walking with high knees\', \'Arm circles forward and backward\', \'Seated rows (3 sets x 12 reps)\', \'Bicep curls (3 sets x 10 reps each arm)\', \'Tricep extensions (3 sets x 8 reps each arm)\', \'Side plank hip abduction (3 sets x 15 seconds each side)\', \'Glute bridges (3 sets x 12 reps)\', \'Static stretches (neck, shoulders, arms, lower back, legs)\']','2024-04-08 14:52:16',NULL),(121,'[\'Walking with high knees\', \'Arm circles forward and backward\', \'Seated rows (3 sets x 12 reps)\', \'Bicep curls (3 sets x 10 reps each arm)\', \'Tricep extensions (3 sets x 8 reps each arm)\', \'Side plank hip abduction (3 sets x 15 seconds each side)\', \'Glute bridges (3 sets x 12 reps)\', \'Static stretches (neck, shoulders, arms, lower back, legs)\']','2024-04-12 11:21:53',NULL);
/*!40000 ALTER TABLE `pt_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19 17:42:59
