/**
 * INTÉGRATION DU SYSTÈME DE TRADUCTION AUTOMATIQUE
 * Dans le backend Express existant
 */

// Importer les services
const { translationService } = require('../auto_translation_service');
const { TranslationWorker } = require('../translation_worker');

// =========================================
// 1. VARIABLES GLOBALES
// =========================================

// Rendre la DB accessible globalement pour les services
global.db = null; // Sera défini dans index.js

// =========================================
// 2. FONCTIONS UTILITAIRES
// =========================================

/**
 * Initialise les services de traduction
 */
function initializeTranslationServices(dbConnection) {
  global.db = dbConnection;
  console.log('🌍 Services de traduction initialisés');
}

/**
 * Traduit automatiquement un contenu lors de la création/mise à jour
 */
async function autoTranslateContent(contentType, contentId, frenchContent, fieldName = 'content') {
  try {
    console.log(`🔄 Traduction automatique pour ${contentType} ${contentId}`);

    // Traduire vers toutes les langues cibles
    const translations = await translationService.translateToAllLanguages(frenchContent);

    // Mettre à jour la base de données
    const updates = [];
    for (const [lang, translatedText] of Object.entries(translations)) {
      if (translatedText) {
        const field = `${fieldName}_${lang}`;
        updates.push(updateContentField(contentType, contentId, field, translatedText));
      }
    }

    await Promise.all(updates);
    console.log(`✅ Traductions terminées pour ${contentType} ${contentId}`);

  } catch (error) {
    console.error(`❌ Erreur traduction automatique:`, error.message);
    // Ne pas bloquer la sauvegarde si la traduction échoue
  }
}

/**
 * Met à jour un champ spécifique dans la table appropriée
 */
async function updateContentField(contentType, contentId, fieldName, value) {
  let tableName;

  switch (contentType) {
    case 'blog_post':
      tableName = 'blog_posts';
      break;
    case 'testimonial':
      tableName = 'testimonials';
      break;
    case 'statistic':
      tableName = 'statistics';
      break;
    default:
      throw new Error(`Type de contenu non supporté: ${contentType}`);
  }

  const query = `UPDATE ${tableName} SET ${fieldName} = ? WHERE id = ?`;
  await global.db.execute(query, [value, contentId]);
}

// =========================================
// 3. NOUVELLES ROUTES API
// =========================================

/**
 * Routes à ajouter dans votre serveur Express
 */
function setupTranslationRoutes(app) {

  // Traiter les jobs de traduction en attente
  app.post('/api/admin/translations/process', async (req, res) => {
    try {
      const worker = new TranslationWorker();
      await worker.run();

      const stats = await worker.getStats();
      res.json({
        success: true,
        message: 'Traitement des traductions terminé',
        stats
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Statistiques des traductions
  app.get('/api/admin/translations/stats', async (req, res) => {
    try {
      const worker = new TranslationWorker();
      const stats = await worker.getStats();

      const [pendingJobs] = await global.db.execute(
        'SELECT COUNT(*) as pending FROM translation_jobs WHERE status = "pending"'
      );

      res.json({
        stats,
        pendingJobs: pendingJobs[0].pending
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Traduction manuelle à la demande
  app.post('/api/admin/translations/manual', async (req, res) => {
    try {
      const { text, from, to } = req.body;

      if (!text || !from || !to) {
        return res.status(400).json({ error: 'Paramètres manquants' });
      }

      const translated = await translationService.translateText(text, from, to);

      res.json({
        success: true,
        original: text,
        translated,
        from,
        to
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Nettoyer le cache des traductions
  app.post('/api/admin/translations/cleanup', async (req, res) => {
    try {
      const deleted = await translationService.cleanupCache();

      res.json({
        success: true,
        message: `${deleted} entrées de cache supprimées`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

// =========================================
// 4. MODIFICATION DES ROUTES EXISTANTES
// =========================================

// Exemple de modification pour les articles de blog
function enhanceBlogRoutes() {

  // Création d'article
  app.post('/api/blog/posts', async (req, res) => {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const { title_fr, content_fr, excerpt_fr, ...otherData } = req.body;

      // Insérer l'article avec le contenu français
      const [result] = await connection.execute(
        `INSERT INTO blog_posts (title_fr, content_fr, excerpt_fr, ...) VALUES (?, ?, ?, ...)`,
        [title_fr, content_fr, excerpt_fr, ...Object.values(otherData)]
      );

      const postId = result.insertId;

      // Traduction automatique en arrière-plan
      setImmediate(async () => {
        try {
          if (title_fr) await autoTranslateContent('blog_post', postId, title_fr, 'title');
          if (content_fr) await autoTranslateContent('blog_post', postId, content_fr, 'content');
          if (excerpt_fr) await autoTranslateContent('blog_post', postId, excerpt_fr, 'excerpt');
        } catch (error) {
          console.error('Erreur traduction automatique:', error);
        }
      });

      await connection.commit();
      res.json({ success: true, id: postId });

    } catch (error) {
      await connection.rollback();
      res.status(500).json({ error: error.message });
    } finally {
      connection.release();
    }
  });

  // Mise à jour d'article
  app.put('/api/blog/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title_fr, content_fr, excerpt_fr, ...updates } = req.body;

      // Mise à jour normale
      const updateFields = [];
      const updateValues = [];

      Object.entries(updates).forEach(([key, value]) => {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      });

      updateValues.push(id);

      await global.db.execute(
        `UPDATE blog_posts SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );

      // Traductions automatiques pour les champs français modifiés
      if (title_fr) await autoTranslateContent('blog_post', id, title_fr, 'title');
      if (content_fr) await autoTranslateContent('blog_post', id, content_fr, 'content');
      if (excerpt_fr) await autoTranslateContent('blog_post', id, excerpt_fr, 'excerpt');

      res.json({ success: true });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

// =========================================
// 5. CONFIGURATION ET INITIALISATION
// =========================================

/**
 * Configuration à ajouter dans votre index.js
 */
function setupAutoTranslation(app, dbConnection) {

  // Initialiser les services
  initializeTranslationServices(dbConnection);

  // Ajouter les routes de traduction
  setupTranslationRoutes(app);

  // Modifier les routes existantes pour inclure la traduction automatique
  enhanceBlogRoutes();

  console.log('🎉 Système de traduction automatique activé!');
}

// =========================================
// 6. VARIABLES D'ENVIRONNEMENT REQUISES
// =========================================

/*
Ajouter dans votre .env :

# Clés API pour la traduction
GOOGLE_TRANSLATE_API_KEY=votre_clé_google_translate
DEEPL_API_KEY=votre_clé_deepl

# Configuration DB (si différente)
DB_HOST=localhost
DB_USER=betterlife_user
DB_PASSWORD=secure_password_2024
DB_NAME=betterlife_db
*/

// =========================================
// 7. UTILISATION DANS INDEX.JS
// =========================================

/*
// Dans votre index.js, après la connexion DB :

const { setupAutoTranslation } = require('./backend_translation_integration');

// Remplacer la ligne : mongoose.connect(MONGODB_URI)...
// Par votre connexion MySQL
const mysql = require('mysql2/promise');
const dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Initialiser le système de traduction
setupAutoTranslation(app, dbConnection);
*/

module.exports = {
  setupAutoTranslation,
  autoTranslateContent,
  initializeTranslationServices
};