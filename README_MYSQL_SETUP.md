# 🚀 BetterLife MySQL + Auto-Translation Setup

## 📋 Vue d'ensemble

Le système BetterLife a été migré de MongoDB vers MySQL avec un système de **traduction automatique intégré**. Toutes les mises à jour en français sont automatiquement traduites vers l'anglais, l'espagnol et le swahili.

## 🗄️ Base de données MySQL

### Tables créées :
- `statistics` - Chiffres et statistiques
- `partners` - Partenaires avec progression temporelle
- `blog_posts` - Articles de blog multilingues
- `testimonials` - Témoignages avec vidéos
- `team_members` - Membres de l'équipe
- `delegates` - Délégués provinciaux
- `translation_cache` - Cache des traductions
- `translation_jobs` - Jobs de traduction en attente

## ⚙️ Configuration rapide

### 1. Importer la base de données

**Via phpMyAdmin (XAMPP) :**
```bash
# Ouvrir phpMyAdmin
# Créer la base : betterlife_db
# Importer : migration_script.sql
```

### 2. Configurer les variables d'environnement

**Copier le fichier de configuration :**
```bash
cp config.env .env
```

**Éditer `.env` avec vos clés API :**
```env
# MySQL (XAMPP par défaut)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=betterlife_db

# APIs de traduction (optionnel pour commencer)
GOOGLE_TRANSLATE_API_KEY=votre_clé
DEEPL_API_KEY=votre_clé
```

### 3. Installer les dépendances MySQL

```bash
cd backend
npm install mysql2
```

### 4. Démarrer le serveur

```bash
cd backend
node index.js
```

## 🌍 APIs disponibles

### Statistiques
```http
GET  /api/statistics           # Toutes les stats
PUT  /api/statistics/:key      # Modifier une stat
```

### Partenaires
```http
GET  /api/partners             # Tous les partenaires
GET  /api/partners?region=haut-katanga  # Par région
GET  /api/partners/progression # Évolution temporelle
```

### Blog
```http
GET  /api/blog/posts           # Articles publiés
GET  /api/blog/posts?lang=en   # En anglais
POST /api/blog/posts           # Créer article (auto-traduction)
PUT  /api/blog/posts/:id       # Modifier article
```

### Témoignages
```http
GET  /api/testimonials         # Tous les témoignages
GET  /api/testimonials?lang=es # En espagnol
```

### Équipe & Délégués
```http
GET  /api/team                 # Membres équipe
GET  /api/delegates            # Délégués provinciaux
```

## 🔄 Système de traduction automatique

### Comment ça marche :

1. **Admin écrit en français** → Sauvegarde dans la DB
2. **Triggers détectent** → Créent des jobs de traduction
3. **APIs traduisent** → Google/DeepL selon disponibilité
4. **Cache stocke** → Évite retraductions inutiles
5. **DB mise à jour** → Contenu disponible dans toutes les langues

### Exemple concret :
```javascript
// Admin crée un article
POST /api/blog/posts
{
  "title_fr": "Cacao Criollo : L'Or Noir du Congo",
  "content_fr": "Notre programme représente..."
}

// Résultat automatique :
{
  "title_fr": "Cacao Criollo : L'Or Noir du Congo",
  "title_en": "Criollo Cocoa: The Black Gold of Congo",    // ✅ Auto
  "title_es": "Cacao Criollo: El Oro Negro del Congo",    // ✅ Auto
  "title_sw": "Kakao Criollo: Dhahabu Nyeusi ya Kongo"    // ✅ Auto
}
```

## 📊 Monitoring & Maintenance

### Vérifier l'état du système :
```bash
GET /api/admin/translations/stats
```

### Traiter les traductions en attente :
```bash
POST /api/admin/translations/process
```

### Nettoyer le cache :
```bash
POST /api/admin/translations/cleanup
```

## 🔧 Scripts utilitaires

### Worker de traduction (cron job) :
```bash
# Toutes les 30 minutes
node translation_worker.js

# Statistiques
node translation_worker.js stats

# Nettoyage (hebdomadaire)
node translation_worker.js cleanup
```

### Démonstration :
```bash
node demo_auto_translation.js
```

## 🚀 Déploiement cPanel

### 1. Créer la base sur cPanel
### 2. Importer `migration_script.sql`
### 3. Modifier `.env` avec les credentials cPanel
### 4. Configurer les clés API de traduction
### 5. Redémarrer le serveur

## 📈 Avantages du système

### ✅ **Cohérence garantie**
- Tout contenu français est automatiquement traduit
- Pas de contenu manquant dans une langue

### ✅ **Performance optimisée**
- Cache intelligent des traductions
- Traitement asynchrone
- APIs haute performance

### ✅ **Maintenance facile**
- Monitoring intégré
- Logs détaillés
- Nettoyage automatique

### ✅ **Évolutif**
- Support de nouveaux langues facile
- APIs de secours
- Cache extensible

---

## 🎯 Prêt à l'emploi !

Le système est maintenant configuré pour :
- ✅ **MySQL** comme base de données principale
- ✅ **Traduction automatique** FR → EN/ES/SW
- ✅ **APIs REST** complètes
- ✅ **Cache intelligent** des traductions
- ✅ **Monitoring** et maintenance

**Il suffit d'importer la DB et configurer les clés API !** 🚀