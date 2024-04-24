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
-- Table structure for table `pt`
--

DROP TABLE IF EXISTS `pt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt` (
  `pt_id` int NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(128) DEFAULT NULL,
  `plan_desc` varchar(4096) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `pt_log_id` int DEFAULT NULL,
  PRIMARY KEY (`pt_id`),
  KEY `pt_user_id_idx` (`user_id`),
  KEY `pt_pt_log_id_idx` (`pt_log_id`),
  CONSTRAINT `pt_pt_log_id` FOREIGN KEY (`pt_log_id`) REFERENCES `pt_log` (`pt_log_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pt_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt`
--

LOCK TABLES `pt` WRITE;
/*!40000 ALTER TABLE `pt` DISABLE KEYS */;
INSERT INTO `pt` VALUES (1,NULL,'1712022414.2932796',NULL,NULL),(2,NULL,'1712022473.0124846',NULL,NULL),(3,NULL,'1712024595.142887',NULL,NULL),(4,NULL,'1712024608.4191132',NULL,NULL),(5,NULL,'1712024736.4113405',NULL,NULL),(8,'Overall health improvement advanced','전반적인 건강 개선 목표, 고급 운동 수준 및 호흡기 질환이있는 여성 고객을위한 교육 안내서 <br> <br> 1.평가 및 모니터링 : 고객이 나이가 많고 호흡기 질환이 있기 때문에 훈련 프로그램을 시작하기 전에 건강 상태를 평가해야합니다.이것은 우리가 그녀를위한 안전하고 효과적인 일상을 설계하는 데 도움이 될 것입니다.필요한 경우 적절한 지침을 보장하기 위해 의료 서비스 제공자와 함께 일할 수도 있습니다. <br> <br> 2.워밍업 : 모든 운동 세션 전에 부드러운 스트레칭 운동, 가벼운 에어로빅 활동 (예 : 걷기 또는 자전거) 및 주요 근육 그룹의 역동적 인 스트레치가 포함 된 10 분 워밍업을 포함하십시오.이것은 다가오는 운동 세션을 준비하는 데 도움이 될 것입니다. <br> <br> 3.운동 프로그램 : 전반적인 건강 개선을 달성하려면 심혈관 운동, 근력 훈련, 유연성 및 균형 운동을 포함한 균형 잡힌 훈련 프로그램에 중점을 둡니다.호흡기 상태를 고려하면서 프로그램을 고급 피트니스 수준에 적용하십시오.몇 가지 제안은 다음과 같습니다. <br> <br> - 심혈관 운동 : 걷기, 수영, 사이클링 또는 타원 훈련과 같은 활동을 포함합니다.심장 건강과 전반적인 체력을 향상시키기 위해 30-45 분의 중간 강도 심장 세션을 목표로하십시오. <br> <br>-근력 훈련 : 자유 웨이트, 저항 밴드 또는 체중 운동의 조합으로 모든 주요 근육 그룹에서 작업하십시오.부상의 위험을 최소화하기위한 적절한 형태와 기술을 강조하십시오.스쿼트, 데드 리프트, 폐, 벤치 프레스 및 줄과 같은 복합 운동에 중점을 둡니다. <br> <br> - 유연성 : 유연성을 향상시키기 위해 각 운동 세션 전에 동적 스트레칭과 정적 스트레칭을 포함시킵니다.모든 주요 근육 그룹을 대상으로하고 관절에 대한 적절한 움직임 범위를 보장합니다. <br> <br>-균형 운동 : 낙상을 방지하고 안정성을 유지하기 위해 단일 레그 스탠드, 발 뒤꿈치 걷기 및 1 위에 서있는 것과 같은 균형 운동을 통합하십시오.스쿼트 나 폐를 수행하는 동안 다리.이것은 핵심 근육을 강화하고 독점을 향상시킬 것입니다. <br> <br> 4.호흡기 질환에 대한 적응 : 고객이 호흡기 질환이 있으므로 훈련 프로그램에 대한 다음과 같은 적응을 고려하십시오. <br> <br> - 공기 중 입자 흡입을 증가시키는 운동을 피하십시오 (예 : 고통의 시즌 동안 야외 자전거 타기). <Br.> - 꽃가루 수가 낮을 때 야외 훈련 세션을 장려하십시오. <br> - 운동 중에 그녀와 함께 흡입기를 가지고 효과적으로 사용하는 방법을 알고 있는지 확인하십시오. <br> - 운동 중에 호흡 패턴을 모니터링하십시오.호흡 곤란 또는 천명.그에 따라 운동의 강도 또는 유형을 조정하십시오. <br> - 건강 상태에 대한 업데이트를 위해 의료 서비스 제공자와 정기적으로 의사 소통을 장려하십시오. <br> <br> 5.진행과 수정 : 일을 흥미롭고 도전적으로 유지하려면 고객의 운동에 대한 변형을 도입하십시오.인터벌 트레이닝, 저항 밴드 또는 체중 회로를 사용하여보다 역동적 인 운동 경험을 제공 할 수도 있습니다.정기적으로 그녀의 진행 상황을 평가하고 동기 부여를 유지하고 전반적인 건강의 지속적인 개선을 보장하기 위해 필요에 따라 프로그램을 조정하십시오. <br> <br> 6.영양 : 적절한 영양은 건강 목표를 달성하는 데 필수적인 측면입니다.고객이 과일, 채소, 통 곡물, 마른 단백질 및 건강한 지방으로 균형 잡힌 식단을 먹도록 격려하십시오.가공 식품, 설탕 및 건강에 해로운 지방을 제한하십시오.하루 종일 적절한 수화는 전반적인 복지를 유지하는 데 중요합니다. <br> <br> 7.회복 : 고객이 운동간에 적절한 휴식과 회복을 받도록합니다.그녀는 스트레칭, 가벼운 걷기 또는 요가와 같은 활성 회복 기술을 사용하여 근육통을 줄이고 향후 세션 중에 성능을 향상시킬 것을 권장합니다. <br> <br> 8.지원 시스템 : 고객이 가족, 친구 또는 개인 트레이너가 더 나은 건강을 향한 여정에 참여하여 강력한 지원 시스템을 구축하도록 도와줍니다.이것은 장기적인 성공에 필수적인 동기 부여, 책임 및 사회적 상호 작용을 제공 할 수 있습니다. <br> <br> 운동 중에 항상 안전과 적절한 형태의 부상 위험을 최소화하고 고객의 전반적인 복지를 보장해야합니다..',122,NULL),(9,'숨쉬기만해도 살찌자','고거슨 어렵구요',80,NULL),(11,NULL,NULL,125,NULL),(12,'Muscle gain beginner','근육 이득한 여성 초보자를위한 훈련 안내서 목표 및 근골격계 장애 : <br> <br> 1.의사 또는 물리 치료사와의 상담 : 운동 프로그램을 시작하기 전에 훈련 세션 중에 고객의 근골격계 장애가 적절하고 안전하게 관리되도록 의료 전문가와 상담하는 것이 중요합니다. <br> <br> 2.맞춤화 된 운동 계획 : 초보자로서 근육 강도와 지구력 구축에 중점을 둔 기본 운동으로 시작하십시오.스쿼트, 데드 리프트, 벤치 프레스 및 행과 같은 복합 운동을 통합하여 여러 근육 그룹을 동시에 자극합니다.고객이 힘과 자신감을 얻음에 따라 점차적으로 격리 운동으로 진행됩니다. <br> <br> 3.빈도 : 전신 운동에 중점을 둔 주당 2-3 개의 교육 세션으로 시작합니다.고객이 더 편안하고 강해지면서 일주일에 4-5 세션으로 빈도를 증가시켜 상류 및 하체 운동을 번갈아 가며 <br> <br> 4.운동 강도 : 근골격계 장애로 인한 초과 스트레스 관절을 피하기 위해 중간 정도의 강도 (1 회 반복 최대의 60-70%)로 시작하십시오.강도가 향상됨에 따라 최적의 근육 성장을 위해 강도를 점차 75-85%로 증가시킵니다. <br> <br> 5.적절한 형태와 기술 : 각 운동 전반에 걸쳐 적절한 형태와 기술을 유지하는 데 중점을 둡니다.이것은 부상을 예방할뿐만 아니라 최대 근육 활성화를 보장합니다.다이나믹 스트레칭, 폼 롤링 및 모빌리티 드릴과 같은 워밍업 운동을 통합하여 신체를 훈련 할 준비를합니다. <br> <br> 6.회복 및 휴식 일 : 고객이 적절한 수면, 수화 및 영양을 포함한 적절한 회복 계획을 따르도록 격려하십시오.근육 수리와 성장을 보장하기 위해 강렬한 운동 사이에 최소 48 시간의 휴식을 취하십시오. <br> <br> 7.진행 추적 : 강도, 지구력 및 체성분의 변화를 모니터링하여 고객의 진행 상황을 추적합니다.성과와 개인 목표에 따라 그에 따라 훈련 계획을 조정하십시오. <br> <br> 8.안전 조치 : 운동 중 부상을 예방하기위한 안전 예방 조치에 대해 고객이 잘 알고 있는지 확인하십시오.여기에는 장비의 적절한 사용, 안전한 환경 유지 및 오버 트레이닝을 피하는 것이 포함됩니다. <br> <br> 9.의료 전문가와의 의사 소통 : 훈련 과정 전반에 걸쳐 의사 나 물리 치료사와의 열린 의사 소통을 유지하여 근골격계 장애의 최적 관리를 보장하고 건강 상태의 변화를 모니터링합니다. <br> <br> 10.동기 부여와 책임 : 고객이 현실적인 목표를 설정하고 여행을 따라 작은 성공을 축하함으로써 동기를 유지하도록 격려하십시오.그들이 일관되고 훈련 프로그램에 헌신 할 수 있도록 지원과 지침을 제공합니다.',126,NULL);
/*!40000 ALTER TABLE `pt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 11:15:54
