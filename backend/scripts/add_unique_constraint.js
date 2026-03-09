/**
 * Ajoute une contrainte UNIQUE sur stat_key dans la table statistics
 * pour empêcher définitivement les doublons
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');

async function addUniqueConstraint() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('✅ Connecté à la DB:', process.env.DB_NAME);

    try {
        // Vérifier si la contrainte existe déjà
        const [indexes] = await db.execute(`
            SHOW INDEX FROM statistics WHERE Key_name = 'unique_stat_key'
        `);

        if (indexes.length > 0) {
            console.log('✅ La contrainte UNIQUE existe déjà sur stat_key.');
        } else {
            // Ajouter la contrainte UNIQUE
            await db.execute(`
                ALTER TABLE statistics ADD UNIQUE KEY unique_stat_key (stat_key)
            `);
            console.log('✅ Contrainte UNIQUE ajoutée sur statistics.stat_key');
            console.log('   → Les futurs doublons seront impossibles !');
        }

        // Afficher l'état final
        const [rows] = await db.execute('SELECT stat_key, value, label FROM statistics ORDER BY id');
        console.log('\n📊 Table statistics actuelle:');
        rows.forEach(r => console.log(`  - ${r.stat_key}: ${r.value} (${r.label})`));

    } catch (error) {
        console.error('❌ Erreur:', error.message);
    } finally {
        await db.end();
    }
}

addUniqueConstraint();
