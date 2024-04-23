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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_account_id` varchar(45) NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `admin_yn` enum('y','n') NOT NULL DEFAULT 'n',
  `grade_name` varchar(50) DEFAULT NULL,
  `last_signin` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname_UNIQUE` (`nick_name`),
  UNIQUE KEY `user_account_id_UNIQUE` (`user_account_id`),
  KEY `user_grade_id_idx` (`grade_name`),
  CONSTRAINT `user_grade_name` FOREIGN KEY (`grade_name`) REFERENCES `grades` (`grade_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (73,'bbb','d12352','n',NULL,'2024-04-09 16:45:36'),(74,'nnn','dfg1q1','n',NULL,'1999-01-01 00:00:00'),(78,'nnn1','dfg1q1543','n',NULL,'2024-04-09 17:29:24'),(80,'vcn123','string','y','골드','2024-04-22 20:30:33'),(81,'co','나나','n','브론즈','1999-01-01 00:00:00'),(82,'dfgj113','dfgfdg1','n','브론즈','2024-04-12 21:51:20'),(83,'ggg123','gggggds','n','브론즈',NULL),(84,'ggg1124','fdgwqq1','n','브론즈',NULL),(85,'ggg1135','ggfd1','n','브론즈',NULL),(86,'ggg','ggggg','n','브론즈',NULL),(87,'asd111234','1235555','n','브론즈','2024-04-18 10:16:21'),(91,'ggg11123','gdddqq','n','브론즈','2024-04-18 10:43:17'),(92,'qwe1234','gmgmgmr3311','n','실버','2024-04-21 01:03:42'),(93,'qwe','sssss','n','브론즈','2024-04-22 18:42:10'),(94,'kkk','kkk','n','브론즈',NULL),(95,'nmnm','mnm','n','브론즈','2024-04-18 17:10:11'),(96,'xcxc','xcx','n','브론즈','2024-04-18 17:43:10'),(99,'aaaaaa','aaaaaaaaaaa','n','브론즈','2024-04-18 19:06:55'),(100,'rtrt','rtrt','n','브론즈','2024-04-18 20:58:36'),(104,'test','테스튼디','n','브론즈',NULL),(106,'opop','opop','n','브론즈','2024-04-19 17:17:52'),(122,'aaa1234','호호','n','브론즈',NULL),(125,'dfg','dfg','n','브론즈','2024-04-22 12:45:25'),(126,'bbb123','11442','n','브론즈','2024-04-22 21:34:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 11:15:53
