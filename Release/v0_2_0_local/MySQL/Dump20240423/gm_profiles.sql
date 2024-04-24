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
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `pf_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_id` int DEFAULT NULL,
  `pl_id` int DEFAULT NULL,
  `pt_id` int DEFAULT NULL,
  `ch_id1` int DEFAULT '0',
  `ch_id2` int DEFAULT '0',
  `mem_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pf_id`),
  KEY `pr_pl_id_idx` (`pl_id`),
  KEY `pr_pt_id_idx` (`pt_id`),
  KEY `pr_ch_id_idx` (`ch_id1`),
  KEY `pr_user_id_idx` (`user_id`),
  KEY `mem_id_idx` (`mem_id`),
  CONSTRAINT `fk_profile_mem_id` FOREIGN KEY (`mem_id`) REFERENCES `members` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mem_id` FOREIGN KEY (`mem_id`) REFERENCES `members` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pr_pl_id` FOREIGN KEY (`pl_id`) REFERENCES `pt_log` (`pt_log_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pr_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `pt` (`pt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pr_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (60,'$2a$10$WxLaKNGq/y5mQ8VmRI.5S.niiuA5O.7tFwzzJFzcGHi4IHXCoeJ1u','1asd@ggnaver.com',73,NULL,NULL,0,0,NULL,'2024-04-09 16:45:31'),(61,'$2a$10$8Ao/PZsLfLevlZP3o14MWu1CA/Pt4tNDgenKjvTo/4qoWnEhwBnYy','asd@naver.comdf',74,NULL,NULL,0,0,NULL,'2024-04-09 17:20:01'),(62,'$2a$10$yMJu5HQBqkpI/E.k96lghOO5nsAIr39KxmFylVlSrl.ppIOJztfFq','asd@naver.comdf',78,NULL,NULL,0,0,NULL,'2024-04-09 17:23:50'),(64,'$2a$10$rRw7HeGnDxqXxA.xLTDzi.IvQCGAUqdFIYERSaihH.1ZjBTxovftu','string',80,NULL,NULL,0,0,NULL,'2024-04-09 17:35:54'),(65,'$2a$10$wErvgxWCtNpcvkKmmpwseOAvdZyyuN5UdqkNtT96JuXo25u0FEFuK','strfg@ing.ee',82,NULL,NULL,0,0,NULL,'2024-04-12 21:39:33'),(66,'$2a$10$HZ184v1VnyoMXVJQBMnBeu3YxB1ymErWyIYlbgy5XCQUop8x1mYQ2','kk@kk.kk1',83,NULL,NULL,0,0,NULL,'2024-04-15 17:55:29'),(67,'$2a$10$b4p0stK5Q1QEsQcRkmfPQu8mF/BtSh/PVtSo1zH2tm.lx1DqQ4qnm','12@nasd.na',84,NULL,NULL,0,0,NULL,'2024-04-15 18:13:01'),(68,'$2a$10$Cfq1YHK5kdmHTqx.IlVCFOll9uuWn5nLkC041XgGVw/Xq8Ly7iTuu','1asd@naver.co234m',85,NULL,NULL,0,0,NULL,'2024-04-15 18:18:19'),(69,'$2a$10$fBdHomlY1Awj.85Cpn68/ejSXqqXc.S5g4FEC1ku1GWQcXtWJsHiK','1asd@nav234er.com',86,NULL,NULL,0,0,NULL,'2024-04-16 10:11:09'),(70,'$2a$10$/BPclz7vkli8tW7Lpqc.Yeq.48uthGow6qTnO.5V0.vwjCN/gL0MK','asd@nave233r.com',87,NULL,NULL,0,0,NULL,'2024-04-16 10:32:03'),(71,'$2a$10$lL9cGzu33tXq2b4HdFQp3uOSWALNh0mUeJge4Wrh2y0E2ALOY9RdC','1asd@na22ver.com',91,NULL,NULL,0,0,NULL,'2024-04-16 14:50:23'),(76,'hashed_password_example','example@example.com',81,119,1,77,74,48,'2024-04-16 12:00:00'),(77,'$2a$10$OyJV.rcVmdrGsRnjikEi6usoBh.XdfP86WmnX8hPGaO.xtOs2qZC.','1asd@nav222er.com',92,NULL,NULL,0,0,NULL,'2024-04-17 15:29:39'),(78,'$2a$10$GMirC23FAPWrUBxU7SiXH.dcURMCg9cRXxOcDKUgquZjRZRzxSZbK','sssss@sssss.com',93,NULL,NULL,0,0,NULL,'2024-04-18 12:53:10'),(79,'$2a$10$ox6DpL2tl./qEGM4PLjMXuLSTdQLQOCSCNhk4Ij/oDfAsbw3I3YfO','kkk@kkk.com',94,NULL,NULL,0,0,NULL,'2024-04-18 15:01:11'),(80,'$2a$10$g4hAzyfaoBuScaMIabZ2kOsYQkrg3CjydP/oag42LZA5Tnlj3KtEq','mnm@mnm.com',95,NULL,NULL,0,0,NULL,'2024-04-18 16:40:22'),(81,'$2a$10$yAzMBP3lykPEDkA17eaDROLjwuHinR91z66zCymrsCZz6.llDuJP.','xcx@xcx.com',96,NULL,NULL,0,0,NULL,'2024-04-18 17:41:50'),(82,'123','dd@dd',99,NULL,NULL,0,0,NULL,'2024-04-18 17:46:26'),(83,'$2a$10$zIZVrm670VZ39ZX2RxRw8u7z50uz.eYo2m0kXl4yo9iiWQggOz8b2','rtrt@rtrt',100,NULL,NULL,0,0,NULL,'2024-04-18 19:12:40'),(86,'$2a$10$s9Q9nGpPxIpKaUmkXrpVIuY9u.FQ3uUznQo/DK1p0quau28Vo.AaG','test@naver.com',104,NULL,NULL,0,0,NULL,'2024-04-19 15:16:41'),(88,'$2a$10$Y6HUGTsEFZl1LJF4lstBjObtcJ1e9S4P4EKqP.A56B1KcoBYcJUza','opop@opop',106,NULL,NULL,0,0,NULL,'2024-04-19 16:44:10'),(102,'$2a$10$XeCH08WvqljA0G8aqlYsR.Mz58q4sNBNWXXjvwmo.Rqm105jmerui','gka@ma.co',122,NULL,NULL,0,0,NULL,'2024-04-21 16:58:02'),(104,'$2a$10$v5tT2NrcYsGFnc3AFAms3.rpd9QSu27jiNVuTpz9uiIUNouBWg/DS','dfg@qwe',125,NULL,NULL,0,0,NULL,'2024-04-22 12:28:43'),(105,'$2a$10$cY1Xe5AV.7aTuacSGx7/NeDq.KNc4gqurHpvu.SHRFcWGo1dcObJi','1111@123.1234',126,NULL,NULL,0,0,NULL,'2024-04-22 20:45:11');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
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
