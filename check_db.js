/**
 * VERIFICATION ETAT BASE DE DONNEES
 * ================================
 */

const mysql = require('mysql2/promise');

async function checkDatabase() {
    console.log('[CHECK] Vérification de la base de données BetterLife...\n');

    const config = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'betterlife_db',
        connectTimeout: 5000
    };

    let connection;

    try {
        // Test de connexion
        console.log('1. [CONNECT] Test de connexion MySQL...');
        connection = await mysql.createConnection(config);
        console.log('   [SUCCESS] Connexion MySQL réussie\n');

        // Vérifier les tables
        console.log('2. [TABLES] Vérification des tables...');
        const [tables] = await connection.execute(
            "SHOW TABLES LIKE 'statistics'"
        );

        if (tables.length === 0) {
            console.log('   [ERROR] Tables non trouvées - Import nécessaire\n');

            console.log('[INFO] INSTRUCTIONS D\'IMPORT :');
            console.log('1. Ouvrir http://localhost/phpmyadmin');
            console.log('2. Créer base "betterlife_db"');
            console.log('3. Importer migration_script.sql');
            console.log('4. Redémarrer ce script\n');

            return false;
        }

        console.log('   [SUCCESS] Tables trouvées\n');

        // Compter les données
        console.log('3. [COUNT] Comptage des données...');

        const counts = await Promise.all([
            connection.execute('SELECT COUNT(*) as count FROM partners'),
            connection.execute('SELECT COUNT(*) as count FROM testimonials'),
            connection.execute('SELECT COUNT(*) as count FROM statistics'),
            connection.execute('SELECT COUNT(*) as count FROM blog_posts')
        ]);

        const partnersCount = counts[0][0][0].count;
        const testimonialsCount = counts[1][0][0].count;
        const statsCount = counts[2][0][0].count;
        const postsCount = counts[3][0][0].count;

        console.log(`   [PARTNERS] Partenaires: ${partnersCount}`);
        console.log(`   [TESTIMONIALS] Témoignages: ${testimonialsCount}`);
        console.log(`   [STATS] Statistiques: ${statsCount}`);
        console.log(`   [ARTICLES] Articles: ${postsCount}\n`);

        // Vérifier si les données sont présentes
        const hasData = partnersCount > 0 && testimonialsCount > 0;

        if (hasData) {
            console.log('[SUCCESS] BASE DE DONNÉES PRÊTE !');
            console.log('[START] Vous pouvez maintenant démarrer le backend :');
            console.log('   Double-clic sur start_backend.bat\n');
            return true;
        } else {
            console.log('⚠️ Base vide - Import des données nécessaire');
            console.log('📄 Importer migration_script.sql dans phpMyAdmin\n');
            return false;
        }

    } catch (error) {
        console.error('[ERROR] Erreur de connexion :', error.message);
        console.log('\n[HINT] SOLUTIONS :');
        console.log('1. Démarrer XAMPP (Apache + MySQL)');
        console.log('2. Vérifier que MySQL est en vert');
        console.log('3. Créer la base betterlife_db dans phpMyAdmin');
        console.log('4. Importer migration_script.sql\n');
        return false;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Exécuter la vérification
checkDatabase().then((ready) => {
    if (ready) {
        console.log('[SUCCESS] Prêt pour le démarrage du backend !');
    } else {
        console.log('[WAIT] Configuration nécessaire avant de continuer.');
    }
    process.exit(ready ? 0 : 1);
}).catch((error) => {
    console.error('[CRITICAL] Erreur critique:', error);
    process.exit(1);
});