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
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenges` (
  `ch_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` varchar(100) NOT NULL,
  `category` int DEFAULT NULL,
  `betting_point` int DEFAULT '200',
  `proceed` enum('rec','pr','done') NOT NULL DEFAULT 'rec',
  `regist_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `ch_start_date` varchar(10) DEFAULT NULL,
  `ch_end_date` varchar(10) DEFAULT NULL,
  `verify_term` int DEFAULT '1' COMMENT '1: 매일\\n2: 평일\\n3: 주말\\n4: 주 1일\\n5: 주 2일\\n6: 주 3일',
  `challenge_period` int DEFAULT '3' COMMENT '1: 1주간\n2: 2주간\n3: 4주간\n4: 6주간\n5: 8주간',
  `count` int DEFAULT '1',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`ch_id`),
  KEY `ch_user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
INSERT INTO `challenges` VALUES (71,'eeee','eeee',3,300,'rec','2024-04-18 17:35:41','2024-04-18','2024-04-28',1,3,1,92),(72,'Weight Loss Challenge','Join our weight loss challenge!',1,50,'rec','2024-04-18 09:00:00','2024-04-20','2024-05-20',1,3,30,83),(73,'Muscle Gain Challenge','Join our muscle gain challenge!',2,100,'rec','2024-04-18 10:00:00','2024-04-21','2024-05-21',1,3,25,83),(74,'Health Improvement Challenge','Join our health improvement challenge!',3,75,'pr','2024-04-19 11:00:00','2024-04-22','2024-05-22',1,3,20,83),(75,'Cardio Challenge','Join our cardio challenge!',1,30,'pr','2024-04-20 12:00:00','2024-04-23','2024-05-23',1,3,15,83),(76,'Flexibility Challenge','Join our flexibility challenge!',3,40,'done','2024-04-21 13:00:00','2024-04-24','2024-05-24',1,3,10,83),(77,'Healthy Eating Challenge','Join our healthy eating challenge!',1,20,'done','2024-04-22 14:00:00','2024-04-25','2024-05-25',1,3,5,81),(78,'Mindfulness Challenge','Join our mindfulness challenge!',3,60,'done','2024-04-23 15:00:00','2024-04-26','2024-05-26',1,3,8,83),(79,'Strength Training Challenge','Join our strength training challenge!',2,80,'done','2024-04-24 16:00:00','2024-04-27','2024-05-27',1,3,12,83),(80,'Yoga Challenge','Join our yoga challenge!',3,35,'done','2024-04-25 17:00:00','2024-04-28','2024-05-28',1,3,18,83),(81,'HIIT Challenge','Join our HIIT challenge!',1,45,'done','2024-04-26 18:00:00','2024-04-29','2024-05-29',1,3,22,83),(84,'12344','1231431',2,123,'rec','2024-04-18 18:23:34','2024-04-18','2024-05-16',1,3,1,99),(85,'qqqq','ㅁㄴㅇ',3,300,'rec','2024-04-18 18:35:05','2024-04-18','2024-05-02',1,3,1,92),(94,'1234','string',1,200,'rec','2024-04-19 14:47:42','2024-04-19','2024-04-20',1,3,1,80);
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
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
