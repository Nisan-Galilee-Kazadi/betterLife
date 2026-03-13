-- =========================================
-- BetterLife Database Schema
-- Base de données pour le site web BetterLife ONG
-- =========================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS betterlife_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE betterlife_db;

-- =========================================
-- Table: statistics (Statistiques de la page d'accueil)
-- =========================================
CREATE TABLE statistics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stat_key VARCHAR(50) UNIQUE NOT NULL,
    value VARCHAR(20) NOT NULL,
    label VARCHAR(100) NOT NULL,
    suffix VARCHAR(10) DEFAULT '',
    color VARCHAR(20) DEFAULT 'green',
    icon VARCHAR(50) DEFAULT 'FaUsers',
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion des données statistiques
INSERT INTO statistics (stat_key, value, label, suffix, color, icon) VALUES
('beneficiaries', '9587', 'Bénéficiaires', '', 'blue', 'FaUsers'),
('trees', '3000000', 'Arbres plantés', '+', 'green', 'FaTree'),
('actions', '186', 'Actions réalisées', '', 'blue', 'FaGlobeAmericas'),
('provinces', '17', 'Provinces couvertes', '', 'green', 'FaHandsHelping');

-- =========================================
-- Table: hero_slides (Slides du carousel d'accueil)
-- =========================================
CREATE TABLE hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slide_key VARCHAR(50) UNIQUE NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    title_es VARCHAR(255),
    title_sw VARCHAR(255),
    description_fr TEXT NOT NULL,
    description_en TEXT,
    description_es TEXT,
    description_sw TEXT,
    cta_link VARCHAR(100),
    cta_text_fr VARCHAR(100),
    cta_text_en VARCHAR(100),
    cta_text_es VARCHAR(100),
    cta_text_sw VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: partners (Partenaires avec progression)
-- =========================================
CREATE TABLE partners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    contact VARCHAR(50),
    region ENUM('haut-katanga', 'kongo-central', 'kinshasa', 'autres') NOT NULL,
    type ENUM('Institution', 'Entreprise', 'Religieux', 'Organisation', 'Particulier') DEFAULT 'Particulier',
    title VARCHAR(100),
    company VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: partner_progression (Progression temporelle des partenaires)
-- =========================================
CREATE TABLE partner_progression (
    id INT PRIMARY KEY AUTO_INCREMENT,
    year INT NOT NULL,
    month INT NOT NULL,
    region VARCHAR(50) NOT NULL,
    count INT NOT NULL,
    total INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_progression (year, month, region)
);

-- =========================================
-- Table: blog_posts (Articles du blog)
-- =========================================
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(100) UNIQUE NOT NULL,

    -- Contenu multilingue
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    title_es VARCHAR(255),
    title_sw VARCHAR(255),
    excerpt_fr TEXT,
    excerpt_en TEXT,
    excerpt_es TEXT,
    excerpt_sw TEXT,
    content_fr LONGTEXT NOT NULL,
    content_en LONGTEXT,
    content_es LONGTEXT,
    content_sw LONGTEXT,

    -- Métadonnées communes (non traduites)
    author VARCHAR(100) DEFAULT 'Équipe BetterLife',
    category VARCHAR(50) NOT NULL,
    tags VARCHAR(255),
    featured_image VARCHAR(255),
    read_time INT DEFAULT 5,

    -- Statut de traduction
    translation_status ENUM('draft', 'translated_fr', 'translated_all', 'needs_review') DEFAULT 'draft',
    last_translated TIMESTAMP NULL,
    translation_priority ENUM('low', 'medium', 'high') DEFAULT 'medium',

    -- Statistiques spécifiques à l'article (communs à toutes les langues)
    stat1_value VARCHAR(20),
    stat1_label VARCHAR(100),
    stat2_value VARCHAR(20),
    stat2_label VARCHAR(100),
    stat3_value VARCHAR(20),
    stat3_label VARCHAR(100),

    -- Métadonnées SEO multilingues
    meta_title_fr VARCHAR(255),
    meta_title_en VARCHAR(255),
    meta_title_es VARCHAR(255),
    meta_title_sw VARCHAR(255),
    meta_description_fr TEXT,
    meta_description_en TEXT,
    meta_description_es TEXT,
    meta_description_sw TEXT,
    keywords_fr VARCHAR(255),
    keywords_en VARCHAR(255),
    keywords_es VARCHAR(255),
    keywords_sw VARCHAR(255),

    -- Publication
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- Table: blog_related_posts (Articles connexes)
-- =========================================
CREATE TABLE blog_related_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    related_post_id INT NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (related_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    UNIQUE KEY unique_related (post_id, related_post_id)
);

-- =========================================
-- Table: testimonials (Témoignages)
-- =========================================
CREATE TABLE testimonials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    role VARCHAR(100),
    short_quote_fr TEXT NOT NULL,
    short_quote_en TEXT,
    short_quote_es TEXT,
    short_quote_sw TEXT,
    full_quote_fr TEXT,
    full_quote_en TEXT,
    full_quote_es TEXT,
    full_quote_sw TEXT,
    image_path VARCHAR(255),
    video_url VARCHAR(255),
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: team_members (Membres de l'équipe)
-- =========================================
CREATE TABLE team_members (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role_fr VARCHAR(100) NOT NULL,
    role_en VARCHAR(100),
    role_es VARCHAR(100),
    role_sw VARCHAR(100),
    bio_fr TEXT,
    bio_en TEXT,
    bio_es TEXT,
    bio_sw TEXT,
    email VARCHAR(100),
    phone VARCHAR(50),
    expertise JSON, -- Tableau des compétences
    photo_path VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: delegates (Délégués provinciaux)
-- =========================================
CREATE TABLE delegates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    role VARCHAR(100) DEFAULT 'Délégué Provincial',
    bio_fr TEXT,
    bio_en TEXT,
    bio_es TEXT,
    bio_sw TEXT,
    expertise JSON,
    email VARCHAR(100),
    phone VARCHAR(50),
    photo_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: content_pages (Contenu statique avec sections dynamiques)
-- =========================================
CREATE TABLE content_pages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    page_key VARCHAR(50) UNIQUE NOT NULL,
    section_key VARCHAR(50) NOT NULL,
    content_type ENUM('text', 'html', 'json') DEFAULT 'text',
    content_fr LONGTEXT,
    content_en LONGTEXT,
    content_es LONGTEXT,
    content_sw LONGTEXT,
    is_dynamic BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_page_section (page_key, section_key)
);

-- =========================================
-- Table: contact_messages (Messages de contact)
-- =========================================
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- Table: newsletter_subscriptions (Inscriptions newsletter)
-- =========================================
CREATE TABLE newsletter_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    language VARCHAR(5) DEFAULT 'fr',
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
);

-- =========================================
-- Table: translation_cache (Cache des traductions automatiques)
-- =========================================
CREATE TABLE translation_cache (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_hash VARCHAR(64) UNIQUE NOT NULL, -- Hash du contenu source
    source_lang VARCHAR(5) NOT NULL,
    target_lang VARCHAR(5) NOT NULL,
    source_text LONGTEXT NOT NULL,
    translated_text LONGTEXT NOT NULL,
    translation_service VARCHAR(50) DEFAULT 'google', -- google, deepl, etc.
    quality_score DECIMAL(3,2) DEFAULT 0.8, -- Score de qualité 0-1
    is_valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_cache_lookup (content_hash, source_lang, target_lang),
    INDEX idx_cleanup (last_used)
);

-- =========================================
-- Table: translation_jobs (Jobs de traduction automatique en attente)
-- =========================================
CREATE TABLE translation_jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content_type ENUM('blog_post', 'testimonial', 'partner', 'statistic', 'delegate') NOT NULL,
    content_id INT NOT NULL,
    field_name VARCHAR(100) NOT NULL, -- 'title', 'content', 'excerpt', etc.
    source_lang VARCHAR(5) DEFAULT 'fr',
    target_lang VARCHAR(5) NOT NULL,
    source_content LONGTEXT NOT NULL,
    translated_content LONGTEXT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    error_message TEXT NULL,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,

    INDEX idx_status_priority (status, priority, created_at),
    INDEX idx_content (content_type, content_id)
);

-- =========================================
-- Table: admin_users (Utilisateurs admin)
-- =========================================
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'editor', 'translator', 'moderator') DEFAULT 'editor',
    languages JSON, -- langues que l'utilisateur maîtrise ['fr', 'en', 'es', 'sw']
    is_translator BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- INSERTION DES DONNÉES D'EXEMPLE
