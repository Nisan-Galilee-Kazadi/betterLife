# Guide de Migration BetterLife DB

## 📋 Vue d'ensemble

Ce guide explique comment migrer votre base de données BetterLife de XAMPP vers cPanel.

## 📁 Fichiers créés

- `database_schema.sql` : Structure complète de la base de données
- `database_seed.sql` : Données d'initialisation (partenaires, témoignages, etc.)
- `migration_script.sql` : Script combiné pour exécution unique

## 🚀 Étapes de migration

### 1. Préparation sur XAMPP (local)

```bash
# Se connecter à MySQL via phpMyAdmin ou terminal
mysql -u root -p

# Créer et utiliser la base
CREATE DATABASE betterlife_db;
USE betterlife_db;

# Exécuter le script complet
SOURCE migration_script.sql;

# Vérifier que tout est importé
SHOW TABLES;
SELECT COUNT(*) FROM partners;
SELECT COUNT(*) FROM testimonials;
```

### 2. Export depuis XAMPP

**Via phpMyAdmin :**
1. Sélectionner `betterlife_db`
2. Onglet "Exporter"
3. Format : SQL
4. Options : Structure et données
5. Cocher "Ajouter DROP TABLE"
6. Exporter → `betterlife_backup.sql`

**Via terminal :**
```bash
mysqldump -u root -p betterlife_db > betterlife_backup.sql
```

### 3. Import sur cPanel

**Via phpMyAdmin cPanel :**
1. Créer une base `betterlife_db`
2. Sélectionner la base
3. Onglet "Importer"
4. Uploader `betterlife_backup.sql`
5. Exécuter l'import

**Via terminal (si accès SSH) :**
```bash
mysql -u cpanel_user -p betterlife_db < betterlife_backup.sql
```

## ⚙️ Configuration backend avec traduction automatique

Après migration, modifier `backend/index.js` :

```javascript
// Remplacer MongoDB par MySQL + système de traduction
const mysql = require('mysql2/promise');
const { setupAutoTranslation } = require('./backend_translation_integration');

// Configuration DB
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'cpanel_user',
  password: process.env.DB_PASSWORD || 'cpanel_password',
  database: process.env.DB_NAME || 'betterlife_db'
};

// Connexion DB et initialisation traduction
async function initializeDatabase() {
  try {
    const dbConnection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Connexion MySQL établie');

    // Initialiser le système de traduction automatique
    setupAutoTranslation(app, dbConnection);

    return dbConnection;
  } catch (error) {
    console.error('❌ Erreur connexion DB:', error);
    throw error;
  }
}

// Utiliser au lieu de mongoose.connect()
const dbConnection = await initializeDatabase();
```

## 🔄 Configuration des APIs de traduction

Ajouter dans votre `.env` :

```env
# APIs de traduction (obtenir les clés sur les sites respectifs)
GOOGLE_TRANSLATE_API_KEY=votre_clé_google_translate_api
DEEPL_API_KEY=votre_clé_deepl_api

# Configuration DB
DB_HOST=localhost
DB_USER=betterlife_user
DB_PASSWORD=secure_password_2024
DB_NAME=betterlife_db
```

### Obtenir les clés API :

1. **Google Translate API** :
   - Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créer un projet
   - Activer "Translate API"
   - Créer des credentials (API Key)

2. **DeepL API** :
   - S'inscrire sur [DeepL API](https://www.deepl.com/pro-api)
   - Obtenir la clé gratuite (500,000 caractères/mois)

## 🚀 Utilisation du système

### Traduction automatique :
```javascript
// Dès qu'un admin crée/modifie du contenu en français,
// la traduction vers EN, ES, SW se fait automatiquement
POST /api/blog/posts
{
  "title_fr": "Mon article",
  "content_fr": "Contenu en français..."
}
// → Traductions automatiques générées en arrière-plan
```

### Traitement manuel des jobs :
```bash
# Traiter les traductions en attente
curl -X POST http://localhost:5000/api/admin/translations/process

# Voir les statistiques
curl http://localhost:5000/api/admin/translations/stats
```

### Traduction à la demande :
```javascript
POST /api/admin/translations/manual
{
  "text": "Texte à traduire",
  "from": "fr",
  "to": "en"
}
```

## 🔄 Migration progressive

### Phase 1 : Statistiques
- Migrer les chiffres de la page d'accueil
- Connecter via API REST

### Phase 2 : Partenaires
- Migrer la liste des partenaires
- Connecter les graphiques

### Phase 3 : Blog
- Migrer les articles existants
- Créer interface admin

### Phase 4 : Témoignages
- Migrer les témoignages
- Connecter les vidéos

## 📊 Tables principales

| Table | Contenu | Statut |
|-------|---------|--------|
| `statistics` | Chiffres accueil | ✅ Prêt |
| `partners` | Liste partenaires | ✅ Prêt |
| `blog_posts` | Articles blog | ✅ Structure |
| `testimonials` | Témoignages | ✅ Prêt |
| `team_members` | Équipe | 🔄 À migrer |
| `hero_slides` | Carousel accueil | 🔄 À créer |

## 🔧 Scripts utilitaires

### Vérification post-migration
```sql
-- Vérifier l'intégrité des données
SELECT 'Partners' as table_name, COUNT(*) as count FROM partners
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Blog Posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'Statistics', COUNT(*) FROM statistics;
```

### Backup automatique
```sql
-- Script de backup quotidien (à automatiser)
mysqldump -u user -p betterlife_db > backup_$(date +%Y%m%d).sql
```

## 🛠️ Outils recommandés

### Gestion DB
- **phpMyAdmin** : Interface graphique
- **MySQL Workbench** : Outil professionnel
- **TablePlus** : Client moderne multi-OS

### Migration
- **HeidiSQL** : Export/import facile
- **Terminal** : Pour scripts automatisés

## 🔐 Sécurité

### cPanel
- Changer le mot de passe admin par défaut
- Créer un utilisateur dédié avec permissions limitées
- Activer le chiffrement SSL

### Application
- Utiliser des variables d'environnement
- Valider toutes les entrées utilisateur
- Sanitiser les requêtes SQL

## 📈 Optimisations futures

- **Indexes** : Sur les colonnes fréquemment recherchées
- **Cache** : Redis pour les données statiques
- **CDN** : Pour les images des partenaires/blog
- **Monitoring** : Logs et alertes de performance

## 🆘 Dépannage

### Erreur de connexion
```javascript
// Vérifier les credentials
console.log('DB Config:', {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER
});
```

### Erreur d'import
- Vérifier la taille limite d'upload cPanel
- Diviser le fichier SQL en chunks
- Importer table par table

### Performance lente
- Optimiser les requêtes avec EXPLAIN
- Ajouter les indexes manquants
- Configurer le cache MySQL

---

## ✅ Checklist post-migration

- [ ] Base créée sur cPanel
- [ ] Données importées avec succès
- [ ] Permissions utilisateur configurées
- [ ] Connexion backend testée
- [ ] Interface admin fonctionnelle
- [ ] Site en ligne avec données dynamiques
- [ ] Backup automatique configuré

**Date de migration :** `____/____/____`
**Responsable :** `________________`
**Statut :** `✅ Réussi / ❌ Échec`