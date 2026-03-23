const mysql = require('mysql2/promise');
require('dotenv').config();

const {
    HERO_SLIDES,
    getHeroSlidesCreateTableSql,
    insertHeroSlides,
} = require('./heroSlidesSeed');

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db',
};

function quoteIdentifier(identifier) {
    return `\`${String(identifier).replace(/`/g, '')}\``;
}

function buildBackupTableName() {
    const now = new Date();
    const stamp = [
        now.getUTCFullYear(),
        String(now.getUTCMonth() + 1).padStart(2, '0'),
        String(now.getUTCDate()).padStart(2, '0'),
        String(now.getUTCHours()).padStart(2, '0'),
        String(now.getUTCMinutes()).padStart(2, '0'),
        String(now.getUTCSeconds()).padStart(2, '0'),
    ].join('');

    return `hero_slides_backup_${stamp}`;
}

async function tableExists(connection, tableName) {
    const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count
         FROM INFORMATION_SCHEMA.TABLES
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
        [DB_CONFIG.database, tableName]
    );
    return !!rows[0]?.count;
}

async function dropTableIfExists(connection, tableName) {
    if (await tableExists(connection, tableName)) {
        await connection.execute(`DROP TABLE ${quoteIdentifier(tableName)}`);
    }
}

async function restoreBackupIfNeeded(connection, backupTableName) {
    if (!backupTableName) return;
    const currentExists = await tableExists(connection, 'hero_slides');
    const backupExists = await tableExists(connection, backupTableName);

    if (!currentExists && backupExists) {
        await connection.execute(
            `RENAME TABLE ${quoteIdentifier(backupTableName)} TO ${quoteIdentifier('hero_slides')}`
        );
        console.log(`[REBUILD] Backup restored to hero_slides from ${backupTableName}.`);
    }
}

async function main() {
    const connection = await mysql.createConnection(DB_CONFIG);
    let backupTableName = null;

    console.log('[REBUILD] Connected to MySQL for hero slide rebuild.');

    try {
        if (await tableExists(connection, 'hero_slides')) {
            backupTableName = buildBackupTableName();
            await connection.execute(
                `RENAME TABLE ${quoteIdentifier('hero_slides')} TO ${quoteIdentifier(backupTableName)}`
            );
            console.log(`[REBUILD] Existing hero_slides table moved to ${backupTableName}.`);
        }

        await connection.execute(
            getHeroSlidesCreateTableSql('hero_slides', { ifNotExists: false })
        );
        await insertHeroSlides(connection, 'hero_slides', HERO_SLIDES);

        const [rows] = await connection.execute(
            'SELECT id, position, title_fr FROM hero_slides ORDER BY position ASC, id ASC'
        );

        console.log(
            `[REBUILD] Rebuilt hero_slides with ${rows.length} canonical slides.`
        );
        rows.forEach((row) => {
            console.log(`[REBUILD] #${row.position} -> id=${row.id} | ${row.title_fr}`);
        });
    } catch (error) {
        console.error('[REBUILD] Hero slide rebuild failed:', error.message);
        try {
            await dropTableIfExists(connection, 'hero_slides');
            await restoreBackupIfNeeded(connection, backupTableName);
        } catch (restoreError) {
            console.error('[REBUILD] Backup restore failed:', restoreError.message);
        }
        process.exitCode = 1;
    } finally {
        await connection.end();
    }
}

main().catch((error) => {
    console.error('[REBUILD] Unexpected error:', error.message);
    process.exitCode = 1;
});