-- =========================================

-- Insertion des témoignages
INSERT INTO testimonials (name, location, short_quote_fr, full_quote_fr, image_path, video_url, rating) VALUES
('Mr Gerard', 'Kinshasa', 'BetterLife a transformé notre communauté...', 'BetterLife a transformé notre communauté grâce à ses programmes innovants...', '/images/temoignages/Mr Gerard.webp', 'https://youtu.be/JCMOtc03cdo', 5),
('Mr Chrétien', 'Haut-Katanga', 'L''impact positif sur notre région...', 'L''impact positif sur notre région est remarquable...', '/images/temoignages/Mr chretien.webp', 'https://youtu.be/nEwJognetC0', 5);

-- Insertion d'un article de blog exemple (Cacao)
INSERT INTO blog_posts (slug, title_fr, content_fr, author, category, read_time, stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label) VALUES
('cacao-criollo', 'CACAO CRIOLLO - L''Or Noir du Congo',
'Notre programme Cacao Criollo représente une avancée majeure dans l''agriculture premium congolaise...',
'Dr. Jean-Baptiste Mukendi', 'agriculture', 6, '1,200+', 'Familles d''agriculteurs', '250%', 'Augmentation des revenus', '500K', 'Pieds de cacao plantés');

-- Insertion des délégués provinciaux
INSERT INTO delegates (name, province, bio_fr, expertise, email) VALUES
('Justin Ngandu', 'Grand Katanga', 'Supervise les actions de Better Life dans la région du Grand Katanga...', '["Développement", "Coordination", "Agriculture"]', 'admin-lushi@betterlife-ong.org'),
('À préciser', 'Kongo Central', 'Coordination des programmes environnementaux et agricoles...', '["Environnement", "Gestion", "Développement"]', 'boma@betterlife-ong.org');

