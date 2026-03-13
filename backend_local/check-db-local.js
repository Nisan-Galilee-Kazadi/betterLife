const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkLocalDB() {
    console.log('🔍 Vérification de la base de données locale...');
    console.log('Host:', process.env.DB_HOST);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log('✅ Connexion au serveur MySQL réussie !');

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`✅ Base de données "${process.env.DB_NAME}" vérifiée/créée.`);

        await connection.end();
        console.log('🚀 Tout est prêt pour travailler en local !');
    } catch (err) {
        console.error('❌ Erreur de connexion locale :');
        console.error('Message:', err.message);
        console.error('\n💡 Astuce : Vérifie que XAMPP ou WAMP est bien lancé et que le port MySQL est le bon.');
    }
}

checkLocalDB();
