/**
 * IMPORT DES DONNEES - BetterLife
 * Execute migration_script.sql dans MySQL
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) require('dotenv').config({ path: envPath });
else require('dotenv').config();

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
};

const SQL_FILE = path.join(__dirname, '..', 'migration_script.sql');

async function importData() {
    console.log('[IMPORT] Demarrage de l\'import des donnees BetterLife...\n');

    if (!fs.existsSync(SQL_FILE)) {
        console.error('[ERROR] Fichier migration_script.sql introuvable');
        process.exit(1);
    }

    console.log('[READ] Lecture du fichier migration_script.sql');
    const sql = fs.readFileSync(SQL_FILE, 'utf8');

    let connection;
    try {
        console.log('[CONNECT] Connexion a MySQL...');
        connection = await mysql.createConnection(DB_CONFIG);

        console.log('[EXEC] Execution du script SQL (creation tables + donnees)...');
        await connection.query(sql);

        console.log('[SUCCESS] Import termine avec succes !\n');

        // Verification
        await connection.changeUser({ database: 'betterlife_db' });
        const [tables] = await connection.execute('SHOW TABLES');
        const [partners] = await connection.execute('SELECT COUNT(*) as c FROM partners');
        const [stats] = await connection.execute('SELECT COUNT(*) as c FROM statistics');

        console.log('[VERIFY] Tables creees:', tables.length);
        console.log('[VERIFY] Partenaires importes:', partners[0].c);
        console.log('[VERIFY] Statistiques:', stats[0].c);
        console.log('\n[SUCCESS] Base de donnees prete ! Demarrez le backend avec: npm start');
    } catch (error) {
        console.error('[ERROR] Erreur lors de l\'import:', error.message);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

importData();
