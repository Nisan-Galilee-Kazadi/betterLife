-- =========================================
-- BetterLife Database Seed Data
-- Données d'initialisation pour la base de données
-- =========================================

USE betterlife_db;

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
-- DONNÉES DE PROGRESSION TEMPORELLE (extrait du code)
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

-- Progression 2022 (échantillonnage représentatif)
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2022, 1, 'haut-katanga', 2, 7),
(2022, 1, 'kongo-central', 1, 7),
(2022, 1, 'kinshasa', 3, 7),
(2022, 1, 'autres', 1, 7),
(2022, 6, 'haut-katanga', 4, 12),
(2022, 6, 'kongo-central', 3, 12),
(2022, 6, 'kinshasa', 4, 12),
(2022, 6, 'autres', 1, 12),
(2022, 12, 'haut-katanga', 7, 18),
(2022, 12, 'kongo-central', 4, 18),
(2022, 12, 'kinshasa', 6, 18),
(2022, 12, 'autres', 1, 18);

-- Progression 2023 (fin d'année seulement)
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2023, 12, 'haut-katanga', 14, 35),
(2023, 12, 'kongo-central', 9, 35),
(2023, 12, 'kinshasa', 11, 35),
(2023, 12, 'autres', 1, 35);

-- Progression 2024 (fin d'année seulement)
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2024, 12, 'haut-katanga', 21, 52),
(2024, 12, 'kongo-central', 15, 52),
(2024, 12, 'kinshasa', 14, 52),
(2024, 12, 'autres', 2, 52);

-- Progression 2025 (fin d'année seulement)
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2025, 12, 'haut-katanga', 21, 69),
(2025, 12, 'kongo-central', 20, 69),
(2025, 12, 'kinshasa', 23, 69),
(2025, 12, 'autres', 5, 69);

-- Progression 2026 (projection)
INSERT INTO partner_progression (year, month, region, count, total) VALUES
(2026, 6, 'haut-katanga', 21, 75),
(2026, 6, 'kongo-central', 20, 75),
(2026, 6, 'kinshasa', 26, 75),
(2026, 6, 'autres', 8, 75);

-- =========================================
-- DONNÉES DES ARTICLES DE BLOG
-- =========================================

-- Article Cacao Criollo
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
-- ARTICLES CONNEXES POUR LE CACAO
-- =========================================

-- Récupération de l'ID de l'article cacao
SET @cacao_id = (SELECT id FROM blog_posts WHERE slug = 'cacao-criollo');

-- Insertion d'articles connexes (à adapter selon les vrais articles)
INSERT INTO blog_related_posts (post_id, related_post_id, sort_order) VALUES
(@cacao_id, @cacao_id + 1, 1), -- Café
(@cacao_id, @cacao_id + 2, 2), -- Thé
(@cacao_id, @cacao_id + 3, 3); -- Coton-Caoutchouc

-- =========================================
-- DONNÉES DES TÉMOIGNAGES (structure de base)
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
    '$2b$10$rOzQXqQXqQXqQXqQXqQXqeF8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8', -- Mot de passe: 'admin123' (à changer!)
    'super_admin'
);

-- =========================================
-- CONTENU STATIQUE À MIGRER (exemples)
-- =========================================

-- Sections de la page Mission qui pourraient devenir dynamiques
INSERT INTO content_pages (page_key, section_key, content_type, content_fr, is_dynamic) VALUES
('mission', 'vision_text', 'text', 'Notre vision est de créer un Congo où le développement durable et la prospérité économique vont de pair avec la préservation de l''environnement et le bien-être des communautés.', TRUE),
('mission', 'mission_text', 'text', 'Notre mission est d''accompagner les communautés congolaises dans leur transition vers des pratiques agricoles durables et des modes de vie respectueux de l''environnement.', TRUE);

-- =========================================
-- VÉRIFICATION DES DONNÉES
-- =========================================

-- Compter les partenaires par région
SELECT region, COUNT(*) as total FROM partners GROUP BY region ORDER BY total DESC;

-- Vérifier la progression
SELECT year, month, SUM(total) as total_partners FROM partner_progression GROUP BY year, month ORDER BY year, month;

-- FIN DU SCRIPT DE SEED