-- =========================================
-- INDEXES POUR OPTIMISER LES PERFORMANCES
-- =========================================

CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX idx_partners_region ON partners(region);
CREATE INDEX idx_partner_progression_year_month ON partner_progression(year, month);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_content_pages_page ON content_pages(page_key);

-- =========================================
-- VUES POUR FACILITER LES REQUÊTES
-- =========================================

-- Vue pour les statistiques actives
CREATE VIEW active_statistics AS
SELECT * FROM statistics WHERE is_active = TRUE ORDER BY id;

-- Vue pour les articles publiés
CREATE VIEW published_blog_posts AS
SELECT * FROM blog_posts WHERE is_published = TRUE ORDER BY published_at DESC;

-- Vue pour les témoignages actifs
CREATE VIEW active_testimonials AS
SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY sort_order, created_at DESC;

-- Vue pour les notifications de traduction non lues
CREATE VIEW pending_translations AS
SELECT
    tn.*,
    au.username as assigned_translator,
    CASE
        WHEN tn.content_type = 'blog_post' THEN (SELECT title_fr FROM blog_posts WHERE id = tn.content_id)
        WHEN tn.content_type = 'testimonial' THEN (SELECT name FROM testimonials WHERE id = tn.content_id)
        WHEN tn.content_type = 'statistic' THEN (SELECT label FROM statistics WHERE id = tn.content_id)
        ELSE 'Contenu inconnu'
    END as content_title
FROM translation_notifications tn
LEFT JOIN admin_users au ON tn.assigned_to = au.id
WHERE tn.is_read = FALSE
ORDER BY tn.priority DESC, tn.created_at DESC;

-- Vue pour l'état des traductions par contenu
CREATE VIEW translation_status AS
SELECT
    'blog_post' as content_type,
    id as content_id,
    title_fr,
    translation_status,
    last_translated,
    CASE
        WHEN title_en IS NOT NULL AND content_en IS NOT NULL THEN 1 ELSE 0
    END as en_complete,
    CASE
        WHEN title_es IS NOT NULL AND content_es IS NOT NULL THEN 1 ELSE 0
    END as es_complete,
    CASE
        WHEN title_sw IS NOT NULL AND content_sw IS NOT NULL THEN 1 ELSE 0
    END as sw_complete
FROM blog_posts
WHERE is_published = TRUE;

-- =========================================
-- TRIGGERS POUR MAINTENIR LA COHÉRENCE
-- =========================================

-- Triggers pour maintenir la cohérence et gérer les traductions
DELIMITER ;;

-- Trigger pour les articles de blog avec traduction automatique
CREATE TRIGGER auto_translate_blog_posts
AFTER UPDATE ON blog_posts
FOR EACH ROW
BEGIN
    -- Si le titre français a changé, créer des jobs de traduction
    IF OLD.title_fr != NEW.title_fr AND NEW.title_fr IS NOT NULL THEN
        INSERT INTO translation_jobs (content_type, content_id, field_name, source_lang, target_lang, source_content, priority)
        VALUES
        ('blog_post', NEW.id, 'title', 'fr', 'en', NEW.title_fr, 'high'),
        ('blog_post', NEW.id, 'title', 'fr', 'es', NEW.title_fr, 'high'),
        ('blog_post', NEW.id, 'title', 'fr', 'sw', NEW.title_fr, 'medium')
        ON DUPLICATE KEY UPDATE
        source_content = VALUES(source_content),
        status = 'pending',
        processed_at = NULL;
    END IF;

    -- Si le contenu français a changé, créer des jobs de traduction
    IF OLD.content_fr != NEW.content_fr AND NEW.content_fr IS NOT NULL THEN
        INSERT INTO translation_jobs (content_type, content_id, field_name, source_lang, target_lang, source_content, priority)
        VALUES
        ('blog_post', NEW.id, 'content', 'fr', 'en', NEW.content_fr, 'high'),
        ('blog_post', NEW.id, 'content', 'fr', 'es', NEW.content_fr, 'high'),
        ('blog_post', NEW.id, 'content', 'fr', 'sw', NEW.content_fr, 'medium')
        ON DUPLICATE KEY UPDATE
        source_content = VALUES(source_content),
        status = 'pending',
        processed_at = NULL;
    END IF;

    -- Si l'excerpt français a changé, créer des jobs de traduction
    IF OLD.excerpt_fr != NEW.excerpt_fr AND NEW.excerpt_fr IS NOT NULL THEN
        INSERT INTO translation_jobs (content_type, content_id, field_name, source_lang, target_lang, source_content, priority)
        VALUES
        ('blog_post', NEW.id, 'excerpt', 'fr', 'en', NEW.excerpt_fr, 'medium'),
        ('blog_post', NEW.id, 'excerpt', 'fr', 'es', NEW.excerpt_fr, 'medium'),
        ('blog_post', NEW.id, 'excerpt', 'fr', 'sw', NEW.excerpt_fr, 'low')
        ON DUPLICATE KEY UPDATE
        source_content = VALUES(source_content),
        status = 'pending',
        processed_at = NULL;
    END IF;
