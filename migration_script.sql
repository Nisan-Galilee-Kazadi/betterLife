-- =========================================
-- BetterLife Database Migration Script
-- Script complet pour migrer vers cPanel
-- =========================================

-- SUPPRESSION DE L'ANCIENNE BASE SI ELLE EXISTE
DROP DATABASE IF EXISTS betterlife_db;

-- =========================================
-- SCHÉMA DE LA BASE DE DONNÉES
-- =========================================

-- Création de la base de données
CREATE DATABASE betterlife_db
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
    category VARCHAR(100),
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
    author VARCHAR(100) DEFAULT 'Équipe BetterLife',
    category VARCHAR(50) NOT NULL,
    tags VARCHAR(255),
    featured_image VARCHAR(255),
    read_time INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Statistiques spécifiques à l'article
    stat1_value VARCHAR(20),
    stat1_label VARCHAR(100),
    stat2_value VARCHAR(20),
    stat2_label VARCHAR(100),
    stat3_value VARCHAR(20),
    stat3_label VARCHAR(100),

    -- Métadonnées SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    keywords VARCHAR(255)
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
-- Table: hero_slides (Carrousel de la page d'accueil)
-- =========================================
CREATE TABLE hero_slides (
    id INT PRIMARY KEY AUTO_INCREMENT,
    position INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_fr VARCHAR(255),
    title_fr VARCHAR(255) NOT NULL,
    description_fr TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
-- Table: admin_users (Utilisateurs admin)
-- =========================================
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'editor', 'moderator') DEFAULT 'editor',
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- INSERTION DES DONNÉES
-- =========================================

-- Insertion des données statistiques
INSERT INTO statistics (stat_key, value, label, suffix, color, icon) VALUES
('beneficiaries', '9587', 'Bénéficiaires', '', 'blue', 'FaUsers'),
('trees', '3000000', 'Arbres plantés', '+', 'green', 'FaTree'),
('actions', '186', 'Actions réalisées', '', 'blue', 'FaGlobeAmericas'),
('provinces', '17', 'Provinces couvertes', '', 'green', 'FaHandsHelping');

-- =========================================
-- DONNÉES DES PARTENAIRES (extrait du code Partners.jsx)
-- =========================================

-- Insertion des partenaires Haut-Katanga
INSERT INTO partners (name, contact, region, is_active, join_date) VALUES
('MWAMBA SALIMA Marie-Claire', '0853251084', 'haut-katanga', TRUE, '2021-11-01'),
('MULUKA Gérard', '0997027431', 'haut-katanga', TRUE, '2021-11-01'),
('TSHILANDA Solange', '0999686334', 'haut-katanga', TRUE, '2021-11-01'),
('LUBAMBA WA LUBAMBA Alex', '0820356400', 'haut-katanga', TRUE, '2021-11-01'),
('ILUNGA NGOYI Teddy', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MUSAFIRI BUYA Beatrice', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MPINDA CIKALA', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MUYUMBA KIYANA Emmanuel', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MWADI KANYIKI Didine', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('KABANGA LUBUYA Ina', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('ODIA CIANI Auguy', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('SELEMANI Gérard', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('ILUNGU MWAMBA Alba', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('KAKUDJIWA NKULU Jeanine', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('TSHISWAKA NKUBA Alain', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('KABAMBA Jephté', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('KABONGU LWABA Bill', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MBUINGA DI NKUANGA Juslain', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('KATOMBE MOLOWA Gustave', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('MUKOLAYI JHON LAGODAS', NULL, 'haut-katanga', TRUE, '2021-12-01'),
('AMISI Oscar', NULL, 'haut-katanga', TRUE, '2021-12-01');

-- Insertion des partenaires Kongo Central
INSERT INTO partners (name, contact, region, type, title, company, is_active, join_date) VALUES
('KILOLA LUMBU', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('LUPANGWA Jacques', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('PAROISSE SAINT MICHEL KITIMA', NULL, 'kongo-central', 'Institution', NULL, NULL, TRUE, '2022-01-01'),
('MAKOKO Ferdinand Abbé', NULL, 'kongo-central', 'Religieux', NULL, NULL, TRUE, '2022-01-01'),
('DIOCESE DE BOMA', NULL, 'kongo-central', 'Institution', NULL, NULL, TRUE, '2022-01-01'),
('CALL IS BUSINESS SARL', NULL, 'kongo-central', 'Entreprise', NULL, NULL, TRUE, '2022-01-01'),
('NZOLANI KUYADILUA Laurianne', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('MUKOTSHI MONDO Blaise', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('NDEMBE Jean-Claude', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('KABANGU Pierre', NULL, 'kongo-central', 'Particulier', 'Ministre', NULL, TRUE, '2022-01-01'),
('KUMBU MATONDO Joseph', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('META MONIKA Adolphonie', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('KAMBU MWAKA Edouard', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('KAMBU KAMBU Joachim', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('SARMA', NULL, 'kongo-central', 'Organisation', NULL, NULL, TRUE, '2022-01-01'),
('Abbé Aime NSUAMI', NULL, 'kongo-central', 'Religieux', NULL, NULL, TRUE, '2022-01-01'),
('MUKOLAYI John', NULL, 'kongo-central', 'Particulier', NULL, 'Sté LAGODAS', TRUE, '2022-01-01'),
('MABIALA NGIMBI Gina', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01'),
('KHONDE NDUNDA Crispin', NULL, 'kongo-central', 'Particulier', NULL, NULL, TRUE, '2022-01-01');

-- Insertion des partenaires Kinshasa
INSERT INTO partners (name, contact, region, type, category, is_active, join_date) VALUES
('MONDONGA TIGOMBAY Fidel', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('LUIBA LU NGIMBI Eugène', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('FOMAPE', 'MUTOMBO Symphorien', 'kinshasa', 'Organisation', NULL, TRUE, '2022-01-01'),
('KATOMBE MALOWA Gustave', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MABANGA PHUATI Joseph', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('RA.JE.CO.PA', NULL, 'kinshasa', 'Organisation', NULL, TRUE, '2022-01-01'),
('MABOTI BOBO Jodi', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('OTETE LOKADI DOUDOU Serge', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('YENGA YENGA Raméal', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('Paul et William', NULL, 'kinshasa', 'Particulier', 'Vulgarisation', TRUE, '2022-01-01'),
('LUKUSA Neville', NULL, 'kinshasa', 'Particulier', 'Vulgarisation', TRUE, '2022-01-01'),
('NZAU MAKAYA', NULL, 'kinshasa', 'Particulier', 'Vulgarisation', TRUE, '2022-01-01'),
('KOLELA Jean-Bertin', NULL, 'kinshasa', 'Particulier', 'Vulgarisation', TRUE, '2022-01-01'),
('DENDE SAMORA Vincent', NULL, 'kinshasa', 'Particulier', 'Vulgarisation', TRUE, '2022-01-01'),
('NTAMBWE MPOSHI Eliezer', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MBIYE Elie', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MUTOMBO Ruth', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MBUYI MPOYI STANIS Alain', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MUKOTSHI Blaise', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('ACDECO', NULL, 'kinshasa', 'Organisation', NULL, TRUE, '2022-01-01'),
('MUKANYA SHABANTYA Raymond', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('KALONDA KAPENGA Mamie', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('NDEVU Emmanuel', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MOYOGO MOMBILI Michel', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('MBUYA MBAYO Jean-Marie', NULL, 'kinshasa', 'Particulier', NULL, TRUE, '2022-01-01'),
('SOCIETE KBD', 'Mr Sylvain', 'kinshasa', 'Entreprise', NULL, TRUE, '2022-01-01');

-- Insertion des partenaires Autres régions
INSERT INTO partners (name, region, type, title, is_active, join_date) VALUES
('MABAYA GIZI Jean-Philibert', 'autres', 'Particulier', 'Sénateur', TRUE, '2021-12-01'),
('BOSUMBE MENDELA Fatou', 'autres', 'Particulier', NULL, TRUE, '2022-01-01'),
('SINYEMBO NGUNGWA Christian', 'autres', 'Particulier', NULL, TRUE, '2022-01-01'),
('MULUMBA Dorcas', 'autres', 'Particulier', NULL, TRUE, '2022-01-01'),
('MBELU Claudine Esther', 'autres', 'Particulier', NULL, TRUE, '2022-01-01'),
('KISHI KAJI Christelle', 'autres', 'Particulier', NULL, TRUE, '2022-01-01'),
('MONSEIGNEUR SANGWA Jules', 'autres', 'Religieux', NULL, TRUE, '2022-01-01'),
('MUSENGA TSHIEY Virginie', 'autres', 'Particulier', NULL, TRUE, '2022-01-01');

-- =========================================
-- DONNÉES DE PROGRESSION TEMPORELLE
-- =========================================

-- Progression 2021
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2021, 11, 'haut-katanga', 1, 3),
(2021, 11, 'kongo-central', 1, 3),
(2021, 11, 'kinshasa', 1, 3),
(2021, 12, 'haut-katanga', 2, 6),
(2021, 12, 'kongo-central', 1, 6),
(2021, 12, 'kinshasa', 2, 6),
(2021, 12, 'autres', 1, 6);

-- Progression représentative pour les autres années
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2022, 12, 'haut-katanga', 7, 18),
(2022, 12, 'kongo-central', 4, 18),
(2022, 12, 'kinshasa', 6, 18),
(2022, 12, 'autres', 1, 18),
(2023, 12, 'haut-katanga', 14, 35),
(2023, 12, 'kongo-central', 9, 35),
(2023, 12, 'kinshasa', 11, 35),
(2023, 12, 'autres', 1, 35),
(2024, 12, 'haut-katanga', 21, 52),
(2024, 12, 'kongo-central', 15, 52),
(2024, 12, 'kinshasa', 14, 52),
(2024, 12, 'autres', 2, 52),
(2025, 12, 'haut-katanga', 21, 69),
(2025, 12, 'kongo-central', 20, 69),
(2025, 12, 'kinshasa', 23, 69),
(2025, 12, 'autres', 5, 69),
(2026, 6, 'haut-katanga', 21, 75),
(2026, 6, 'kongo-central', 20, 75),
(2026, 6, 'kinshasa', 26, 75),
(2026, 6, 'autres', 8, 75);

-- =========================================
-- DONNÉES HERO (Accueil - Carrousel)
-- =========================================

INSERT INTO hero_slides (position, image_url, alt_fr, title_fr, description_fr, is_active) VALUES
(1, 'local:hero_biodiversity_premium', 'Protection de la Biodiversité', 'La protection de l’environnement et de la biodiversité', 'Luttons contre la déforestation et préservons les écosystèmes uniques de la RDC pour un avenir durable.', TRUE),
(2, 'local:hero_food_security', 'Sécurité Alimentaire', 'La sécurité alimentaire', 'Amélioration de la production agricole et valorisation des chaînes locales pour nourrir nos populations.', TRUE),
(3, 'local:hero_agriculture', 'Mécanisation Agricole', 'Mécanisation agricole', 'Modernisation des pratiques et mise à disposition d''équipements adaptés pour une agriculture performante.', TRUE),
(4, 'local:heroImage6', 'Projets Communautaires', 'Projets communautaires', 'Services de base et activités génératrices de revenus pour le développement harmonieux de nos villages.', TRUE),
(5, 'local:heroImage7', 'Élevage Moderne', 'Élevage à grande échelle', 'Systèmes modernes (bovin, caprin, porcin, avicole) et santé animale au cœur de notre expertise.', TRUE),
(6, 'local:heroImage8', 'Cultures Durables', 'Agriculture', 'Promotion d''une agriculture durable avec focus sur le cacao Criollo, le café Arabica et le théier.', TRUE),
(7, 'local:heroImage9', 'Protection de l''Environnement', 'environement', 'Protéger notre cadre de vie et nos ressources naturelles', TRUE),
(8, 'local:heroImage10', 'Énergie Communautaire', 'Énergies Renouvelables', 'Lumière et Force', TRUE),
(9, 'local:heroImage11', 'Reforestation', 'Protection des Forêts', 'Poumon de la planète', TRUE);

-- =========================================
-- DONNÉES DES ARTICLES DE BLOG
-- =========================================

INSERT INTO blog_posts (
    slug, title_fr, content_fr, author, category, read_time,
    stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label,
    featured_image, is_published, published_at
) VALUES (
    'cacao-criollo',
    'CACAO CRIOLLO - L''Or Noir du Congo',
    '<p>Notre programme Cacao Criollo représente une avancée majeure dans l''agriculture premium congolaise. Les fèves de cacao Criollo produites dans nos plantations sont désormais reconnues internationalement pour leur qualité exceptionnelle et leurs arômes uniques.</p>

<p>Le Cacao Criollo, variété ancienne et rare, était sur le point de disparaître du Congo. Grâce à notre programme de sauvegarde et de multiplication, nous avons réussi à replanter plus de 500 000 pieds de cacao Criollo dans les régions de Kikwit et Bandundu.</p>

<h4>Techniques Innovantes</h4>
<p>Nos agriculteurs utilisent des techniques agroforestières avancées qui préservent la biodiversité tout en augmentant les rendements. L''association du cacao avec des arbres fruitiers et des essences forestières crée un écosystème résilient et productif.</p>

<blockquote>"Le passage au cacao Criollo a triplé nos revenus tout en nous permettant de préserver notre forêt. C''est le futur de l''agriculture premium congolaise." — Jean-Pierre Mbuyi, Agriculteur partenaire</blockquote>

<h4>Impact Économique</h4>
<p>Le programme a déjà transformé la vie de plus de 1 200 familles d''agriculteurs. Les revenus moyens ont augmenté de 250%, permettant aux enfants de poursuivre leurs études et aux familles d''accéder aux soins de santé.</p>

<h4>Certification et Marchés</h4>
<p>Notre cacao Criollo est désormais certifié Bio et Fair Trade. Nous exportons vers des chocolatiers premium en Europe et en Amérique du Nord, garantissant des prix justes et stables pour nos agriculteurs.</p>',
    'Dr. Jean-Baptiste Mukendi',
    'agriculture',
    6,
    '1,200+',
    'Familles d''agriculteurs',
    '250%',
    'Augmentation des revenus',
    '500K',
    'Pieds de cacao plantés',
    '/pages/Actions/agriculture/images/hero_cacao.webp',
    TRUE,
    '2024-01-15 10:00:00'
);

-- =========================================
-- DONNÉES DES TÉMOIGNAGES
-- =========================================

INSERT INTO testimonials (
    name, location, short_quote_fr, full_quote_fr, image_path, video_url, rating, is_active, sort_order
) VALUES (
    'Mr Gerard',
    'Kinshasa',
    'BetterLife a transformé notre communauté grâce à ses programmes innovants...',
    'BetterLife a transformé notre communauté grâce à ses programmes innovants d''agriculture durable et de développement communautaire. Leur approche holistique a non seulement amélioré nos conditions de vie mais aussi préservé notre environnement.',
    '/images/temoignages/Mr Gerard.webp',
    'https://youtu.be/JCMOtc03cdo',
    5,
    TRUE,
    1
), (
    'Mr Chrétien',
    'Haut-Katanga',
    'L''impact positif sur notre région est remarquable...',
    'L''impact positif de BetterLife sur notre région est remarquable. Leurs programmes de reboisement et d''agriculture durable ont créé des emplois durables et restauré notre biodiversité locale.',
    '/images/temoignages/Mr chretien.webp',
    'https://youtu.be/nEwJognetC0',
    5,
    TRUE,
    2
), (
    'Mr L''Abbé',
    'Kongo Central',
    'BetterLife apporte espoir et développement durable...',
    'BetterLife apporte espoir et développement durable dans nos communautés. Leur travail avec les agriculteurs locaux et leur engagement pour l''environnement sont sources d''inspiration.',
    '/images/temoignages/Mr L''Abbée.png',
    'https://www.youtube.com/watch?v=fbZJ_Gtrk4k',
    5,
    TRUE,
    3
), (
    'Maître Falonne',
    'Kinshasa',
    'Une ONG qui fait réellement la différence...',
    'BetterLife est une ONG qui fait réellement la différence sur le terrain. Leur approche professionnelle et leur impact mesurable sont impressionnants.',
    '/images/temoignages/Maitre Falonne.png',
    'https://www.youtube.com/watch?v=VIKoUEBqgI0',
    5,
    TRUE,
    4
);

-- =========================================
-- DONNÉES DES DÉLÉGUÉS PROVINCIAUX
-- =========================================

INSERT INTO delegates (
    name, province, bio_fr, expertise, email, is_active
) VALUES (
    'Justin Ngandu',
    'Grand Katanga',
    'Supervise les actions de Better Life dans la région du Grand Katanga, avec un focus sur le développement durable et l''agriculture.',
    '["Développement", "Coordination", "Agriculture"]',
    'admin-lushi@betterlife-ong.org',
    TRUE
), (
    'À préciser',
    'Kongo Central',
    'Coordination des programmes environnementaux et agricoles dans la province du Kongo Central.',
    '["Environnement", "Gestion", "Développement"]',
    'boma@betterlife-ong.org',
    TRUE
), (
    'À préciser',
    'Grand Bandundu',
    'Responsable de la mise en œuvre des initiatives communautaires dans la région du Grand Bandundu.',
    '["Communauté", "Agriculture", "Projets"]',
    'grad-bandundu@betterlife-ong.org',
    TRUE
), (
    'À préciser',
    'Grand Oriental',
    'Supervise le développement des programmes de conservation et de sécurité alimentaire dans le Grand Oriental.',
    '["Conservation", "Sécurité Alimentaire", "Terrain"]',
    'grand-oriental@betterlife-ong.org',
    TRUE
), (
    'À préciser',
    'Grand Kasaï',
    'Coordination des actions de reboisement et de soutien aux agriculteurs dans la zone du Grand Kasaï.',
    '["Reboisement", "Soutien Agricole", "Impact"]',
    'grand-kasai@betterlife-ong.org',
    TRUE
);

-- =========================================
-- UTILISATEUR ADMIN PAR DÉFAUT
-- =========================================

INSERT INTO admin_users (username, email, password_hash, role) VALUES (
    'admin',
    'admin@betterlife-ong.org',
    '$2b$10$rOzQXqQXqQXqQXqQXqQXqeF8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', -- Mot de passe: 'admin123' (À CHANGER ABSOLUMENT!)
    'super_admin'
);

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

-- =========================================
-- TRIGGERS (desactives - utiliser phpMyAdmin pour les ajouter si necessaire)
-- Les colonnes ont deja ON UPDATE CURRENT_TIMESTAMP
-- =========================================

-- =========================================
-- PERMISSIONS ET SÉCURITÉ
-- =========================================

-- Création d'un utilisateur pour l'application (adapter selon votre config cPanel)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON betterlife_db.* TO 'betterlife_user'@'localhost' IDENTIFIED BY 'secure_password_2024';
-- FLUSH PRIVILEGES;

-- =========================================
-- VÉRIFICATION FINALE
-- =========================================

SELECT 'Migration terminée avec succès!' as status, NOW() as timestamp;
SELECT 'Tables créées:' as info, COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'betterlife_db';

-- FIN DU SCRIPT DE MIGRATION