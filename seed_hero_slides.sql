-- Seed des slides Hero (Accueil)
-- Utilise des images "locales" (clé) via le préfixe local:
-- Exemple: local:hero_biodiversity_premium
--
-- IMPORTANT:
-- - N'exécutez ce fichier qu'une seule fois (sinon vous dupliquez les lignes).
-- - Vous pouvez ensuite modifier depuis l'admin (Accueil - Hero).

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

