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
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `survey_id` int NOT NULL AUTO_INCREMENT,
  `gender` varchar(64) NOT NULL,
  `age` varchar(64) NOT NULL,
  `goal` varchar(64) NOT NULL,
  `level` varchar(64) NOT NULL,
  `abnormal` varchar(128) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`survey_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `survey_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (29,'female','young','Overall health improvement','Intermediate','musculoskeletal disorders',73),(30,'female','young','Overall health improvement','Intermediate','no health problems',74),(31,'female','young','Overall health improvement','Intermediate','no health problems',78),(32,'female','young','Overall health improvement','Intermediate','no health problems',80),(33,'male','young','Body fat reduction','beginner','Body fat reduction beginner',82),(34,'','','','','',83),(35,'','','','','',84),(36,'','','','','',85),(37,'female','young','Overall health improvement','Intermediate','no health problems',86),(38,'female','young','Overall health improvement','Intermediate','no health problems',87),(39,'female','young','Overall health improvement','Intermediate','musculoskeletal disorders',91),(40,'female','old','Muscle gain','Intermediate','no health problems',92),(41,'female','old','Overall health improvement','advanced','no health problems',93),(42,'female','young','Overall health improvement','Intermediate','no health problems',94),(43,'female','young','Overall health improvement','Intermediate','no health problems',95),(44,'female','young','Overall health improvement','Intermediate','no health problems',96),(45,'','','','','',99),(46,'female','young','Overall health improvement','Intermediate','no health problems',100),(49,'female','young','Muscle gain','Intermediate','no health problems',104),(51,'male','young','Body fat reduction','beginner','musculoskeletal disorders',106),(65,'female','old','Overall health improvement','advanced','respiratory diseases',122),(67,'female','young','Overall health improvement','Intermediate','no health problems',125),(68,'female','young','Muscle gain','beginner','musculoskeletal disorders',126);
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 11:15:52
