/**
 * Script de nettoyage des doublons dans la table statistics
 * Garde uniquement la ligne avec le MIN(id) pour chaque stat_key
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');

async function cleanupDuplicates() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('✅ Connecté à la DB:', process.env.DB_NAME);

    try {
        // 1. Afficher les doublons avant nettoyage
        const [before] = await db.execute(`
            SELECT stat_key, COUNT(*) as count
            FROM statistics
            GROUP BY stat_key
            HAVING COUNT(*) > 1
        `);

        if (before.length === 0) {
            console.log('✅ Aucun doublon trouvé dans la table statistics !');
        } else {
            console.log('🔍 Doublons trouvés:');
            before.forEach(row => console.log(`  - "${row.stat_key}" : ${row.count} lignes`));

            // 2. Approche par remplacement complet :
            // - Récupérer une seule ligne représentative par stat_key
            const [uniqueRows] = await db.execute(`
                SELECT stat_key, value, label, suffix, color, icon, is_active
                FROM statistics
                GROUP BY stat_key
            `);
            console.log(`  → ${uniqueRows.length} stat_key(s) uniques à conserver`);

            // - Vider complètement la table
            await db.execute('DELETE FROM statistics');
            console.log('  → Table vidée');

            // - Réinsérer les lignes dédupliquées
            for (const row of uniqueRows) {
                await db.execute(
                    `INSERT INTO statistics (stat_key, value, label, suffix, color, icon, is_active)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [row.stat_key, row.value, row.label, row.suffix || '', row.color || 'blue', row.icon || 'FaChartBar', row.is_active ?? 1]
                );
            }
            console.log(`\n🧹 Nettoyage effectué : ${uniqueRows.length} lignes conservées`);

            // 3. Vérifier après nettoyage
            const [after] = await db.execute(`
                SELECT stat_key, value, label FROM statistics ORDER BY id
            `);
            console.log('\n📊 Table statistics après nettoyage:');
            after.forEach(row => console.log(`  - ${row.stat_key}: ${row.value} (${row.label})`));
        }

    } catch (error) {
        console.error('❌ Erreur:', error.message);
    } finally {
        await db.end();
        console.log('\n✅ Connexion fermée.');
    }
}

cleanupDuplicates();
