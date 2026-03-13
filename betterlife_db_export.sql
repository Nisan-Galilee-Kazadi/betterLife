-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: betterlife_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `active_statistics`
--

DROP TABLE IF EXISTS `active_statistics`;
/*!50001 DROP VIEW IF EXISTS `active_statistics`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `active_statistics` AS SELECT
 1 AS `id`,
  1 AS `stat_key`,
  1 AS `value`,
  1 AS `label`,
  1 AS `suffix`,
  1 AS `color`,
  1 AS `icon`,
  1 AS `is_active`,
  1 AS `updated_at` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `active_testimonials`
--

DROP TABLE IF EXISTS `active_testimonials`;
/*!50001 DROP VIEW IF EXISTS `active_testimonials`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `active_testimonials` AS SELECT
 1 AS `id`,
  1 AS `name`,
  1 AS `location`,
  1 AS `role`,
  1 AS `short_quote_fr`,
  1 AS `short_quote_en`,
  1 AS `short_quote_es`,
  1 AS `short_quote_sw`,
  1 AS `full_quote_fr`,
  1 AS `full_quote_en`,
  1 AS `full_quote_es`,
  1 AS `full_quote_sw`,
  1 AS `image_path`,
  1 AS `video_url`,
  1 AS `rating`,
  1 AS `is_featured`,
  1 AS `sort_order`,
  1 AS `is_active`,
  1 AS `created_at` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('super_admin','editor','moderator') DEFAULT 'editor',
  `last_login` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','admin@betterlife-ong.org','$2b$10$rOzQXqQXqQXqQXqQXqQXqeF8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8','super_admin',NULL,1,'2026-02-02 12:37:04');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title_fr` varchar(255) NOT NULL,
  `title_en` varchar(255) DEFAULT NULL,
  `title_es` varchar(255) DEFAULT NULL,
  `title_sw` varchar(255) DEFAULT NULL,
  `excerpt_fr` text DEFAULT NULL,
  `excerpt_en` text DEFAULT NULL,
  `excerpt_es` text DEFAULT NULL,
  `excerpt_sw` text DEFAULT NULL,
  `content_fr` longtext NOT NULL,
  `content_en` longtext DEFAULT NULL,
  `content_es` longtext DEFAULT NULL,
  `content_sw` longtext DEFAULT NULL,
  `author` varchar(100) DEFAULT 'Équipe BetterLife',
  `category` varchar(50) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `read_time` int(11) DEFAULT 5,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 1,
  `published_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stat1_value` varchar(20) DEFAULT NULL,
  `stat1_label` varchar(100) DEFAULT NULL,
  `stat2_value` varchar(20) DEFAULT NULL,
  `stat2_label` varchar(100) DEFAULT NULL,
  `stat3_value` varchar(20) DEFAULT NULL,
  `stat3_label` varchar(100) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_blog_posts_category` (`category`),
  KEY `idx_blog_posts_published` (`is_published`,`published_at`),
  KEY `idx_blog_posts_featured` (`is_featured`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (1,'cacao-criollo','CACAO CRIOLLO - L\'Or Noir du Congo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'<p>Notre programme Cacao Criollo représente une avancée majeure dans l\'agriculture premium congolaise. Les fèves de cacao Criollo produites dans nos plantations sont désormais reconnues internationalement pour leur qualité exceptionnelle et leurs arômes uniques.</p>\n\n<p>Le Cacao Criollo, variété ancienne et rare, était sur le point de disparaître du Congo. Grâce à notre programme de sauvegarde et de multiplication, nous avons réussi à replanter plus de 500 000 pieds de cacao Criollo dans les régions de Kikwit et Bandundu.</p>\n\n<h4>Techniques Innovantes</h4>\n<p>Nos agriculteurs utilisent des techniques agroforestières avancées qui préservent la biodiversité tout en augmentant les rendements. L\'association du cacao avec des arbres fruitiers et des essences forestières crée un écosystème résilient et productif.</p>\n\n<blockquote>\"Le passage au cacao Criollo a triplé nos revenus tout en nous permettant de préserver notre forêt. C\'est le futur de l\'agriculture premium congolaise.\" — Jean-Pierre Mbuyi, Agriculteur partenaire</blockquote>\n\n<h4>Impact Économique</h4>\n<p>Le programme a déjà transformé la vie de plus de 1 200 familles d\'agriculteurs. Les revenus moyens ont augmenté de 250%, permettant aux enfants de poursuivre leurs études et aux familles d\'accéder aux soins de santé.</p>\n\n<h4>Certification et Marchés</h4>\n<p>Notre cacao Criollo est désormais certifié Bio et Fair Trade. Nous exportons vers des chocolatiers premium en Europe et en Amérique du Nord, garantissant des prix justes et stables pour nos agriculteurs.</p>',NULL,NULL,NULL,'Dr. Jean-Baptiste Mukendi','agriculture',NULL,'/pages/Actions/agriculture/images/hero_cacao.webp',6,0,1,'2024-01-15 09:00:00','2026-02-02 12:37:04','1,200+','Familles d\'agriculteurs','250%','Augmentation des revenus','500K','Pieds de cacao plantés',NULL,NULL,NULL);
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_related_posts`
--

DROP TABLE IF EXISTS `blog_related_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_related_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `related_post_id` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_related` (`post_id`,`related_post_id`),
  KEY `related_post_id` (`related_post_id`),
  CONSTRAINT `blog_related_posts_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blog_related_posts_ibfk_2` FOREIGN KEY (`related_post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_related_posts`
--

LOCK TABLES `blog_related_posts` WRITE;
/*!40000 ALTER TABLE `blog_related_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_related_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `content_pages`
--

DROP TABLE IF EXISTS `content_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_key` varchar(50) NOT NULL,
  `section_key` varchar(50) NOT NULL,
  `content_type` enum('text','html','json') DEFAULT 'text',
  `content_fr` longtext DEFAULT NULL,
  `content_en` longtext DEFAULT NULL,
  `content_es` longtext DEFAULT NULL,
  `content_sw` longtext DEFAULT NULL,
  `is_dynamic` tinyint(1) DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_key` (`page_key`),
  UNIQUE KEY `unique_page_section` (`page_key`,`section_key`),
  KEY `idx_content_pages_page` (`page_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content_pages`
--

LOCK TABLES `content_pages` WRITE;
/*!40000 ALTER TABLE `content_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `content_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delegates`
--

DROP TABLE IF EXISTS `delegates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delegates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT 'Délégué Provincial',
  `bio_fr` text DEFAULT NULL,
  `bio_en` text DEFAULT NULL,
  `bio_es` text DEFAULT NULL,
  `bio_sw` text DEFAULT NULL,
  `expertise` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`expertise`)),
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delegates`
--

LOCK TABLES `delegates` WRITE;
/*!40000 ALTER TABLE `delegates` DISABLE KEYS */;
INSERT INTO `delegates` VALUES (1,'Justin Ngandu','Grand Katanga','Délégué Provincial','Supervise les actions de Better Life dans la région du Grand Katanga, avec un focus sur le développement durable et l\'agriculture.',NULL,NULL,NULL,'[\"Développement\", \"Coordination\", \"Agriculture\"]','admin-lushi@betterlife-ong.org',NULL,NULL,1,'2026-02-02 12:37:04'),(2,'À préciser','Kongo Central','Délégué Provincial','Coordination des programmes environnementaux et agricoles dans la province du Kongo Central.',NULL,NULL,NULL,'[\"Environnement\", \"Gestion\", \"Développement\"]','boma@betterlife-ong.org',NULL,NULL,1,'2026-02-02 12:37:04'),(3,'À préciser','Grand Bandundu','Délégué Provincial','Responsable de la mise en œuvre des initiatives communautaires dans la région du Grand Bandundu.',NULL,NULL,NULL,'[\"Communauté\", \"Agriculture\", \"Projets\"]','grad-bandundu@betterlife-ong.org',NULL,NULL,1,'2026-02-02 12:37:04'),(4,'À préciser','Grand Oriental','Délégué Provincial','Supervise le développement des programmes de conservation et de sécurité alimentaire dans le Grand Oriental.',NULL,NULL,NULL,'[\"Conservation\", \"Sécurité Alimentaire\", \"Terrain\"]','grand-oriental@betterlife-ong.org',NULL,NULL,1,'2026-02-02 12:37:04'),(5,'À préciser','Grand Kasaï','Délégué Provincial','Coordination des actions de reboisement et de soutien aux agriculteurs dans la zone du Grand Kasaï.',NULL,NULL,NULL,'[\"Reboisement\", \"Soutien Agricole\", \"Impact\"]','grand-kasai@betterlife-ong.org',NULL,NULL,1,'2026-02-02 12:37:04');
/*!40000 ALTER TABLE `delegates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hero_slides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_fr` varchar(255) DEFAULT NULL,
  `title_fr` varchar(255) NOT NULL,
  `description_fr` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
INSERT INTO `hero_slides` VALUES (1,1,'local:hero_biodiversity_premium','Protection de la Biodiversité','La protection de l’environnement et de la biodiversité','Luttons contre la déforestation et préservons les écosystèmes uniques de la RDC pour un avenir durable.',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(2,2,'local:hero_food_security','Sécurité Alimentaire','La sécurité alimentaire','Amélioration de la production agricole et valorisation des chaînes locales pour nourrir nos populations.',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(3,3,'local:hero_agriculture','Mécanisation Agricole','Mécanisation agricole','Modernisation des pratiques et mise à disposition d\'équipements adaptés pour une agriculture performantes et pas que ça.',1,'2026-02-02 14:25:44','2026-02-02 14:46:18'),(4,4,'local:heroImage6','Projets Communautaires','Projets communautaires','Services de base et activités génératrices de revenus pour le développement harmonieux de nos villages.',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(5,5,'local:heroImage7','Élevage Moderne','Élevage à grande échelle','Systèmes modernes (bovin, caprin, porcin, avicole) et santé animale au cœur de notre expertise.',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(6,6,'local:heroImage8','Cultures Durables','Agriculture','Promotion d\'une agriculture durable avec focus sur le cacao Criollo, le café Arabica et le théier.',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(7,7,'local:heroImage9','Protection de l\'Environnement','environement','Protéger notre cadre de vie et nos ressources naturelles',1,'2026-02-02 14:25:44','2026-02-02 14:25:44'),(8,8,'local:heroImage10','Énergie Communautaire','Énergies Renouvelables','Lumière et Force',1,'2026-02-02 14:25:44','2026-02-02 14:44:47'),(9,9,'local:heroImage11','Reforestation','Protection des Forêts','Poumon de la planète',1,'2026-02-02 14:25:44','2026-02-02 14:25:44');
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscriptions`
--

DROP TABLE IF EXISTS `newsletter_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `language` varchar(5) DEFAULT 'fr',
  `is_active` tinyint(1) DEFAULT 1,
  `subscribed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscriptions`
--

LOCK TABLES `newsletter_subscriptions` WRITE;
/*!40000 ALTER TABLE `newsletter_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsletter_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_progression`
--

DROP TABLE IF EXISTS `partner_progression`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_progression` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `region` varchar(50) NOT NULL,
  `count` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_progression` (`year`,`month`,`region`),
  KEY `idx_partner_progression_year_month` (`year`,`month`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_progression`
--

LOCK TABLES `partner_progression` WRITE;
/*!40000 ALTER TABLE `partner_progression` DISABLE KEYS */;
INSERT INTO `partner_progression` VALUES (1,2021,11,'haut-katanga',1,3,'2026-02-02 12:37:04'),(2,2021,11,'kongo-central',1,3,'2026-02-02 12:37:04'),(3,2021,11,'kinshasa',1,3,'2026-02-02 12:37:04'),(4,2021,12,'haut-katanga',2,6,'2026-02-02 12:37:04'),(5,2021,12,'kongo-central',1,6,'2026-02-02 12:37:04'),(6,2021,12,'kinshasa',2,6,'2026-02-02 12:37:04'),(7,2021,12,'autres',1,6,'2026-02-02 12:37:04'),(8,2022,12,'haut-katanga',7,18,'2026-02-02 12:37:04'),(9,2022,12,'kongo-central',4,18,'2026-02-02 12:37:04'),(10,2022,12,'kinshasa',6,18,'2026-02-02 12:37:04'),(11,2022,12,'autres',1,18,'2026-02-02 12:37:04'),(12,2023,12,'haut-katanga',14,35,'2026-02-02 12:37:04'),(13,2023,12,'kongo-central',9,35,'2026-02-02 12:37:04'),(14,2023,12,'kinshasa',11,35,'2026-02-02 12:37:04'),(15,2023,12,'autres',1,35,'2026-02-02 12:37:04'),(16,2024,12,'haut-katanga',21,52,'2026-02-02 12:37:04'),(17,2024,12,'kongo-central',15,52,'2026-02-02 12:37:04'),(18,2024,12,'kinshasa',14,52,'2026-02-02 12:37:04'),(19,2024,12,'autres',2,52,'2026-02-02 12:37:04'),(20,2025,12,'haut-katanga',21,69,'2026-02-02 12:37:04'),(21,2025,12,'kongo-central',20,69,'2026-02-02 12:37:04'),(22,2025,12,'kinshasa',23,69,'2026-02-02 12:37:04'),(23,2025,12,'autres',5,69,'2026-02-02 12:37:04'),(24,2026,6,'haut-katanga',21,75,'2026-02-02 12:37:04'),(25,2026,6,'kongo-central',20,75,'2026-02-02 12:37:04'),(26,2026,6,'kinshasa',26,75,'2026-02-02 12:37:04'),(27,2026,6,'autres',8,75,'2026-02-02 12:37:04');
/*!40000 ALTER TABLE `partner_progression` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `region` enum('haut-katanga','kongo-central','kinshasa','autres') NOT NULL,
  `type` enum('Institution','Entreprise','Religieux','Organisation','Particulier') DEFAULT 'Particulier',
  `title` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `join_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_partners_region` (`region`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
INSERT INTO `partners` VALUES (1,'MWAMBA SALIMA Marie-Claire','0853251084','haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-11-01','2026-02-02 12:37:04'),(2,'MULUKA Gérard','0997027431','haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-11-01','2026-02-02 12:37:04'),(3,'TSHILANDA Solange','0999686334','haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-11-01','2026-02-02 12:37:04'),(4,'LUBAMBA WA LUBAMBA Alex','0820356400','haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-11-01','2026-02-02 12:37:04'),(5,'ILUNGA NGOYI Teddy',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(6,'MUSAFIRI BUYA Beatrice',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(7,'MPINDA CIKALA',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(8,'MUYUMBA KIYANA Emmanuel',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(9,'MWADI KANYIKI Didine',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(10,'KABANGA LUBUYA Ina',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(11,'ODIA CIANI Auguy',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(12,'SELEMANI Gérard',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(13,'ILUNGU MWAMBA Alba',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(14,'KAKUDJIWA NKULU Jeanine',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(15,'TSHISWAKA NKUBA Alain',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(16,'KABAMBA Jephté',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(17,'KABONGU LWABA Bill',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(18,'MBUINGA DI NKUANGA Juslain',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(19,'KATOMBE MOLOWA Gustave',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(20,'MUKOLAYI JHON LAGODAS',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(21,'AMISI Oscar',NULL,'haut-katanga','Particulier',NULL,NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(22,'KILOLA LUMBU',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(23,'LUPANGWA Jacques',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(24,'PAROISSE SAINT MICHEL KITIMA',NULL,'kongo-central','Institution',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(25,'MAKOKO Ferdinand Abbé',NULL,'kongo-central','Religieux',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(26,'DIOCESE DE BOMA',NULL,'kongo-central','Institution',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(27,'CALL IS BUSINESS SARL',NULL,'kongo-central','Entreprise',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(28,'NZOLANI KUYADILUA Laurianne',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(29,'MUKOTSHI MONDO Blaise',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(30,'NDEMBE Jean-Claude',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(31,'KABANGU Pierre',NULL,'kongo-central','Particulier','Ministre',NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(32,'KUMBU MATONDO Joseph',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(33,'META MONIKA Adolphonie',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(34,'KAMBU MWAKA Edouard',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(35,'KAMBU KAMBU Joachim',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(36,'SARMA',NULL,'kongo-central','Organisation',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(37,'Abbé Aime NSUAMI',NULL,'kongo-central','Religieux',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(38,'MUKOLAYI John',NULL,'kongo-central','Particulier',NULL,'Sté LAGODAS',NULL,1,'2022-01-01','2026-02-02 12:37:04'),(39,'MABIALA NGIMBI Gina',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(40,'KHONDE NDUNDA Crispin',NULL,'kongo-central','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(41,'MONDONGA TIGOMBAY Fidel',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(42,'LUIBA LU NGIMBI Eugène',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(43,'FOMAPE','MUTOMBO Symphorien','kinshasa','Organisation',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(44,'KATOMBE MALOWA Gustave',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(45,'MABANGA PHUATI Joseph',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(46,'RA.JE.CO.PA',NULL,'kinshasa','Organisation',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(47,'MABOTI BOBO Jodi',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(48,'OTETE LOKADI DOUDOU Serge',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(49,'YENGA YENGA Raméal',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(50,'Paul et William',NULL,'kinshasa','Particulier',NULL,NULL,'Vulgarisation',1,'2022-01-01','2026-02-02 12:37:04'),(51,'LUKUSA Neville',NULL,'kinshasa','Particulier',NULL,NULL,'Vulgarisation',1,'2022-01-01','2026-02-02 12:37:04'),(52,'NZAU MAKAYA',NULL,'kinshasa','Particulier',NULL,NULL,'Vulgarisation',1,'2022-01-01','2026-02-02 12:37:04'),(53,'KOLELA Jean-Bertin',NULL,'kinshasa','Particulier',NULL,NULL,'Vulgarisation',1,'2022-01-01','2026-02-02 12:37:04'),(54,'DENDE SAMORA Vincent',NULL,'kinshasa','Particulier',NULL,NULL,'Vulgarisation',1,'2022-01-01','2026-02-02 12:37:04'),(55,'NTAMBWE MPOSHI Eliezer',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(56,'MBIYE Elie',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(57,'MUTOMBO Ruth',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(58,'MBUYI MPOYI STANIS Alain',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(59,'MUKOTSHI Blaise',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(60,'ACDECO',NULL,'kinshasa','Organisation',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(61,'MUKANYA SHABANTYA Raymond',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(62,'KALONDA KAPENGA Mamie',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(63,'NDEVU Emmanuel',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(64,'MOYOGO MOMBILI Michel',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(65,'MBUYA MBAYO Jean-Marie',NULL,'kinshasa','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(66,'SOCIETE KBD','Mr Sylvain','kinshasa','Entreprise',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(67,'MABAYA GIZI Jean-Philibert',NULL,'autres','Particulier','Sénateur',NULL,NULL,1,'2021-12-01','2026-02-02 12:37:04'),(68,'BOSUMBE MENDELA Fatou',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(69,'SINYEMBO NGUNGWA Christian',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(70,'MULUMBA Dorcas',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(71,'MBELU Claudine Esther',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(72,'KISHI KAJI Christelle',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(73,'MONSEIGNEUR SANGWA Jules',NULL,'autres','Religieux',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04'),(74,'MUSENGA TSHIEY Virginie',NULL,'autres','Particulier',NULL,NULL,NULL,1,'2022-01-01','2026-02-02 12:37:04');
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `published_blog_posts`
--

DROP TABLE IF EXISTS `published_blog_posts`;
/*!50001 DROP VIEW IF EXISTS `published_blog_posts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `published_blog_posts` AS SELECT
 1 AS `id`,
  1 AS `slug`,
  1 AS `title_fr`,
  1 AS `title_en`,
  1 AS `title_es`,
  1 AS `title_sw`,
  1 AS `excerpt_fr`,
  1 AS `excerpt_en`,
  1 AS `excerpt_es`,
  1 AS `excerpt_sw`,
  1 AS `content_fr`,
  1 AS `content_en`,
  1 AS `content_es`,
  1 AS `content_sw`,
  1 AS `author`,
  1 AS `category`,
  1 AS `tags`,
  1 AS `featured_image`,
  1 AS `read_time`,
  1 AS `is_featured`,
  1 AS `is_published`,
  1 AS `published_at`,
  1 AS `updated_at`,
  1 AS `stat1_value`,
  1 AS `stat1_label`,
  1 AS `stat2_value`,
  1 AS `stat2_label`,
  1 AS `stat3_value`,
  1 AS `stat3_label`,
  1 AS `meta_title`,
  1 AS `meta_description`,
  1 AS `keywords` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stat_key` varchar(50) NOT NULL,
  `value` varchar(20) NOT NULL,
  `label` varchar(100) NOT NULL,
  `suffix` varchar(10) DEFAULT '',
  `color` varchar(20) DEFAULT 'green',
  `icon` varchar(50) DEFAULT 'FaUsers',
  `is_active` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `stat_key` (`stat_key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics` VALUES (1,'beneficiaries','9587','Bénéficiaires','','blue','FaUsers',1,'2026-02-03 10:28:52'),(2,'trees','3000000','Arbres plantés','+','green','FaTree',1,'2026-02-03 10:31:43'),(3,'actions','186','Actions réalisées','','blue','FaGlobeAmericas',1,'2026-02-02 12:37:04'),(4,'provinces','17','Provinces couvertes','','green','FaHandsHelping',1,'2026-02-02 12:37:04'),(5,'test_key3','425','Test Stat 3','','blue','FaChartBar',1,'2026-02-03 11:24:48');
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_members`
--

DROP TABLE IF EXISTS `team_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role_fr` varchar(100) NOT NULL,
  `role_en` varchar(100) DEFAULT NULL,
  `role_es` varchar(100) DEFAULT NULL,
  `role_sw` varchar(100) DEFAULT NULL,
  `bio_fr` text DEFAULT NULL,
  `bio_en` text DEFAULT NULL,
  `bio_es` text DEFAULT NULL,
  `bio_sw` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `expertise` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`expertise`)),
  `photo_path` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_team_members_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_members`
--

LOCK TABLES `team_members` WRITE;
/*!40000 ALTER TABLE `team_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `short_quote_fr` text NOT NULL,
  `short_quote_en` text DEFAULT NULL,
  `short_quote_es` text DEFAULT NULL,
  `short_quote_sw` text DEFAULT NULL,
  `full_quote_fr` text DEFAULT NULL,
  `full_quote_en` text DEFAULT NULL,
  `full_quote_es` text DEFAULT NULL,
  `full_quote_sw` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT 5,
  `is_featured` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_testimonials_featured` (`is_featured`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Mr Gerard','Kinshasa',NULL,'BetterLife a transformé notre communauté grâce à ses programmes innovants...',NULL,NULL,NULL,'BetterLife a transformé notre communauté grâce à ses programmes innovants d\'agriculture durable et de développement communautaire. Leur approche holistique a non seulement amélioré nos conditions de vie mais aussi préservé notre environnement.',NULL,NULL,NULL,'/images/temoignages/Mr Gerard.webp','https://youtu.be/JCMOtc03cdo',5,0,1,1,'2026-02-02 12:37:04'),(2,'Mr Chrétien','Haut-Katanga',NULL,'L\'impact positif sur notre région est remarquable...',NULL,NULL,NULL,'L\'impact positif de BetterLife sur notre région est remarquable. Leurs programmes de reboisement et d\'agriculture durable ont créé des emplois durables et restauré notre biodiversité locale.',NULL,NULL,NULL,'/images/temoignages/Mr chretien.webp','https://youtu.be/nEwJognetC0',5,0,2,1,'2026-02-02 12:37:04'),(3,'Mr L\'Abbéee','Kongo Central','','BetterLife apporte espoir et développement durable...',NULL,NULL,NULL,'BetterLife apporte espoir et développement durable dans nos communautés. Leur travail avec les agriculteurs locaux et leur engagement pour l\'environnement sont sources d\'inspiration.',NULL,NULL,NULL,'/images/temoignages/Mr L\'Abbée.png','https://www.youtube.com/watch?v=fbZJ_Gtrk4k',5,0,3,1,'2026-02-02 12:37:04'),(4,'Maître Falonne','Kinshasa',NULL,'Une ONG qui fait réellement la différence...',NULL,NULL,NULL,'BetterLife est une ONG qui fait réellement la différence sur le terrain. Leur approche professionnelle et leur impact mesurable sont impressionnants.',NULL,NULL,NULL,'/images/temoignages/Maitre Falonne.png','https://www.youtube.com/watch?v=VIKoUEBqgI0',5,0,4,1,'2026-02-02 12:37:04');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `active_statistics`
--

/*!50001 DROP VIEW IF EXISTS `active_statistics`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `active_statistics` AS select `statistics`.`id` AS `id`,`statistics`.`stat_key` AS `stat_key`,`statistics`.`value` AS `value`,`statistics`.`label` AS `label`,`statistics`.`suffix` AS `suffix`,`statistics`.`color` AS `color`,`statistics`.`icon` AS `icon`,`statistics`.`is_active` AS `is_active`,`statistics`.`updated_at` AS `updated_at` from `statistics` where `statistics`.`is_active` = 1 order by `statistics`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `active_testimonials`
--

/*!50001 DROP VIEW IF EXISTS `active_testimonials`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `active_testimonials` AS select `testimonials`.`id` AS `id`,`testimonials`.`name` AS `name`,`testimonials`.`location` AS `location`,`testimonials`.`role` AS `role`,`testimonials`.`short_quote_fr` AS `short_quote_fr`,`testimonials`.`short_quote_en` AS `short_quote_en`,`testimonials`.`short_quote_es` AS `short_quote_es`,`testimonials`.`short_quote_sw` AS `short_quote_sw`,`testimonials`.`full_quote_fr` AS `full_quote_fr`,`testimonials`.`full_quote_en` AS `full_quote_en`,`testimonials`.`full_quote_es` AS `full_quote_es`,`testimonials`.`full_quote_sw` AS `full_quote_sw`,`testimonials`.`image_path` AS `image_path`,`testimonials`.`video_url` AS `video_url`,`testimonials`.`rating` AS `rating`,`testimonials`.`is_featured` AS `is_featured`,`testimonials`.`sort_order` AS `sort_order`,`testimonials`.`is_active` AS `is_active`,`testimonials`.`created_at` AS `created_at` from `testimonials` where `testimonials`.`is_active` = 1 order by `testimonials`.`sort_order`,`testimonials`.`created_at` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `published_blog_posts`
--

/*!50001 DROP VIEW IF EXISTS `published_blog_posts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `published_blog_posts` AS select `blog_posts`.`id` AS `id`,`blog_posts`.`slug` AS `slug`,`blog_posts`.`title_fr` AS `title_fr`,`blog_posts`.`title_en` AS `title_en`,`blog_posts`.`title_es` AS `title_es`,`blog_posts`.`title_sw` AS `title_sw`,`blog_posts`.`excerpt_fr` AS `excerpt_fr`,`blog_posts`.`excerpt_en` AS `excerpt_en`,`blog_posts`.`excerpt_es` AS `excerpt_es`,`blog_posts`.`excerpt_sw` AS `excerpt_sw`,`blog_posts`.`content_fr` AS `content_fr`,`blog_posts`.`content_en` AS `content_en`,`blog_posts`.`content_es` AS `content_es`,`blog_posts`.`content_sw` AS `content_sw`,`blog_posts`.`author` AS `author`,`blog_posts`.`category` AS `category`,`blog_posts`.`tags` AS `tags`,`blog_posts`.`featured_image` AS `featured_image`,`blog_posts`.`read_time` AS `read_time`,`blog_posts`.`is_featured` AS `is_featured`,`blog_posts`.`is_published` AS `is_published`,`blog_posts`.`published_at` AS `published_at`,`blog_posts`.`updated_at` AS `updated_at`,`blog_posts`.`stat1_value` AS `stat1_value`,`blog_posts`.`stat1_label` AS `stat1_label`,`blog_posts`.`stat2_value` AS `stat2_value`,`blog_posts`.`stat2_label` AS `stat2_label`,`blog_posts`.`stat3_value` AS `stat3_value`,`blog_posts`.`stat3_label` AS `stat3_label`,`blog_posts`.`meta_title` AS `meta_title`,`blog_posts`.`meta_description` AS `meta_description`,`blog_posts`.`keywords` AS `keywords` from `blog_posts` where `blog_posts`.`is_published` = 1 order by `blog_posts`.`published_at` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-05 16:04:59
