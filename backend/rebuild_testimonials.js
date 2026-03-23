const mysql = require('mysql2/promise');
require('dotenv').config();

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

    return `testimonials_backup_${stamp}`;
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
    const currentExists = await tableExists(connection, 'testimonials');
    const backupExists = await tableExists(connection, backupTableName);

    if (!currentExists && backupExists) {
        await connection.execute(
            `RENAME TABLE ${quoteIdentifier(backupTableName)} TO ${quoteIdentifier('testimonials')}`
        );
        console.log(`[REBUILD] Backup restored to testimonials from ${backupTableName}.`);
    }
}

async function createTestimonialsTable(connection) {
    await connection.execute(`
        CREATE TABLE ${quoteIdentifier('testimonials')} (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            location VARCHAR(200),
            role VARCHAR(100),
            short_quote_fr TEXT,
            short_quote_en TEXT,
            short_quote_es TEXT,
            short_quote_sw TEXT,
            full_quote_fr TEXT,
            full_quote_en TEXT,
            full_quote_es TEXT,
            full_quote_sw TEXT,
            image_path VARCHAR(255),
            video_url VARCHAR(500),
            rating INT DEFAULT 5,
            is_featured BOOLEAN DEFAULT FALSE,
            is_active BOOLEAN DEFAULT TRUE,
            sort_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

async function main() {
    const connection = await mysql.createConnection(DB_CONFIG);
    let backupTableName = null;

    console.log('[REBUILD] Connected to MySQL for testimonials rebuild.');

    try {
        if (await tableExists(connection, 'testimonials')) {
            backupTableName = buildBackupTableName();
            await connection.execute(
                `RENAME TABLE ${quoteIdentifier('testimonials')} TO ${quoteIdentifier(backupTableName)}`
            );
            console.log(`[REBUILD] Existing testimonials table moved to ${backupTableName}.`);
        }

        await createTestimonialsTable(connection);

        if (backupTableName) {
            const [rows] = await connection.execute(
                `SELECT
                    name, location, role,
                    short_quote_fr, short_quote_en, short_quote_es, short_quote_sw,
                    full_quote_fr, full_quote_en, full_quote_es, full_quote_sw,
                    image_path, video_url, rating, is_featured, is_active, sort_order, created_at
                 FROM ${quoteIdentifier(backupTableName)}
                 ORDER BY sort_order ASC, created_at ASC, name ASC`
            );

            for (const row of rows) {
                await connection.execute(
                    `INSERT INTO testimonials (
                        name, location, role,
                        short_quote_fr, short_quote_en, short_quote_es, short_quote_sw,
                        full_quote_fr, full_quote_en, full_quote_es, full_quote_sw,
                        image_path, video_url, rating, is_featured, is_active, sort_order, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        row.name,
                        row.location,
                        row.role,
                        row.short_quote_fr,
                        row.short_quote_en,
                        row.short_quote_es,
                        row.short_quote_sw,
                        row.full_quote_fr,
                        row.full_quote_en,
                        row.full_quote_es,
                        row.full_quote_sw,
                        row.image_path,
                        row.video_url,
                        row.rating ?? 5,
                        !!row.is_featured,
                        row.is_active !== false,
                        row.sort_order ?? 0,
                        row.created_at,
                    ]
                );
            }
        }

        const [rows] = await connection.execute(
            'SELECT id, sort_order, name FROM testimonials ORDER BY sort_order ASC, created_at ASC, id ASC'
        );
        console.log(`[REBUILD] Rebuilt testimonials with ${rows.length} rows.`);
        rows.forEach((row) => {
            console.log(`[REBUILD] sort=${row.sort_order} -> id=${row.id} | ${row.name}`);
        });
    } catch (error) {
        console.error('[REBUILD] Testimonials rebuild failed:', error.message);
        try {
            await dropTableIfExists(connection, 'testimonials');
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
