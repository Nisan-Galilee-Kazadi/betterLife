/**
 * WORKER DE TRAITEMENT DES TRADUCTIONS AUTOMATIQUES
 *
 * Traite les jobs de traduction en attente dans la base de données
 * Peut être exécuté :
 * - Manuellement: node translation_worker.js
 * - En cron job: */5 * * * * node /path/to/translation_worker.js
 * - Via API: POST /api/admin/translations/process
 */

const mysql = require('mysql2/promise');
const { translationService } = require('./auto_translation_service');

// Configuration DB (adapter selon votre setup)
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'betterlife_user',
  password: process.env.DB_PASSWORD || 'secure_password_2024',
  database: process.env.DB_NAME || 'betterlife_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

class TranslationWorker {
  constructor() {
    this.pool = mysql.createPool(DB_CONFIG);
    this.isRunning = false;
    this.maxRetries = 3;
  }

  /**
   * Point d'entrée principal
   */
  async run() {
    if (this.isRunning) {
      console.log('⚠️ Worker déjà en cours d\'exécution');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Démarrage du worker de traduction...');

    try {
      await this.processPendingJobs();
    } catch (error) {
      console.error('❌ Erreur dans le worker:', error);
    } finally {
      this.isRunning = false;
      await this.pool.end();
    }
  }

  /**
   * Traite tous les jobs en attente
   */
  async processPendingJobs() {
    const connection = await this.pool.getConnection();

    try {
      // Récupérer les jobs en attente, triés par priorité
      const [jobs] = await connection.execute(`
        SELECT * FROM translation_jobs
        WHERE status = 'pending'
        ORDER BY
          CASE priority
            WHEN 'high' THEN 1
            WHEN 'medium' THEN 2
            WHEN 'low' THEN 3
          END,
          created_at ASC
        LIMIT 50
      `);

      console.log(`📋 ${jobs.length} jobs de traduction à traiter`);

      for (const job of jobs) {
        await this.processJob(job, connection);
      }

    } finally {
      connection.release();
    }
  }

  /**
   * Traite un job individuel
   */
  async processJob(job, connection) {
    console.log(`🔄 Traitement job ${job.id}: ${job.content_type} ${job.field_name} → ${job.target_lang}`);

    // Marquer comme en cours
    await connection.execute(
      'UPDATE translation_jobs SET status = "processing" WHERE id = ?',
      [job.id]
    );

    try {
      // Traduire le contenu
      const translatedContent = await translationService.translateText(
        job.source_content,
        job.source_lang,
        job.target_lang
      );

      // Mettre à jour la table appropriée selon le type de contenu
      await this.updateContentTable(job, translatedContent, connection);

      // Marquer le job comme terminé
      await connection.execute(
        'UPDATE translation_jobs SET status = "completed", translated_content = ?, processed_at = NOW() WHERE id = ?',
        [translatedContent, job.id]
      );

      console.log(`✅ Job ${job.id} terminé`);

    } catch (error) {
      console.error(`❌ Erreur job ${job.id}:`, error.message);

      // Incrémenter le compteur de retry
      const newRetryCount = job.retry_count + 1;

      if (newRetryCount >= this.maxRetries) {
        // Job échoué définitivement
        await connection.execute(
          'UPDATE translation_jobs SET status = "failed", error_message = ?, processed_at = NOW() WHERE id = ?',
          [error.message, job.id]
        );
      } else {
        // Remettre en attente pour retry
        await connection.execute(
          'UPDATE translation_jobs SET status = "pending", retry_count = ?, error_message = ? WHERE id = ?',
          [newRetryCount, error.message, job.id]
        );
      }
    }
  }

  /**
   * Met à jour la table de contenu appropriée
   */
  async updateContentTable(job, translatedContent, connection) {
    const fieldName = `${job.field_name}_${job.target_lang}`;
    let tableName, whereClause;

    switch (job.content_type) {
      case 'blog_post':
        tableName = 'blog_posts';
        whereClause = 'id = ?';
        break;

      case 'testimonial':
        tableName = 'testimonials';
        whereClause = 'id = ?';
        break;

      case 'statistic':
        tableName = 'statistics';
        whereClause = 'id = ?';
        break;

      default:
        throw new Error(`Type de contenu non supporté: ${job.content_type}`);
    }

    await connection.execute(
      `UPDATE ${tableName} SET ${fieldName} = ? WHERE ${whereClause}`,
      [translatedContent, job.content_id]
    );
  }

  /**
   * Nettoie les jobs terminés depuis plus de X jours
   */
  async cleanupOldJobs(days = 7) {
    const connection = await this.pool.getConnection();

    try {
      const [result] = await connection.execute(
        'DELETE FROM translation_jobs WHERE status IN ("completed", "failed") AND processed_at < DATE_SUB(NOW(), INTERVAL ? DAY)',
        [days]
      );

      console.log(`🧹 ${result.affectedRows} anciens jobs supprimés`);
      return result.affectedRows;

    } finally {
      connection.release();
    }
  }

  /**
   * Statistiques des traductions
   */
  async getStats() {
    const connection = await this.pool.getConnection();

    try {
      const [stats] = await connection.execute(`
        SELECT
          status,
          COUNT(*) as count,
          AVG(TIMESTAMPDIFF(SECOND, created_at, processed_at)) as avg_processing_time
        FROM translation_jobs
        WHERE processed_at IS NOT NULL
        GROUP BY status
      `);

      return stats;

    } finally {
      connection.release();
    }
  }
}

// Fonction principale pour exécution en CLI
async function main() {
  const worker = new TranslationWorker();

  const command = process.argv[2];

  switch (command) {
    case 'stats':
      const stats = await worker.getStats();
      console.table(stats);
      break;

    case 'cleanup':
      const deleted = await worker.cleanupOldJobs();
      console.log(`${deleted} jobs nettoyés`);
      break;

    default:
      await worker.run();
      break;
  }
}

// Exécution si appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TranslationWorker };