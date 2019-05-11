-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: gms
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buying_log`
--

DROP TABLE IF EXISTS `buying_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `buying_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `good_id` int(11) DEFAULT NULL,
  `buying_price` double(8,2) NOT NULL,
  `number` int(10) NOT NULL DEFAULT '1',
  `buying_time` datetime NOT NULL,
  `operater_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `operater_id` (`operater_id`) USING BTREE,
  KEY `good_id` (`good_id`) USING BTREE,
  CONSTRAINT `buying_log_ibfk_1` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`operater_id`),
  CONSTRAINT `buying_log_ibfk_2` FOREIGN KEY (`good_id`) REFERENCES `good` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buying_log`
--

LOCK TABLES `buying_log` WRITE;
/*!40000 ALTER TABLE `buying_log` DISABLE KEYS */;
INSERT INTO `buying_log` VALUES (20,1,1.00,1,'2019-05-08 00:00:00',1),(21,3,2.00,1,'2019-05-08 00:00:00',1),(22,2,1.00,222,'2019-05-08 00:00:00',1),(23,3,2.00,152,'2019-05-08 00:00:00',1),(24,4,100.00,100,'2019-05-09 00:00:00',1),(25,6,10.00,1,'2019-05-09 00:00:00',1),(26,7,452.00,670,'2019-05-09 00:00:00',1),(27,4,3.00,1,'2019-05-09 00:00:00',1),(28,5,10.00,10,'2019-05-09 00:00:00',1),(29,2,1.00,100,'2019-05-09 00:00:00',1),(30,1,1.00,51,'2019-05-09 00:00:00',1),(31,1,1.00,100,'2019-05-09 00:00:00',1),(32,1,1.00,900,'2019-05-09 00:00:00',1),(33,3,2.00,500,'2019-05-09 00:00:00',1);
/*!40000 ALTER TABLE `buying_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_type`
--

DROP TABLE IF EXISTS `card_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `card_type` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `youxiao_cishu` int(5) NOT NULL DEFAULT '0',
  `youxiao_tianshu` int(5) NOT NULL DEFAULT '0',
  `price` double(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_type`
--

LOCK TABLES `card_type` WRITE;
/*!40000 ALTER TABLE `card_type` DISABLE KEYS */;
INSERT INTO `card_type` VALUES (1,'月卡',2,30,455.00),(2,'年卡',2,365,5555.00),(3,'日卡',1,1,3.00),(4,'天王卡',100,0,354.00),(6,'大神',456,45,6.00),(35,'小王卡',34,5,45.00),(59,'dsfg',3524,25,542.00);
/*!40000 ALTER TABLE `card_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tele_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `position_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int(11) unsigned zerofill NOT NULL DEFAULT '00000000000',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'小王','15130188001','会计',00000000000),(2,'老李','3524','私教',00000000000),(56,'小张','534225','老板',00000000000),(57,'大伟','325','私教',00000000000),(58,'老钟','235','私教',00000000000),(59,'王钱','5445','私教',00000000000),(60,'刘明','325425','私教',00000000000),(61,'方芳','42352','私教',00000000000);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `good`
--

DROP TABLE IF EXISTS `good`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `good` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `buying_price` double(8,2) DEFAULT NULL,
  `selling_price` double(8,2) DEFAULT NULL,
  `credit` int(10) DEFAULT NULL,
  `left_number` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `good`
--

LOCK TABLES `good` WRITE;
/*!40000 ALTER TABLE `good` DISABLE KEYS */;
INSERT INTO `good` VALUES (1,'矿泉水',1.00,2.00,1,1000),(2,'方便面',1.00,3.50,1,900),(3,'可乐',2.00,5.00,1,1300),(4,'冰淇淋',3.00,3.00,5,1000),(5,'咖啡',10.00,15.00,10000,1000),(6,'啤酒',10.00,10.00,10,10000),(7,'爱的',452.00,542.00,34,2000);
/*!40000 ALTER TABLE `good` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `agenda` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `tele_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `register_date` datetime DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `member_card_buy_id` int(11) DEFAULT NULL,
  `balance` double(10,2) unsigned zerofill DEFAULT NULL,
  `credit` int(8) unsigned zerofill DEFAULT NULL,
  `total_consumption` double(10,2) unsigned zerofill DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `card_type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `youxiao_cishu` int(255) DEFAULT NULL,
  `youxiao_tianshu` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45374 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (45356,'小明','男',NULL,'null','2019-05-08 00:00:00','可用',40,0001548.50,00000034,0000346.50,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45357,'小张','男',NULL,'null','2019-05-08 00:00:00','可用',57,0999848.00,00000000,0000000.00,'2019-05-09 00:00:00','2020-05-08 00:00:00','年卡',2,365),(45358,'小曹','男',NULL,'null','2019-05-08 00:00:00','可用',42,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45359,'小红','男',NULL,'null','2019-05-08 00:00:00','可用',43,1000000.00,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45360,'小丽','男',NULL,'null','2019-05-08 00:00:00','可用',44,0009500.00,00000049,0000500.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45361,'王明','男',NULL,'null','2019-05-08 00:00:00','可用',45,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45362,'张三','男',NULL,'null','2019-05-08 00:00:00','可用',46,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45363,'李四','男',NULL,'null','2019-05-08 00:00:00','可用',47,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45364,'王五','男',NULL,'null','2019-05-08 00:00:00','可用',48,0999500.00,00000050,0000500.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45365,'赵六','男',NULL,'null','2019-05-08 00:00:00','可用',49,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45366,'周七','男',NULL,'null','2019-05-08 00:00:00','可用',50,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45367,'吴八','男',NULL,'null','2019-05-08 00:00:00','可用',51,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45368,'郑九','男',NULL,'null','2019-05-08 00:00:00','可用',52,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45369,'钱多多','男',NULL,'null','2019-05-08 00:00:00','可用',53,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45370,'李晶晶','男',NULL,'null','2019-05-08 00:00:00','可用',54,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45371,'曹尚','男',NULL,'null','2019-05-08 00:00:00','可用',55,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2020-05-07 00:00:00','年卡',2,365),(45372,'邓等等','男',NULL,'null','2019-05-08 00:00:00','可用',56,NULL,00000000,0000000.00,'2019-05-08 00:00:00','2019-06-07 00:00:00','月卡',2,30),(45373,'老王','男',NULL,'null','2019-05-09 00:00:00','可用',58,9994402.00,00000234,0002348.00,'2019-05-09 00:00:00','2020-05-08 00:00:00','年卡',2,365);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_card_buy_log`
--

DROP TABLE IF EXISTS `member_card_buy_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `member_card_buy_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  `account` double NOT NULL DEFAULT '1',
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `operater_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `card_id` (`card_id`) USING BTREE,
  KEY `member_id` (`member_id`) USING BTREE,
  KEY `operater_id` (`operater_id`) USING BTREE,
  CONSTRAINT `member_card_buy_log_ibfk_1` FOREIGN KEY (`card_id`) REFERENCES `card_type` (`id`),
  CONSTRAINT `member_card_buy_log_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `member_card_buy_log_ibfk_3` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`operater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_card_buy_log`
--

LOCK TABLES `member_card_buy_log` WRITE;
/*!40000 ALTER TABLE `member_card_buy_log` DISABLE KEYS */;
INSERT INTO `member_card_buy_log` VALUES (40,45356,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(41,45357,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(42,45358,1,455,1,'2019-04-08 00:00:00','2019-06-07 00:00:00',1),(43,45359,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(44,45360,1,455,1,'2019-04-07 00:00:00','2019-06-07 00:00:00',1),(45,45361,1,455,1,'2019-03-08 00:00:00','2019-06-07 00:00:00',1),(46,45362,1,455,1,'2019-02-08 00:00:00','2019-06-07 00:00:00',1),(47,45363,1,455,1,'2019-01-08 00:00:00','2019-06-07 00:00:00',1),(48,45364,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(49,45365,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(50,45366,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(51,45367,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(52,45368,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(53,45369,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(54,45370,1,455,1,'2018-05-08 00:00:00','2019-06-07 00:00:00',1),(55,45371,2,5555,1,'2019-05-08 00:00:00','2020-05-07 00:00:00',1),(56,45372,1,455,1,'2019-05-08 00:00:00','2019-06-07 00:00:00',1),(57,45357,2,5555,5555,'2019-05-09 00:00:00','2020-05-08 00:00:00',1),(58,45373,2,5555,455,'2019-05-09 00:00:00','2020-05-08 00:00:00',1);
/*!40000 ALTER TABLE `member_card_buy_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent_menu_id` int(11) DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `permission` int(11) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'会员消费',NULL,'home/memberCost/memberCost',1),(2,'会员管理',NULL,NULL,1),(3,'统计报表',NULL,NULL,1),(4,'商品设置',NULL,NULL,2),(5,'系统设置',NULL,NULL,3),(6,'会员卡类型',5,'home/systemSetting/memberCardSetting',3),(7,'衣柜设置',5,'home/systemSetting/wardrobeSetting',3),(8,'数据备份与恢复',5,'home/systemSetting/backupAndRestore',3),(9,'员工设置',5,'home/systemSetting/employeeSetting',3),(10,'操作员设置',5,'home/systemSetting/operaterSetting',3),(11,'商品基本信息',4,'home/goodsSetting/goodInformation',2),(12,'商品进货',4,'home/goodsSetting/goodBuying',2),(13,'商品退货',4,'home/goodsSetting/goodReturning',2),(14,'商品采购查询',4,'home/goodsSetting/goodBuyingLog',2),(15,'商品销售查询',4,'home/goodsSetting/goodSellingLog',2),(16,'会员消费统计',3,'home/statistical/memberSpending',1),(17,'营业报表',3,NULL,1),(18,'衣柜查询管理',3,'home/statistical/wardrobeQuery',1),(19,'兑换商品统计',3,'home/statistical/memberSpendCredit',1),(20,'会员管理',2,'home/memberManage/memberManage',1),(21,'会员交费统计',2,'home/memberManage/memberPayFee',1),(22,'会员请假管理',2,'home/memberManage/offday',1),(23,'私教管理',2,'home/memberManage/trainerManage',1);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `off_day`
--

DROP TABLE IF EXISTS `off_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `off_day` (
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `operate_time` datetime DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `off_day`
--

LOCK TABLES `off_day` WRITE;
/*!40000 ALTER TABLE `off_day` DISABLE KEYS */;
INSERT INTO `off_day` VALUES ('2019-05-01','2019-05-20','2019-05-09 10:55:40',45358,3),('2019-05-10','2019-05-20','2019-05-06 11:00:01',45361,4);
/*!40000 ALTER TABLE `off_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operater`
--

DROP TABLE IF EXISTS `operater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `operater` (
  `operater_id` int(6) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `permission` int(2) NOT NULL,
  PRIMARY KEY (`operater_id`),
  CONSTRAINT `operater_ibfk_1` FOREIGN KEY (`operater_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operater`
--

LOCK TABLES `operater` WRITE;
/*!40000 ALTER TABLE `operater` DISABLE KEYS */;
INSERT INTO `operater` VALUES (1,NULL,'666666',3),(2,'老李','55555',2);
/*!40000 ALTER TABLE `operater` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `positions` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES (1,'会计'),(2,'老板'),(3,'私教'),(4,'秘书'),(5,'助理');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rend_trainer_log`
--

DROP TABLE IF EXISTS `rend_trainer_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rend_trainer_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trainer_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `operater_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `total_amount` double(10,2) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer_id` (`trainer_id`) USING BTREE,
  KEY `member_id` (`member_id`) USING BTREE,
  KEY `operater_id` (`operater_id`) USING BTREE,
  CONSTRAINT `rend_trainer_log_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`),
  CONSTRAINT `rend_trainer_log_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `rend_trainer_log_ibfk_3` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`operater_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rend_trainer_log`
--

LOCK TABLES `rend_trainer_log` WRITE;
/*!40000 ALTER TABLE `rend_trainer_log` DISABLE KEYS */;
INSERT INTO `rend_trainer_log` VALUES (28,2,45356,1,'2019-05-08 00:00:00','2019-05-09 00:00:00',0000100.00),(29,2,45356,1,'2019-05-08 00:00:00','2019-05-09 00:00:00',0000100.00),(30,57,45357,1,'2019-05-08 00:00:00','2019-05-09 00:00:00',0000052.00),(31,59,45373,1,'2019-05-09 00:00:00','2019-05-10 00:00:00',0003250.00);
/*!40000 ALTER TABLE `rend_trainer_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rend_wardrobe_log`
--

DROP TABLE IF EXISTS `rend_wardrobe_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rend_wardrobe_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wardrobe_id` int(11) NOT NULL,
  `member_id` int(11) NOT NULL,
  `operater_id` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `total_amount` double(10,2) unsigned zerofill DEFAULT NULL,
  `context` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `operate_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wardrobe_id` (`wardrobe_id`) USING BTREE,
  KEY `member_id` (`member_id`) USING BTREE,
  KEY `operater_id` (`operater_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rend_wardrobe_log`
--

LOCK TABLES `rend_wardrobe_log` WRITE;
/*!40000 ALTER TABLE `rend_wardrobe_log` DISABLE KEYS */;
INSERT INTO `rend_wardrobe_log` VALUES (88,7,45357,1,'2019-05-08 00:00:00','2019-05-27 00:00:00',0000100.00,'出租','2019-05-08 17:09:53'),(89,2,45356,1,'2019-05-09 00:00:00','2019-05-09 00:00:00',0000005.00,'出租','2019-05-09 11:19:49');
/*!40000 ALTER TABLE `rend_wardrobe_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_log`
--

DROP TABLE IF EXISTS `return_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `return_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `good_id` int(11) DEFAULT NULL,
  `return_price` double(8,2) NOT NULL,
  `return_number` int(10) NOT NULL,
  `return_time` datetime NOT NULL,
  `operater_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `operater_id` (`operater_id`) USING BTREE,
  KEY `good_id` (`good_id`) USING BTREE,
  CONSTRAINT `return_log_ibfk_1` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`operater_id`),
  CONSTRAINT `return_log_ibfk_2` FOREIGN KEY (`good_id`) REFERENCES `good` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_log`
--

LOCK TABLES `return_log` WRITE;
/*!40000 ALTER TABLE `return_log` DISABLE KEYS */;
INSERT INTO `return_log` VALUES (11,2,1.00,1,'2019-05-08 16:01:17',1),(12,4,3.00,1,'2019-05-08 16:01:18',1),(13,6,10.00,1,'2019-05-08 16:01:18',1),(14,3,2.00,1,'2019-05-09 11:22:13',1),(15,4,3.00,100,'2019-05-09 11:22:14',1),(16,1,1.00,100,'2019-05-09 11:22:14',1);
/*!40000 ALTER TABLE `return_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selling_log`
--

DROP TABLE IF EXISTS `selling_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `selling_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `good_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT '1',
  `selling_type` int(1) DEFAULT NULL,
  `selling_price` double(8,2) DEFAULT NULL,
  `selling_time` datetime DEFAULT NULL,
  `account` double DEFAULT '1',
  `operater_id` int(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `operater_id` (`operater_id`) USING BTREE,
  KEY `good_id` (`good_id`) USING BTREE,
  KEY `member_id` (`member_id`) USING BTREE,
  CONSTRAINT `selling_log_ibfk_1` FOREIGN KEY (`operater_id`) REFERENCES `operater` (`operater_id`),
  CONSTRAINT `selling_log_ibfk_2` FOREIGN KEY (`good_id`) REFERENCES `good` (`id`),
  CONSTRAINT `selling_log_ibfk_3` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selling_log`
--

LOCK TABLES `selling_log` WRITE;
/*!40000 ALTER TABLE `selling_log` DISABLE KEYS */;
INSERT INTO `selling_log` VALUES (64,2,45356,99,0,3.50,'2019-05-09 11:18:57',1,1),(65,3,45360,100,0,5.00,'2019-05-09 11:24:12',1,1),(66,1,45360,1,1,1.00,'2019-05-09 11:24:34',1,1),(67,3,45364,100,0,5.00,'2019-05-09 11:36:02',1,1),(68,2,45373,100,0,3.50,'2019-05-09 14:43:47',1,1),(69,1,45373,999,0,2.00,'2019-05-09 14:43:47',1,1);
/*!40000 ALTER TABLE `selling_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_up_log`
--

DROP TABLE IF EXISTS `top_up_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `top_up_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) DEFAULT NULL,
  `operater_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `money` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_up_log`
--

LOCK TABLES `top_up_log` WRITE;
/*!40000 ALTER TABLE `top_up_log` DISABLE KEYS */;
INSERT INTO `top_up_log` VALUES (19,45356,1,'2019-05-08 16:55:47',1000),(20,45357,1,'2019-05-08 17:00:28',1000000),(21,45356,1,'2019-05-09 11:18:22',1000),(22,45359,1,'2019-05-09 11:22:54',1000000),(23,45360,1,'2019-05-09 11:24:05',10000),(24,45364,1,'2019-05-09 11:35:54',1000000),(25,45373,1,'2019-05-09 14:42:43',10000000);
/*!40000 ALTER TABLE `top_up_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trainer` (
  `trainer_id` int(6) NOT NULL,
  `price` int(4) NOT NULL,
  `status` int(11) unsigned zerofill NOT NULL DEFAULT '00000000000',
  `rend_trainer_log_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`trainer_id`),
  CONSTRAINT `trainer_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES (2,10,00000000001,29,45356),(57,52,00000000001,30,45357),(58,243,00000000000,0,0),(59,325,00000000001,31,45373),(60,325,00000000000,0,0),(61,32,00000000000,0,0);
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wardrobe`
--

DROP TABLE IF EXISTS `wardrobe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wardrobe` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int(1) unsigned zerofill NOT NULL,
  `rend_wardrobe_log_id` int(11) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `price` double(10,2) unsigned zerofill DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wardrobe`
--

LOCK TABLES `wardrobe` WRITE;
/*!40000 ALTER TABLE `wardrobe` DISABLE KEYS */;
INSERT INTO `wardrobe` VALUES (1,'null',2,NULL,NULL,0000005.00,NULL),(2,'null',1,89,45356,0000005.00,'2019-05-09 00:00:00'),(3,NULL,0,NULL,NULL,0000005.00,NULL),(4,NULL,0,NULL,NULL,0000005.00,NULL),(5,NULL,0,NULL,NULL,0000005.00,NULL),(6,NULL,0,NULL,NULL,0000005.00,NULL),(7,'null',1,88,45357,0000005.00,'2019-05-08 00:00:00'),(8,NULL,0,NULL,NULL,0000005.00,NULL),(9,NULL,0,NULL,NULL,0000005.00,NULL),(10,NULL,0,NULL,NULL,0000005.00,NULL),(11,NULL,0,NULL,NULL,0000005.00,NULL),(12,NULL,0,NULL,NULL,0000005.00,NULL),(13,NULL,0,NULL,NULL,0000005.00,NULL),(14,NULL,0,NULL,NULL,0000005.00,NULL),(15,NULL,0,NULL,NULL,0000005.00,NULL),(16,NULL,0,NULL,NULL,0000005.00,NULL),(17,NULL,0,NULL,NULL,0000005.00,NULL),(18,NULL,0,NULL,NULL,0000005.00,NULL),(19,NULL,0,NULL,NULL,0000005.00,NULL),(20,NULL,0,NULL,NULL,0000005.00,NULL);
/*!40000 ALTER TABLE `wardrobe` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-09 15:27:30