END;;

-- Trigger pour les statistiques
CREATE TRIGGER translation_notification_statistics
AFTER UPDATE ON statistics
FOR EACH ROW
BEGIN
    -- Si le label a changé, notifier pour traduction
    IF OLD.label != NEW.label THEN
        INSERT INTO translation_notifications (content_type, content_id, source_lang, target_lang, message, priority)
        VALUES
        ('statistic', NEW.id, 'fr', 'en', CONCAT('Statistique à traduire: "', NEW.label, '"'), 'medium'),
        ('statistic', NEW.id, 'fr', 'es', CONCAT('Estadística para traducir: "', NEW.label, '"'), 'medium'),
        ('statistic', NEW.id, 'fr', 'sw', CONCAT('Takwimu za kutafsiri: "', NEW.label, '"'), 'medium');
    END IF;
END;;

-- Trigger pour les témoignages
CREATE TRIGGER translation_notification_testimonials
AFTER UPDATE ON testimonials
FOR EACH ROW
BEGIN
    IF OLD.short_quote_fr != NEW.short_quote_fr OR OLD.full_quote_fr != NEW.full_quote_fr THEN
        INSERT INTO translation_notifications (content_type, content_id, source_lang, target_lang, message, priority)
        VALUES
        ('testimonial', NEW.id, 'fr', 'en', CONCAT('Témoignage à traduire: "', LEFT(NEW.short_quote_fr, 50), '..."'), 'high'),
        ('testimonial', NEW.id, 'fr', 'es', CONCAT('Testimonio para traducir: "', LEFT(NEW.short_quote_fr, 50), '..."'), 'high'),
        ('testimonial', NEW.id, 'fr', 'sw', CONCAT('Ushuhuda wa kutafsiri: "', LEFT(NEW.short_quote_fr, 50), '..."'), 'medium');
    END IF;
END;;

CREATE TRIGGER update_content_pages_timestamp
BEFORE UPDATE ON content_pages
FOR EACH ROW
BEGIN
    SET NEW.last_updated = CURRENT_TIMESTAMP;
END;;

DELIMITER ;

-- =========================================
-- PERMISSIONS ET SÉCURITÉ
-- =========================================

-- Création d'un utilisateur pour l'application
CREATE USER IF NOT EXISTS 'betterlife_user'@'localhost' IDENTIFIED BY 'secure_password_2024';
GRANT SELECT, INSERT, UPDATE, DELETE ON betterlife_db.* TO 'betterlife_user'@'localhost';
FLUSH PRIVILEGES;

-- =========================================
-- COMMENTAIRES ET DOCUMENTATION
-- =========================================

-- Cette base de données est conçue pour supporter un système de gestion de contenu (CMS)
-- hybride où certains contenus sont statiques (dans le code) et d'autres dynamiques (en DB).
--
-- Tables dynamiques principales :
-- - statistics : statistiques modifiables via admin
-- - partners : gestion des partenaires et progression
-- - blog_posts : articles du blog avec métadonnées
-- - testimonials : témoignages avec vidéos
-- - team_members : équipe (si migré depuis traductions)
-- - hero_slides : slides du carousel d'accueil
--
-- Tables de gestion :
-- - admin_users : utilisateurs administrateurs
-- - contact_messages : messages de contact
-- - newsletter_subscriptions : inscriptions newsletter
--
-- Pour la migration cPanel :
-- 1. Créer la base de données sur cPanel
-- 2. Importer ce fichier SQL
-- 3. Modifier les credentials de connexion dans le code backend
-- 4. Tester les connexions et permissions

-- FIN DU SCRIPT