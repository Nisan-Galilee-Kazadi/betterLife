-- Seed équipe : photos réelles (/team/xxx) pour les 8 membres.
-- Le frontend résout /team/rh.jpg, /team/gp.jpg, etc. vers les images bundlées (Rh.jpg, GP.jpg, ...).
-- Exécuter après avoir créé la table team_members (backend ou migration).

-- Mise à jour si les lignes existent déjà (adapter les emails si besoin)
-- N°1 Bernard : pas encore de photo → no image (photo_path NULL)
UPDATE team_members SET photo_path = NULL WHERE email = 'bernardkilungu@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/cordon.jpg'   WHERE email = 'coordination@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/sec.jpg'      WHERE email = 'secretariat@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/dircom.jpg'    WHERE email = 'betterlifeorg@gmail.com';
UPDATE team_members SET photo_path = '/team/rh.jpg'       WHERE email = 'rh@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/finaciere.jpg' WHERE email = 'compta@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/gp.jpg'        WHERE email = 'gestionprojet@betterlife-ong.org';
UPDATE team_members SET photo_path = '/team/marceline.jpg' WHERE email = 'dt@betterlife-ong.org';

-- Insertion des membres s'ils n'existent pas (à lancer une fois ; ignorer les erreurs "Duplicate entry" si déjà présents)
INSERT IGNORE INTO team_members (name, role_fr, bio_fr, email, photo_path, expertise, sort_order, is_active) VALUES
('Ir KILUNGU KASONGO Bernard', 'Délégué National', "Représente l'organisation et supervise les délégations provinciales.", 'bernardkilungu@betterlife-ong.org', NULL, '["Relations Institutionnelles","Leadership","Développement"]', 1, TRUE),
('Ir DEKEY MOLO Blaise', 'Coordonnateur National', "Assure la coordination globale des activités de l'ONG au niveau national.", 'coordination@betterlife-ong.org', '/team/cordon.jpg', '["Coordination","Stratégie","Management"]', 2, TRUE),
('Mme YANGA LUBULU Deborah', 'Secrétaire Administrative', "Assure le support administratif et la gestion documentaire de l'organisation.", 'secretariat@betterlife-ong.org', '/team/sec.jpg', '["Administration","Organisation","Secrétariat"]', 3, TRUE),
('LUMUMBA MPUMPU Nathan', 'Directeur Communication', "Pilote la stratégie de communication et la visibilité des actions de l'ONG.", 'betterlifeorg@gmail.com', '/team/dircom.jpg', '["Communication","Marketing","Relations Publiques"]', 4, TRUE),
('Mme MPOYI NGALULA Sarah', 'Directrice RH', 'Gère le capital humain, le recrutement et le développement des compétences.', 'rh@betterlife-ong.org', '/team/rh.jpg', '["Ressources Humaines","Recrutement","Formation"]', 5, TRUE),
('Mme LUTONADIO NSIMBA Florence', 'Directrice Financière', 'Supervise la gestion financière, budgétaire et comptable de Better Life.', 'compta@betterlife-ong.org', '/team/finaciere.jpg', '["Finance","Comptabilité","Audit","Gestion"]', 6, TRUE),
('Mme META NYEMABU Ornella', 'Gestionnaire de Projet', "Responsable de la planification, de l'exécution et du suivi des projets de l'ONG.", 'gestionprojet@betterlife-ong.org', '/team/gp.jpg', '["Gestion de Projet","Planification","Suivi & Évaluation"]', 7, TRUE),
('Mme BAKAKUWA NGALULA Marceline', 'Directrice Technique', "Supervise les aspects techniques et scientifiques des programmes.", 'dt@betterlife-ong.org', '/team/marceline.jpg', '["Expertise Technique","Agronomie","Environnement"]', 8, TRUE);
