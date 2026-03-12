/**
 * Seed équipe : insère ou met à jour les 8 membres avec les photos réelles (/team/xxx).
 * Les images sont celles du frontend (Rh.jpg, GP.jpg, etc.) ; le front résout /team/xxx vers ces assets.
 */
const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const TEAM_MEMBERS = [
    { name: 'Ir KILUNGU KASONGO Bernard', role_fr: 'Délégué National', bio_fr: "Représente l'organisation et supervise les délégations provinciales.", email: 'bernardkilungu@betterlife-ong.org', photo_path: null, expertise: ['Relations Institutionnelles', 'Leadership', 'Développement'], sort_order: 1 },
    { name: 'Ir DEKEY MOLO Blaise', role_fr: 'Coordonnateur National', bio_fr: "Assure la coordination globale des activités de l'ONG au niveau national.", email: 'coordination@betterlife-ong.org', photo_path: '/team/cordon.jpg', expertise: ['Coordination', 'Stratégie', 'Management'], sort_order: 2 },
    { name: 'Mme YANGA LUBULU Deborah', role_fr: 'Secrétaire Administrative', bio_fr: "Assure le support administratif et la gestion documentaire de l'organisation.", email: 'secretariat@betterlife-ong.org', photo_path: '/team/sec.jpg', expertise: ['Administration', 'Organisation', 'Secrétariat'], sort_order: 3 },
    { name: 'LUMUMBA MPUMPU Nathan', role_fr: 'Directeur Communication', bio_fr: "Pilote la stratégie de communication et la visibilité des actions de l'ONG.", email: 'betterlifeorg@gmail.com', photo_path: '/team/dircom.jpg', expertise: ['Communication', 'Marketing', 'Relations Publiques'], sort_order: 4 },
    { name: 'Mme MPOYI NGALULA Sarah', role_fr: 'Directrice RH', bio_fr: 'Gère le capital humain, le recrutement et le développement des compétences.', email: 'rh@betterlife-ong.org', photo_path: '/team/rh.jpg', expertise: ['Ressources Humaines', 'Recrutement', 'Formation'], sort_order: 5 },
    { name: 'Mme LUTONADIO NSIMBA Florence', role_fr: 'Directrice Financière', bio_fr: 'Supervise la gestion financière, budgétaire et comptable de Better Life.', email: 'compta@betterlife-ong.org', photo_path: '/team/finaciere.jpg', expertise: ['Finance', 'Comptabilité', 'Audit', 'Gestion'], sort_order: 6 },
    { name: 'Mme META NYEMABU Ornella', role_fr: 'Gestionnaire de Projet', bio_fr: "Responsable de la planification, de l'exécution et du suivi des projets de l'ONG.", email: 'gestionprojet@betterlife-ong.org', photo_path: '/team/gp.jpg', expertise: ['Gestion de Projet', 'Planification', 'Suivi & Évaluation'], sort_order: 7 },
    { name: 'Mme BAKAKUWA NGALULA Marceline', role_fr: 'Directrice Technique', bio_fr: "Supervise les aspects techniques et scientifiques des programmes.", email: 'dt@betterlife-ong.org', photo_path: '/team/marceline.jpg', expertise: ['Expertise Technique', 'Agronomie', 'Environnement'], sort_order: 8 },
];

const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'betterlife_db',
};

async function main() {
    console.log('[SEED] Équipe + photos réelles...');
    const conn = await mysql.createConnection(DB_CONFIG);
    try {
        for (const m of TEAM_MEMBERS) {
            const [rows] = await conn.execute('SELECT id FROM team_members WHERE email = ?', [m.email]);
            const expertiseJson = JSON.stringify(m.expertise || []);
            if (rows.length > 0) {
                await conn.execute(
                    'UPDATE team_members SET name = ?, role_fr = ?, bio_fr = ?, photo_path = ?, expertise = ?, sort_order = ?, is_active = TRUE WHERE email = ?',
                    [m.name, m.role_fr, m.bio_fr, m.photo_path, expertiseJson, m.sort_order, m.email]
                );
                console.log('[OK] Mis à jour:', m.name);
            } else {
                await conn.execute(
                    `INSERT INTO team_members (name, role_fr, bio_fr, email, photo_path, expertise, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
                    [m.name, m.role_fr, m.bio_fr, m.email, m.photo_path, expertiseJson, m.sort_order]
                );
                console.log('[OK] Inséré:', m.name);
            }
        }
        console.log('[SUCCESS] Équipe seedée avec les photos /team/xxx.');
    } catch (err) {
        console.error('[ERROR]', err.message);
        process.exitCode = 1;
    } finally {
        await conn.end();
    }
}

main();
