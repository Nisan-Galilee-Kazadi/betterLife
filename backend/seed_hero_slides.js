const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  console.log('[SEED] Démarrage du seed hero_slides...');

  const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db',
  };

  const sqlPath = path.join(__dirname, '..', 'seed_hero_slides.sql');
  console.log('[READ] Lecture du fichier', sqlPath);

  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Nettoyer le SQL : supprimer commentaires et lignes vides
  const cleanSql = sql
    .split('\n')
    .map(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('--')) return '';
      return trimmed;
    })
    .filter(line => line)
    .join('\n');

  // Extraire uniquement la partie INSERT
  const insertMatch = cleanSql.match(/INSERT INTO hero_slides.*VALUES[\s\S]*;/);
  const statements = insertMatch ? [insertMatch[0]] : [];

  const connection = await mysql.createConnection(DB_CONFIG);
  console.log('[CONNECT] Connecté à MySQL pour seed hero_slides');

  try {
    for (const stmt of statements) {
      console.log('[EXEC] Statement:', stmt.slice(0, 80) + (stmt.length > 80 ? '...' : ''));
      await connection.execute(stmt);
    }
    console.log('[SUCCESS] hero_slides seedé avec succès.');
  } catch (err) {
    console.error('[ERROR] Seed hero_slides échoué:', err.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error('[FATAL] Erreur inattendue:', err);
  process.exitCode = 1;
});

