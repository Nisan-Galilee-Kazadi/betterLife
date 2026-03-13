/**
 * DÉMONSTRATION DU SYSTÈME DE TRADUCTION AUTOMATIQUE
 *
 * Montre comment le système fonctionne en pratique
 */

// Simulation d'un environnement Node.js avec DB
const mysql = require('mysql2/promise');
const { translationService } = require('./auto_translation_service');

// Configuration de test (adapter selon votre setup)
const TEST_DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'betterlife_db'
};

async function demoAutoTranslation() {
  console.log('🎭 DÉMONSTRATION DU SYSTÈME DE TRADUCTION AUTOMATIQUE\n');

  let connection;

  try {
    // Connexion DB
    connection = await mysql.createConnection(TEST_DB_CONFIG);
    global.db = connection;
    console.log('✅ Connexion DB établie\n');

    // =========================================
    // 1. SIMULATION CRÉATION D'ARTICLE
    // =========================================

    console.log('📝 1. Création d\'un article en français...\n');

    const articleData = {
      title_fr: "Cacao Criollo : L'Or Noir du Congo",
      content_fr: `Notre programme Cacao Criollo représente une avancée majeure dans l'agriculture premium congolaise.
                  Les fèves produites dans nos plantations sont reconnues internationalement pour leur qualité exceptionnelle.

                  Grâce à notre programme de sauvegarde, nous avons replanté plus de 500 000 pieds de cacao Criollo
                  dans les régions de Kikwit et Bandundu.`,
      excerpt_fr: "Découvrez comment Better Life révolutionne la culture du cacao premium au Congo.",
      author: "Dr. Jean-Baptiste Mukendi",
      category: "agriculture",
      is_published: true
    };

    // Insérer l'article
    const [result] = await connection.execute(
      `INSERT INTO blog_posts
       (title_fr, content_fr, excerpt_fr, author, category, is_published, translation_status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        articleData.title_fr,
        articleData.content_fr,
        articleData.excerpt_fr,
        articleData.author,
        articleData.category,
        articleData.is_published,
        'translated_fr'
      ]
    );

    const articleId = result.insertId;
    console.log(`✅ Article créé avec ID: ${articleId}\n`);

    // =========================================
    // 2. TRADUCTION AUTOMATIQUE
    // =========================================

    console.log('🔄 2. Traduction automatique en cours...\n');

    // Simuler les triggers qui créent des jobs de traduction
    await simulateTranslationTriggers(articleId, articleData);

    // Traiter les jobs de traduction
    const { TranslationWorker } = require('./translation_worker');
    const worker = new TranslationWorker();
    await worker.processPendingJobs();

    // =========================================
    // 3. VÉRIFICATION RÉSULTATS
    // =========================================

    console.log('✅ 3. Vérification des traductions...\n');

    const [rows] = await connection.execute(
      'SELECT title_fr, title_en, title_es, title_sw FROM blog_posts WHERE id = ?',
      [articleId]
    );

    if (rows.length > 0) {
      const article = rows[0];
      console.log('🇫🇷 FR:', article.title_fr);
      console.log('🇬🇧 EN:', article.title_en || '❌ Non traduit');
      console.log('🇪🇸 ES:', article.title_es || '❌ Non traduit');
      console.log('🇹🇿 SW:', article.title_sw || '❌ Non traduit');
      console.log();
    }

    // =========================================
    // 4. STATISTIQUES
    // =========================================

    console.log('📊 4. Statistiques du système...\n');

    const stats = await worker.getStats();
    console.table(stats);

    const [pendingCount] = await connection.execute(
      'SELECT COUNT(*) as pending FROM translation_jobs WHERE status = "pending"'
    );
    console.log(`📋 Jobs en attente: ${pendingCount[0].pending}\n`);

    // =========================================
    // 5. CACHE DES TRADUCTIONS
    // =========================================

    console.log('📋 5. État du cache...\n');

    const [cacheStats] = await connection.execute(
      'SELECT COUNT(*) as total, AVG(quality_score) as avg_quality FROM translation_cache'
    );
    console.log(`Traductions en cache: ${cacheStats[0].total}`);
    console.log(`Qualité moyenne: ${(cacheStats[0].avg_quality * 100 || 0).toFixed(1)}%\n`);

  } catch (error) {
    console.error('❌ Erreur démonstration:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

/**
 * Simule les triggers de base de données pour créer des jobs de traduction
 */
async function simulateTranslationTriggers(articleId, articleData) {
  const jobs = [
    { field: 'title', content: articleData.title_fr, priority: 'high' },
    { field: 'content', content: articleData.content_fr, priority: 'high' },
    { field: 'excerpt', content: articleData.excerpt_fr, priority: 'medium' }
  ];

  for (const job of jobs) {
    // Créer des jobs pour chaque langue cible
    for (const targetLang of ['en', 'es', 'sw']) {
      await global.db.execute(
        `INSERT INTO translation_jobs
         (content_type, content_id, field_name, source_lang, target_lang, source_content, priority)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['blog_post', articleId, job.field, 'fr', targetLang, job.content, job.priority]
      );
    }
  }

  console.log('📝 Jobs de traduction créés\n');
}

// =========================================
// LANCEMENT DE LA DÉMONSTRATION
// =========================================

if (require.main === module) {
  console.log('🚀 Lancement de la démonstration...\n');

  // Vérifier les variables d'environnement
  if (!process.env.GOOGLE_TRANSLATE_API_KEY && !process.env.DEEPL_API_KEY) {
    console.warn('⚠️ Aucune clé API de traduction configurée!');
    console.log('Configurez GOOGLE_TRANSLATE_API_KEY ou DEEPL_API_KEY dans .env\n');
  }

  demoAutoTranslation()
    .then(() => {
      console.log('🎉 Démonstration terminée!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erreur démonstration:', error);
      process.exit(1);
    });
}

module.exports = { demoAutoTranslation };